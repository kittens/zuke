import { useEffect, useState } from "react";
import
{
  PublicKey,
  Transaction,
  Connection,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, createTransferInstruction } from "@solana/spl-token";
// Solana connection
const connection = new Connection("https://withered-virulent-valley.solana-mainnet.quiknode.pro/7c7f7e8d2ee0494db7ba6ac595d58e416f1aa994");

export const usePhantom = () =>
{
  const [phantom, setPhantom] = useState<any>(null);
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() =>
  {
    if (typeof window !== "undefined") {
      const provider = (window as any).phantom?.solana;

      if (provider?.isPhantom) {
        setPhantom(provider);
        // Add listeners
        provider.on("connect", (publicKey: any) =>
        {
          setPublicKey(publicKey.toString());
          setConnected(true);
        });

        provider.on("disconnect", () =>
        {
          setPublicKey(null);
          setConnected(false);
        });

        // Check if already connected
        if (provider.isConnected) {
          setPublicKey(provider.publicKey.toString());
          setConnected(true);
        }
      }
    }
  }, []);

  const connect = async () =>
  {
    try {
      if (phantom) {
        const { publicKey } = await phantom.connect();
        setPublicKey(publicKey.toString());
        setConnected(true);
      } else {
        console.error("Phantom is not available");
      }
    } catch (error) {
      console.error("Error connecting to Phantom:", error);
    }
  };

  const disconnect = async () =>
  {
    try {
      if (phantom) {
        await phantom.disconnect();
        setPublicKey(null);
        setConnected(false);
      }
    } catch (error) {
      console.error("Error disconnecting from Phantom:", error);
    }
  };

  const signMessage = async () =>
  {
    try {
      if (!phantom || !connected) {
        console.log("No phantom or not connected");
        return null;
      }

      const timestamp = Date.now();
      const message = `zuke.gg:${timestamp}`;

      console.log("📝 Creating message to sign:", {
        message,
        timestamp
      });

      console.log("✍️ Requesting signature from wallet...");
      const messageBuffer = new Uint8Array(Buffer.from(message));
      const response = await phantom.signMessage(messageBuffer, "utf8");
      console.log("✅ Got signature!", {
        signatureLength: response.signature.length,
        publicKey: phantom.publicKey.toString()
      });

      if (!response.signature || response.signature.length === 0) {
        console.log("Empty signature received");
        return null;
      }

      return {
        signatureBytes: response.signature,
        publicKey: phantom.publicKey.toString(),
        timestamp
      };
    } catch (error) {
      console.error("❌ Error signing message:", error);
      return null;
    }
  };

  const createTransferTransaction = async ({ recipient, amount, splToken }: { recipient: string, amount: number, splToken: string }) =>
  {
    if (!phantom || !connected || !publicKey) {
      throw new Error("Wallet not connected");
    }

    try {
      // Create PublicKey objects
      const recipientPubKey = new PublicKey(recipient);
      const tokenMintPubKey = new PublicKey(splToken);
      const senderPubKey = new PublicKey(publicKey);

      // Get token accounts
      console.log("Looking for token accounts...");
      const senderTokenAccount = await connection.getTokenAccountsByOwner(senderPubKey, { mint: tokenMintPubKey });
      const recipientTokenAccount = await connection.getTokenAccountsByOwner(recipientPubKey, { mint: tokenMintPubKey });

      console.log("Sender token accounts:", senderTokenAccount.value);
      console.log("Recipient token accounts:", recipientTokenAccount.value);

      if (!senderTokenAccount.value[0] || !recipientTokenAccount.value[0]) {
        throw new Error("Token accounts not found");
      }

      // Create transfer instruction with the correct authority (sender's wallet)
      const transferInstruction = createTransferInstruction(
        senderTokenAccount.value[0].pubkey,  // source
        recipientTokenAccount.value[0].pubkey, // destination
        senderPubKey,  // owner (this is the authority who can transfer from source)
        amount,
        [],  // no multisig signers
        TOKEN_PROGRAM_ID
      );

      // Create transaction (without blockhash for now)
      const transaction = new Transaction();
      transaction.add(transferInstruction);
      transaction.feePayer = senderPubKey;

      // Log transaction details for debugging
      console.log("Transaction details:", {
        source: senderTokenAccount.value[0].pubkey.toString(),
        destination: recipientTokenAccount.value[0].pubkey.toString(),
        owner: senderPubKey.toString(),
        amount: amount.toString(),
      });

      return transaction;
    } catch (error) {
      console.error("Error creating transfer transaction:", error);
      throw error;
    }
  };

  const signAndSendTransaction = async (
    transaction: Transaction,
    onStateChange?: (state: 'signing' | 'sending' | 'confirming') => void
  ) =>
  {
    if (!phantom || !connected) {
      throw new Error("Wallet not connected");
    }

    try {
      // Get fresh blockhash right before signing
      console.log("🔄 Getting fresh blockhash...");
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
      transaction.recentBlockhash = blockhash;
      transaction.lastValidBlockHeight = lastValidBlockHeight;

      console.log("📝 Signing transaction...");
      onStateChange?.('signing');
      const signedTransaction = await phantom.signTransaction(transaction);
      console.log("✅ Transaction signed!");

      console.log("🚀 Sending transaction to network...");
      onStateChange?.('sending');
      const signature = await connection.sendRawTransaction(signedTransaction.serialize(), {
        skipPreflight: false,
        preflightCommitment: 'confirmed'
      });
      console.log("📨 Transaction sent! Signature:", signature);

      console.log("⏳ Waiting for confirmation...");
      onStateChange?.('confirming');

      // Try to confirm with longer timeout and more retries
      let confirmed = false;
      let retries = 0;
      const MAX_RETRIES = 5;

      while (!confirmed && retries < MAX_RETRIES) {
        try {
          const confirmation = await connection.confirmTransaction(
            {
              signature,
              blockhash: transaction.recentBlockhash!,
              lastValidBlockHeight: (await connection.getLatestBlockhash()).lastValidBlockHeight,
            },
            'confirmed'
          );

          if (confirmation.value.err) {
            throw new Error(`Transaction failed: ${confirmation.value.err}`);
          }

          confirmed = true;
          console.log("✨ Transaction confirmed successfully!");
        } catch (error) {
          console.log(`Retry ${retries + 1}/${MAX_RETRIES}: Waiting for confirmation...`);
          retries++;

          // If this is our last retry, check if the transaction actually went through
          if (retries === MAX_RETRIES) {
            try {
              const status = await connection.getSignatureStatus(signature);
              if (status.value?.confirmationStatus === 'confirmed' || status.value?.confirmationStatus === 'finalized') {
                console.log("🎯 Transaction found confirmed despite timeout!");
                confirmed = true;
                break;
              }
            } catch (statusError) {
              console.error("Failed to check transaction status:", statusError);
            }
          }

          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      if (!confirmed) {
        console.log("⚠️ Transaction might have succeeded but confirmation timed out");
        console.log("🔍 Transaction signature for manual verification:", signature);
        throw new Error("Transaction confirmation timeout - please check your wallet or transaction signature: " + signature);
      }

      return signature;
    } catch (error) {
      console.error("❌ Transaction error:", error);
      if (error instanceof Error) {
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      throw error;
    }
  };

  return {
    phantom,
    connected,
    publicKey,
    connect,
    disconnect,
    signMessage,
    createTransferTransaction,
    signAndSendTransaction,
  };
}; 