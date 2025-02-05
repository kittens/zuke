'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'motion/react';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import CrossIcon from '../icons/cross';
import LightningIcon from './lightning-icon';
import SparklesIcon from './sparkles-icon';
import SparkleIcon from '../icons/sparkle';
import Button from '../button';
import { useAuthStore } from '@/stores/use-auth-store';
import { usePhantom } from '@/hooks/use-phantom';

type UpgradeState =
  | 'idle'
  | 'loading'
  | 'awaiting_approval'
  | 'signing'
  | 'sending'
  | 'declined'
  | 'confirming'
  | 'error';

interface UpgradeInfo
{
  recipient_address: string;
  token_address: string;
  token_amount: number;
}

const API_BASE = 'https://api.zuke.gg';
const USDC_DECIMALS = 6;

const getButtonText = (state: UpgradeState) =>
{
  switch (state) {
    case 'loading':
      return 'PREPARING...';
    case 'awaiting_approval':
      return 'APPROVE IN WALLET';
    case 'signing':
      return 'SIGNING TRANSACTION...';
    case 'sending':
      return 'SENDING TO NETWORK...';
    case 'declined':
      return 'TRANSACTION DECLINED';
    case 'confirming':
      return 'CONFIRMING PAYMENT';
    case 'error':
      return 'FAILED - TRY AGAIN';
    default:
      return 'GET ZUKE PRO';
  }
};

interface Props
{
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}

export default function UpgradeModal({ open, setOpen, children }: Props)
{
  const { phantom, connected, publicKey, createTransferTransaction, signAndSendTransaction } = usePhantom();
  const [upgradeState, setUpgradeState] = useState<UpgradeState>('idle');
  const { setAuth } = useAuthStore();

  const handleUpgrade = async () =>
  {
    if (!phantom || !connected || !publicKey) {
      document.getElementById('wallet-connect-button')?.click();
      return;
    }

    try {
      setUpgradeState('loading');
      console.log("🚀 Starting upgrade process...");

      // 1. Fetch upgrade information
      console.log("📡 Fetching upgrade requirements...");
      const response = await fetch(`${API_BASE}/upgrade`);
      if (!response.ok) {
        throw new Error('Failed to fetch upgrade information');
      }
      const upgradeInfo: UpgradeInfo = await response.json();

      // Adjust for USDC decimals
      const adjustedAmount = upgradeInfo.token_amount * Math.pow(10, USDC_DECIMALS);
      console.log("✅ Got upgrade info:", {
        ...upgradeInfo,
        original_amount: upgradeInfo.token_amount,
        adjusted_amount: adjustedAmount
      });

      // 2. Create and send the transaction
      console.log("💸 Creating transfer transaction...");
      const transaction = await createTransferTransaction({
        recipient: upgradeInfo.recipient_address,
        amount: adjustedAmount,
        splToken: upgradeInfo.token_address
      });

      setUpgradeState('awaiting_approval');
      console.log("🔑 Requesting wallet approval...");

      let txid;
      try {
        setUpgradeState('signing');
        txid = await signAndSendTransaction(
          transaction,
          (state) => setUpgradeState(state)
        );
        console.log("✅ Transaction sent! TxID:", txid);
      } catch (error: any) {
        if (error?.message?.includes('User rejected')) {
          setUpgradeState('declined');
          setTimeout(() => setUpgradeState('idle'), 2000);
          return;
        }

        // If it's a timeout error but we have a transaction signature
        if (error?.message?.includes('confirmation timeout') && error.message.includes('signature:')) {
          const signature = error.message.split('signature: ')[1];
          console.log("🤔 Transaction might have succeeded, trying to verify with signature:", signature);

          // Try to verify with backend anyway
          try {
            const confirmResponse = await fetch(`${API_BASE}/upgrade`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ txid: signature })
            });

            if (confirmResponse.ok) {
              const result = await confirmResponse.json();
              console.log("🎉 Backend confirmed the upgrade!", result);

              // Update auth state
              const currentToken = useAuthStore.getState().token;
              if (!currentToken) {
                throw new Error('No auth token found');
              }

              setAuth(currentToken, result.is_premium, publicKey);
              console.log("🔑 Updated auth state with premium status:", result.is_premium);

              alert('Successfully upgraded to Zuke Pro! 🎉');
              setUpgradeState('idle');
              return;
            }
          } catch (backendError) {
            console.error("Failed to verify with backend:", backendError);
          }
        }

        throw error;
      }

      // 3. Confirm the upgrade with backend
      console.log("🔄 Confirming upgrade with backend...");
      const confirmResponse = await fetch(`${API_BASE}/upgrade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ txid })
      });

      if (!confirmResponse.ok) {
        throw new Error('Failed to confirm upgrade');
      }

      const result = await confirmResponse.json();
      console.log("🎉 Upgrade confirmed!", result);

      // 4. Update auth state with premium status
      const currentToken = useAuthStore.getState().token;
      if (!currentToken) {
        throw new Error('No auth token found');
      }

      setAuth(currentToken, result.is_premium, publicKey);
      console.log("🔑 Updated auth state with premium status:", result.is_premium);

      // Only show success alert if we're still mounted (user might have navigated away)
      alert('Successfully upgraded to Zuke Pro! 🎉');
      setUpgradeState('idle');
    } catch (error) {
      console.error('❌ Upgrade failed:', error);
      setUpgradeState('error');
      setTimeout(() => setUpgradeState('idle'), 2000);
      alert('Failed to upgrade. Please try again!');
    }
  };

  const isLoading = upgradeState !== 'idle' && upgradeState !== 'error' && upgradeState !== 'declined';
  const buttonText = getButtonText(upgradeState);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal forceMount>
        <AnimatePresence>
          {open && (
            <Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-overlayShow z-[50]" />
          )}
          {open && (
            <Dialog.Content>
              <motion.div
                className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] lg:max-w-[460px] -translate-x-1/2 -translate-y-1/2 focus:outline-none z-[100] bg-[#17191C] rounded-[6px] shadow-modal border border-[rgba(161,121,134,0.08)] zuke-modal"
                initial={{ scaleX: 0.9, scaleY: 0.65, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                animate={{ scaleX: 1, scaleY: 1, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                exit={{ scaleX: 0.9, scaleY: 0.65, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                transition={{ type: 'spring', stiffness: 400, damping: 20, mass: 0.05 }}
              // transition={{ ease: [0.6, 0.6, 0, 1.45], duration: .3 }}
              >
                <div className="flex flex-col">
                  <div className="flex flex-col p-[20px]">
                    <img src="/zuke-pro-logo.svg" width={102} />
                    <p className="mt-3 text-[#f9fbfc] text-[22px] font-[450] tracking-[-0.88px] leading-[28px] max-w-[200px]">Be in the advantage with Zuke Pro</p>
                    <p className="mt-2 text-[#747986] text-[13px] tracking-[-0.39px] leading-[20px] font-suisse-intl-mono">ONE PAYMENT OF 200K $ZUKE</p>
                  </div>

                  <div className="w-full h-[1px] bg-[rgba(116,121,134,0.08)]"></div>

                  <div className="flex flex-col px-[20px] py-3.5">
                    <p className="text-[#747986] text-[11px] tracking-[-0.33px] leading-[20px] font-suisse-intl-mono">FEATURES</p>

                    <div className="flex items-center gap-2 w-[100%] mt-1.5">
                      <div className="flex gap-2 bg-[rgba(116,121,134,0.08)] rounded-[4px] px-3 h-[55px] items-center w-full">
                        <LightningIcon />
                        <div className="flex flex-col gap-1">
                          <p className="text-[12px] tracking-[-0.72px] leading-[16px] font-suisse-intl-mono">0MS DELAY</p>
                          <p className="text-[#747986] text-[11px] tracking-[-0.88px] leading-[16px] font-suisse-intl-mono">200% FASTER</p>
                        </div>
                      </div>
                      <div className="flex gap-2 bg-[rgba(116,121,134,0.08)] rounded-[4px] px-3 h-[55px] items-center w-full">
                        <SparklesIcon />
                        <div className="flex flex-col gap-1">
                          <p className="text-[12px] tracking-[-0.72px] leading-[16px] font-suisse-intl-mono">EARLY ACCESS</p>
                          <p className="text-[#747986] text-[11px] tracking-[-0.88px] leading-[16px] font-suisse-intl-mono">TO FUTURE TOOLS</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-[1px] bg-[rgba(116,121,134,0.08)]"></div>

                  <div className="flex px-[20px] pt-[14px] pb-[16px] items-center justify-between">
                    <div className="flex gap-1.5 items-center">
                      <div className="w-[24px] h-[24px] bg-[hsla(195,73%,68%,0.1)] flex items-center justify-center rounded-full">
                        <img src="/zuke-favicon.svg" alt="Zuke" />
                      </div>
                      <p className="text-turqoise text-[12px] tracking-[-0.6px] leading-[20px] font-suisse-intl-mono">200K <span className="underline underline-offset-2 decoration-dotted">$ZUKE</span></p>
                    </div>
                    <div className="flex ml-auto gap-3 justify-end items-center">
                      <p className="text-[12px] tracking-[-0.36px] leading-[28px] text-[#747986] transition-colors hover:text-white duration-100 h-[28px] font-suisse-intl-mono cursor-pointer">BUY ZUKE</p>
                      <Button
                        color={upgradeState === 'error' ? 'red' : 'turqoise'}
                        endContent={<SparkleIcon />}
                        disabled={isLoading}
                        key={upgradeState}
                        onClick={handleUpgrade}
                      >
                        {buttonText}
                      </Button>
                    </div>
                  </div>

                </div>

                <Dialog.Close asChild>
                  <button
                    className="absolute right-6 top-6 inline-flex size-[25px] appearance-none items-center justify-center text-[#747986] duration-100 transition-colors hover:text-white focus:outline-none"
                    aria-label="Close"
                  >
                    <CrossIcon size={14} />
                  </button>
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  )
}