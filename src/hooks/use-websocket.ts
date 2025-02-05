import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/use-auth-store';

export interface QuotedUser
{
  username: string;
  display_name: string;
  text: string;
  icon: string;
}

export interface TweetInfo
{
  twitter_id: string;
  is_reply: boolean;
  is_retweet: boolean;
  is_quote: boolean;
  is_self_reply: boolean;
  quoted_user: QuotedUser | null;
}

export interface Tweet
{
  username: string;
  display_name: string;
  text: string;
  icon: string;
  image?: string;
  link: string;
  info: TweetInfo;
  timestamp: number;
}

export interface TokenSocial
{
  type: 'website' | 'telegram' | 'x';
  url: string;
}

export interface DexDetails
{
  usd_price: number;
  usd_price_24h_change: number;
  market_cap: number;
  liquidity: number;
  holders: number;
  volume_24h: number;
  updated_at: number;
}

export interface Token
{
  ca: string;
  name: string;
  ticker: string;
  logo_url: string;
  description: string;
  spam_status: 'VERIFIED' | string;
  socials: TokenSocial[];
  dex_details: DexDetails;
  extra_urls: {
    ca: string;
    bullx_url: string;
    photon_url: string;
    dexscreener_url: string;
    logo_small: string;
    logo_large: string;
  };
}

export interface Ticker
{
  ca: string;
  ticker: string;
  twitter_username: string;
  match_type: string;
  token: Token;
}

export interface WebSocketMessage
{
  message: 'new_tweet';
  tweet: Tweet;
  summary: string;
  sentiment: 'bearish' | 'bullish' | 'neutral';
  tickers: Ticker[];
  isNewPost?: boolean;
}

export function useWebSocket()
{
  const [posts, setPosts] = useState<WebSocketMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { token } = useAuthStore();

  // Function to calculate delay with exponential backoff
  const getRetryDelay = () =>
  {
    const baseDelay = 1000; // Start with 1 second
    const maxDelay = 30000; // Max delay of 30 seconds
    const delay = Math.min(baseDelay * Math.pow(2, retryCount), maxDelay);
    return delay;
  };

  // Function to create and setup WebSocket connection
  const setupWebSocket = () =>
  {
    console.log(`🔌 Initializing WebSocket connection... (attempt ${retryCount + 1})`);
    const ws = new WebSocket('wss://api.zuke.gg/ws');

    ws.onopen = () =>
    {
      console.log('✅ WebSocket connected!');
      setIsConnected(true);
      setError(null);
      setRetryCount(0); // Reset retry count on successful connection

      // Set initial load timeout
      const initialLoadTimeout = setTimeout(() =>
      {
        console.log('🎬 Initial load complete - Future messages will be marked as new');
        setInitialLoadComplete(true);
      }, 5000);

      if (token) {
        ws.send(JSON.stringify({ Authorization: token }));
        ws.send(JSON.stringify({ type: 'get_history', timestamp: Date.now() }));
      }

      // Store timeout in ws instance for cleanup
      (ws as any).initialLoadTimeout = initialLoadTimeout;
    };

    ws.onmessage = (event) =>
    {
      try {
        const data = JSON.parse(event.data) as WebSocketMessage;

        // Early safety check for required data
        if (!data?.tweet?.link) {
          console.warn('❌ Received invalid tweet data:', data);
          return;
        }

        // console.log(`📥 Received tweet ${data.tweet.link} - Initial load: ${!initialLoadComplete}`);

        const enhancedData = {
          ...data,
          isNewPost: initialLoadComplete
        };

        setPosts((prevPosts) =>
        {
          // Check if post already exists by tweet ID with safety checks
          const isDuplicate = prevPosts.some(post =>
            post?.tweet?.link === data.tweet.link
          );

          // If it's a duplicate, don't add it
          if (isDuplicate) {
            // console.log(`🔄 Duplicate tweet ${data.tweet.link} - Current posts count: ${prevPosts.length}`);
            return prevPosts;
          }

          // console.log(`✨ Adding new tweet ${data.tweet.link} - Current posts count: ${prevPosts.length}`);
          return [enhancedData, ...prevPosts];
        });
      } catch (err) {
        console.error('❌ Failed to parse WebSocket message:', err, 'Raw data:', event.data);
      }
    };

    ws.onerror = (event) =>
    {
      console.error('❌ WebSocket error:', event);
      setError('Failed to connect to the server');
    };

    ws.onclose = () =>
    {
      console.log('🔌 WebSocket connection closed');
      setIsConnected(false);
      setError('Connection closed');

      // Clear the initial load timeout if it exists
      if ((ws as any).initialLoadTimeout) {
        clearTimeout((ws as any).initialLoadTimeout);
      }

      // Schedule reconnection with exponential backoff
      const delay = getRetryDelay();
      console.log(`🔄 Attempting to reconnect in ${delay / 1000} seconds...`);

      const reconnectTimeout = setTimeout(() =>
      {
        setRetryCount(prev => prev + 1);
        setupWebSocket();
      }, delay);

      // Store timeout in ws instance for cleanup
      (ws as any).reconnectTimeout = reconnectTimeout;
    };

    return ws;
  };

  useEffect(() =>
  {
    const ws = setupWebSocket();

    return () =>
    {
      console.log('🧹 Cleaning up WebSocket connection...');
      // Clear all timeouts
      if ((ws as any).initialLoadTimeout) {
        clearTimeout((ws as any).initialLoadTimeout);
      }
      if ((ws as any).reconnectTimeout) {
        clearTimeout((ws as any).reconnectTimeout);
      }
      ws.close();
    };
  }, [token]);

  return {
    posts,
    isConnected,
    error
  };
} 