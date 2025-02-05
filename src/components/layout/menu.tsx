'use client';
import Link from "next/link";
import Badge from "../badge";
import TelegramIcon from "../icons/telegram";
import XIcon from "../icons/x";
import Button from "../button";
import { useCallback, useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/use-auth-store";
import { loginWithWallet } from "@/lib/api";
import bs58 from 'bs58';
import { usePhantom } from "@/hooks/use-phantom";
import GitHubIcon from "../icons/github";
import Toast from "../toast";

export default function Menu()
{
  const {
    phantom,
    connected,
    publicKey,
    connect,
    disconnect,
    signMessage
  } = usePhantom();

  const [error, setError] = useState<string | null>(null);
  const { setAuth, logout, isPremium, token } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const appStoreButtonRef = useRef<HTMLDivElement>(null);

  // Initialize auth state
  useEffect(() =>
  {
    console.log("🏁 Initializing auth state:", {
      token,
      connected,
      publicKey,
      storedPublicKey: useAuthStore.getState().publicKey
    });

    const storedAuth = useAuthStore.getState();

    if (storedAuth.token && storedAuth.publicKey && !connected) {
      console.log("🔑 Found stored auth, attempting to reconnect...");
      connect();
    }
  }, [mounted]); // Only run once on mount

  // Set mounted state
  useEffect(() =>
  {
    console.log("🔄 Component mounted");
    setMounted(true);
  }, []);

  // Try to login whenever we get connected
  useEffect(() =>
  {
    console.log("👀 Checking login conditions:", {
      connected,
      publicKey,
      mounted,
      token,
      storedPublicKey: useAuthStore.getState().publicKey
    });

    // Only login if:
    // 1. We're connected
    // 2. We have a public key
    // 3. Component is mounted
    // 4. We don't have a token OR our stored public key doesn't match current one
    if (connected && publicKey && mounted &&
      (!token || useAuthStore.getState().publicKey !== publicKey)) {
      console.log("🔑 Need to login: token or public key mismatch");
      handleLogin();
    }
  }, [connected, publicKey, mounted, token]);

  const handleLogin = async () =>
  {
    if (!phantom || !connected || !publicKey) {
      console.log("❌ Missing wallet capabilities");
      setError("Wallet connection incomplete. Please try again!");
      return;
    }

    try {
      const result = await signMessage();
      if (!result) {
        throw new Error("Failed to sign message");
      }

      console.log("🌐 Making API request to /login...");
      const response = await loginWithWallet(
        result.publicKey,
        bs58.encode(result.signatureBytes),
        result.timestamp
      );
      console.log("📨 Got API response:", response);

      if (!response.Authorization) {
        throw new Error("No authorization token in response");
      }

      console.log("💾 Setting auth data...");
      setAuth(response.Authorization, response.is_premium, result.publicKey);
      setError(null);
      console.log("✨ Login complete!");
    } catch (err) {
      console.error('❌ Login failed:', err);
      setError('Login failed. Please try again.');
    }
  };

  const handleDisconnect = useCallback(async () =>
  {
    try {
      console.log("🔌 Disconnecting wallet...");
      await disconnect();
      logout();
    } catch (err) {
      console.error("Disconnect error:", err);
      setError("Failed to disconnect. Please try again!");
    }
  }, [disconnect, logout]);

  const handleConnect = useCallback(async () =>
  {
    try {
      if (!phantom) {
        window.open('https://phantom.app/', '_blank');
        setError('Please install Phantom wallet to continue.');
        return;
      }

      await connect();
    } catch (err) {
      console.error('Connect error:', err);
      setError('Failed to connect. Please try again!');
    }
  }, [phantom, connect]);

  const handleAppStoreHover = () => {
    setToastVisible(true);
  };

  if (!mounted) {
    console.log("⏳ Waiting for component to mount...");
    return null;
  }

  return (
    <div className="w-full h-[56px] flex items-center justify-between px-5 py-3">
      <div className="flex items-center gap-4">
        <Link href="/">
          {!isPremium ? <img src="/logo.svg" alt="Zuke" /> : <img src="/zuke-pro-logo.svg" alt="Zuke" />}
        </Link>

        <div className="h-[12px] w-[1px] bg-[#242529]"></div>

        <Badge>POWERED BY <span className="underline underline-offset-2">$ZUKE</span> | CA: zukeDomJvt5ydVzTA3mrU3s4qYezcqt9sUmvSUapump (NOT LIVE)</Badge>

        <div className="h-[12px] w-[1px] bg-[#242529]"></div>

        <div 
          ref={appStoreButtonRef}
          className="relative opacity-50 hover:opacity-40 transition-opacity duration-200 flex items-center"
          onMouseEnter={handleAppStoreHover}
        >
          <img 
            src="/app-store-badge.svg" 
            alt="Download on the App Store" 
            className="h-[28px] w-auto"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Link href="https://t.me/zukegg" target="_blank">
          <TelegramIcon className="text-[#747986] hover:text-white transition-colors duration-100" />
        </Link>
        <Link href="https://x.com/zuke" target="_blank">
          <XIcon className="text-[#747986] hover:text-white transition-colors duration-100" />
        </Link>
        <Link href="https://github.com/kittens/zuke" target="_blank">
          <GitHubIcon className="text-[#747986] hover:text-white transition-colors duration-100" />
        </Link>
        {connected ? (
          <Button
            size="md"
            onClick={handleDisconnect}
            color="gray"
            key={connected ? 'connected' : 'disconnected'}
          >
            {`${publicKey?.slice(0, 4)}...${publicKey?.slice(-4)}`}
          </Button>
        ) : (
          <Button
            size="md"
            onClick={handleConnect}
            color="turqoise"
            key={connected ? 'connected' : 'disconnected'}
            id="wallet-connect-button"
          >
            CONNECT WALLET
          </Button>
        )}
        {error && (
          <div className="absolute top-full mt-2 right-0 bg-red-500 text-white text-sm px-3 py-1 rounded-md whitespace-nowrap z-50">
            {error}
          </div>
        )}
      </div>

      <Toast 
        message="Coming soon" 
        isVisible={toastVisible} 
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}