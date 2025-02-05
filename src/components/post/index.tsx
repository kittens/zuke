'use client';

import Badge from "@/components/badge";
import ChevronTopRightIcon from "@/components/icons/chevron-top-right";
import VerifiedCheckmark from "@/components/icons/verified-checkmark";
// import ReplyIcon from "@/components/icons/reply";
// import RetweetIcon from "@/components/icons/retweet";
// import HeartIcon from "@/components/icons/heart";
import ChevronTopRightPlainIcon from "@/components/icons/chevron-top-right-plain";
import ChevronDownIcon from "@/components/icons/chevron-down-icon";
import SentimentIndicator from "@/components/sentiment-indicator";
import { formatDistanceToNow } from 'date-fns';
import { Token, WebSocketMessage } from "@/hooks/use-websocket";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import CheckmarkIcon from "../icons/checkmark";
import ClipboardIcon from "../icons/clipboard";
import { Controlled as Zoom } from 'react-medium-image-zoom'
import classNames from "classnames";

// Helper function to format numbers with K, M, B suffixes
function formatNumber(num: number): string
{
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)}B`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toFixed(2);
}

type PostProps = WebSocketMessage;

export default function Post({ tweet, sentiment, tickers, summary, isNewPost }: PostProps)
{
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMarketDetailsOpen, setIsMarketDetailsOpen] = useState(false);
  const [selectedTicker, setSelectedTicker] = useState<Token | null>(null);
  const [isLoadingMarketData, setIsLoadingMarketData] = useState(false);
  const [marketData, setMarketData] = useState<Token | null>(null);

  // Function to detect URLs and wrap them in anchor tags
  const renderTextWithLinks = (text: string) =>
  {
    // URL regex pattern
    const urlPattern = /(https?:\/\/[^\s]+)/g;

    // Split text by URLs and match all URLs
    const parts: string[] = text.split(urlPattern);
    const urls: string[] = text.match(urlPattern) || [];

    // Combine parts and URLs
    return parts.map((part, i) =>
    {
      // If this part matches a URL, wrap it in an anchor tag
      if (urls.includes(part)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {part}
          </a>
        );
      }
      // Otherwise return the text as is
      return part;
    });
  };

  const handleZoomChange = useCallback((shouldZoom: boolean) =>
  {
    setIsZoomed(shouldZoom)
  }, [])

  const formatTimeAgo = (timestamp: number) =>
  {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const [timeAgoText, setTimeAgoText] = useState(() => formatTimeAgo(tweet.timestamp));

  // Update time when timestamp prop changes
  useEffect(() =>
  {
    setTimeAgoText(formatTimeAgo(tweet.timestamp));
  }, [tweet.timestamp]);

  // Update time every minute
  useEffect(() =>
  {
    const timer = setInterval(() =>
    {
      setTimeAgoText(formatTimeAgo(tweet.timestamp));
    }, 60000);

    return () => clearInterval(timer);
  }, [tweet.timestamp]);

  const fetchTokenDetails = async (ca: string) =>
  {
    try {
      setIsLoadingMarketData(true);
      const response = await fetch(`https://api.zuke.gg/token/${ca}`);
      if (!response.ok) {
        throw new Error('Failed to fetch token details');
      }
      const data = await response.json();
      setMarketData(data);
    } catch (error) {
      console.error('Error fetching token details:', error);
    } finally {
      setIsLoadingMarketData(false);
    }
  };

  async function handleTickerClick(ticker: Token)
  {
    if (ticker === selectedTicker) {
      setIsMarketDetailsOpen(!isMarketDetailsOpen);
      return
    }

    setSelectedTicker(ticker);
    setIsMarketDetailsOpen(true);
    await fetchTokenDetails(ticker.ca);
  }

  async function handleCopy(text: string)
  {
    setCopied(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => setCopied(false), 1500);
  }

  // Safety check for required data
  if (!tweet) {
    console.warn('Invalid post data:');
    return null;
  }

  function renderCardCreatorBadge()
  {
    if (!tickers?.length) return null;

    return tickers.map((ticker, index) =>
    {
      if (!ticker?.token) return null;
      const { token } = ticker;

      return (
        <div key={index} className="flex items-center gap-1.5 h-[24px] rounded-[4px] poster-badge pl-[2px] pr-[5px] cursor-pointer transition-all duration-100 hover:bg-[rgba(117,122,132,0.08)]" onClick={() => handleTickerClick(token)}>
          {token.extra_urls.logo_small && (
            <img src={token.extra_urls.logo_small} alt={token.name} className="w-[20px] h-[20px] rounded-[4px]" />
          )}
          <p className="text-l-small !text-[13px] font-suisse-intl-mono tracking-[-0.76px] uppercase">{token.ticker}</p>
          <div className="w-[1px] h-[8px] bg-[rgba(255,255,255,0.07)] mx-[2px]"></div>
          {/* Links to analysis platforms */}
          {token.extra_urls.photon_url && (
            <a href={token.extra_urls.photon_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <img src="/photon-logo.png" alt="Photon" className="w-[14px] h-[14px]" />
            </a>
          )}
          {token.extra_urls.bullx_url && (
            <a href={token.extra_urls.bullx_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <img src="/bullx-logo.png" alt="Bullx" className="w-[14px] h-[14px]" />
            </a>
          )}
          {token.extra_urls.dexscreener_url && (
            <a href={token.extra_urls.dexscreener_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <img src="/dexscreener-logo.png" alt="Dexscreener" className="w-[14px] h-[14px]" />
            </a>
          )}
        </div>
      );
    });
  }

  function renderMarketDetails()
  {
    if (!selectedTicker) return null;

    const tokenData = marketData || selectedTicker;
    const {
      logo_url,
      name,
      description,
      ca,
      dex_details
    } = tokenData;

    if (!dex_details) {
      if (isLoadingMarketData) {
        return (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="p-1.5 max-md:min-w-[100%] max-md:max-w-[100%] md:min-w-[50%] md:max-w-[50%] h-auto"
          >
            <div className="flex flex-col px-3 py-[11px] mt-4.5 gap-2 overflow-hidden bg-[rgba(35,36,42,0.35)] rounded-[10px] relative h-full items-center justify-center">
              <p className="text-[13px] leading-[20px] tracking-[-0.13px] text-[#747986] whitespace-pre-line">Loading market data...</p>
            </div>
          </motion.div>
        );
      }
      return null;
    }

    const {
      market_cap,
      liquidity,
      holders,
      volume_24h,
      usd_price,
      usd_price_24h_change
    } = dex_details;

    return (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.1 }}
        className="p-1.5 min-w-[50%] max-w-[50%] h-auto"
      >
        <div className="flex flex-col px-3 py-[11px] mt-4.5 gap-2 overflow-hidden bg-[rgba(35,36,42,0.35)] rounded-[10px] relative h-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={logo_url} alt={name} className="w-[36px] h-[36px] rounded-[4px]" />
              <div className="flex flex-col">
                <p className="text-[13px] leading-[20px] tracking-[-0.13px] text-[#F9FBFC] whitespace-pre-line font-medium">{name}</p>
                <div className="flex items-center gap-1.5">
                  <p className="text-[11px] leading-[14px] tracking-[-0.11px] text-[#747986] whitespace-pre-line font-suisse-intl-mono">{ca.slice(0, 13)}...</p>
                  {copied ? (
                    <div className="flex items-center justify-center w-5 h-5 cursor-pointer ml-auto relative z-10 self-start">
                      <CheckmarkIcon size={10} className="text-[#747986]" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-5 h-5 cursor-pointer ml-auto relative z-10 self-start" onClick={() => handleCopy(ca)}>
                      <ClipboardIcon size={16} className="text-[#747986]" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Badge color={usd_price_24h_change > 0 ? 'green' : 'red'} withGlow className="w-min max-h-[20px] ml-auto" size="sm">
                <span className="text-[10px]">
                  {usd_price_24h_change > 0 ? '+' : ''}{usd_price_24h_change.toFixed(2)}%
                </span>
              </Badge>
              <p className="text-[11px] leading-[14px] tracking-[-0.11px] text-[#747986] whitespace-pre-line font-suisse-intl-mono text-right">${usd_price.toFixed(5)}</p>
            </div>
          </div>

          <div className="flex items-center bg-[rgba(116,121,134,0.09)] px-4 h-[58px] rounded-[4px] mt-1 justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-[12px] leading-[16px] tracking-[-0.72px] text-[#F9FBFC] whitespace-pre-line tabular-nums font-medium font-suisse-intl-mono">
                ${market_cap ? formatNumber(market_cap) : '0'}
              </p>
              <p className="text-[11px] leading-[14px] tracking-[-0.11px] text-[#747986] whitespace-pre-line font-suisse-intl-mono">MARKET CAP</p>
            </div>

            <div className="w-[1px] h-[26px] bg-[rgba(255,255,255,0.07)] mx-[2px]"></div>

            <div className="flex flex-col gap-1">
              <p className="text-[12px] leading-[16px] tracking-[-0.72px] text-[#F9FBFC] whitespace-pre-line tabular-nums font-medium font-suisse-intl-mono">
                ${formatNumber(liquidity || 0)}
              </p>
              <p className="text-[11px] leading-[14px] tracking-[-0.11px] text-[#747986] whitespace-pre-line font-suisse-intl-mono">LIQUIDITY</p>
            </div>

            <div className="w-[1px] h-[26px] bg-[rgba(255,255,255,0.07)] mx-[2px]"></div>

            <div className="flex flex-col gap-1">
              <p className="text-[12px] leading-[16px] tracking-[-0.72px] text-[#F9FBFC] whitespace-pre-line tabular-nums font-medium font-suisse-intl-mono">
                {formatNumber(holders || 0)}
              </p>
              <p className="text-[11px] leading-[14px] tracking-[-0.11px] text-[#747986] whitespace-pre-line font-suisse-intl-mono">HOLDERS</p>
            </div>

            <div className="w-[1px] h-[26px] bg-[rgba(255,255,255,0.07)] mx-[2px]"></div>

            <div className="flex flex-col gap-1">
              <p className="text-[12px] leading-[16px] tracking-[-0.72px] text-[#F9FBFC] whitespace-pre-line tabular-nums font-medium font-suisse-intl-mono">
                ${formatNumber(volume_24h || 0)}
              </p>
              <p className="text-[11px] leading-[14px] tracking-[-0.11px] text-[#747986] whitespace-pre-line font-suisse-intl-mono">24H VOLUME</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const timeAgo = timeAgoText;

  return (
    <motion.div
      initial={isNewPost ? { backgroundColor: "rgba(117,122,132,0.08)" } : { backgroundColor: "#151619" }}
      animate={{ backgroundColor: "#151619" }}
      transition={{ duration: 3 }}
      className="flex flex-col rounded-[6px] shadow-card"
    >
      <div className="h-[36px] w-full px-1.5 flex items-center justify-between bg-[rgba(117,122,132,0.08)] rounded-t-[6px]">
        <div className="flex items-center gap-2">
          {renderCardCreatorBadge()}
        </div>
        {sentiment && (
          <SentimentIndicator sentiment={sentiment} />
        )}
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col p-3 gap-3">
          <div className="flex items-center gap-2">
            {tweet.icon && (
              <img src={tweet.icon} alt={tweet.display_name} className="w-[28px] h-[28px] rounded-[4px]" />
            )}
            <div className="flex items-center gap-[2px]">
              <p className="text-[14px] leading-[18px] tracking-[-0.14px] text-[#F9FBFC] font-[500]">{tweet.display_name}</p>
              <VerifiedCheckmark size={20} className="relative top-[.5px]" />
              <p className="text-[13px] leading-[18px] tracking-[-0.13px] text-[#747986] ml-[2px]">@{tweet.username}</p>
            </div>
            <Badge color="green" withGlow startContent={<ChevronTopRightIcon />} className="!gap-1">
              HIGH PNL
            </Badge>
          </div>
          <p className="text-[13px] leading-[14px] tracking-[-0.12px] text-[#F9FBFC] whitespace-pre-line">
            {renderTextWithLinks(tweet.text)}
          </p>
        </div>

        {tweet.image && (
          <div className="p-3 cursor-zoom-in" onClick={() => setIsZoomed(true)}>
            <div className="relative before:absolute before:inset-0 before:border before:border-[rgba(255,255,255,0.08)] before:rounded-[6px]">
              <div className="absolute top-[3px] right-[3px] bg-[rgba(0,0,0,0.66)] rounded-[4px] flex items-center justify-center h-[18px] min-w-[18px] pointer-events-none select-none">
                <p className="text-[10px] leading-[12px] tracking-[-0.1px] text-[#F9FBFC]">+1</p>
              </div>
              <Zoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
                <img src={tweet.image} alt="tweet image" className="w-[76px] h-[64px] rounded-[6px] object-cover" />
              </Zoom>
            </div>
          </div>
        )}
      </div>


      <div className="flex justify-start w-[100%]">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="p-1.5"
              style={{ maxWidth: isMarketDetailsOpen ? '50%' : '100%' }}
            >
              <div className="flex flex-col px-3 py-[11px] mt-4.5 gap-2 overflow-hidden bg-[rgba(35,36,42,0.35)] rounded-[10px] zuke-ai-bar relative"
              >
                <div className="flex items-center gap-2">
                  <img src="/zuke-ai-avatar.png" alt="Zuke AI" className="w-[36px] h-[36px] rounded-[4px]" />
                  <div className="flex flex-col">
                    <p className="text-[13px] leading-[20px] tracking-[-0.13px] text-[#F9FBFC] whitespace-pre-line font-medium">{tickers.length > 0 ? tickers[0].ticker : ''} ANALYSIS</p>
                    <p className="text-[11px] leading-[14px] tracking-[-0.11px] text-[#747986] whitespace-pre-line font-suisse-intl-mono">ZUKE AI</p>
                  </div>

                  {copied ? (
                    <div className="flex items-center justify-center w-5 h-5 cursor-pointer ml-auto relative z-10 self-start">
                      <CheckmarkIcon size={14} className="text-[#747986]" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-5 h-5 cursor-pointer ml-auto relative z-10 self-start" onClick={() => handleCopy(summary)}>
                      <ClipboardIcon size={20} className="text-[#747986]" />
                    </div>
                  )}
                </div>
                <p className="text-[14px] leading-[20px] tracking-[-0.13px] font-[450] text-[#F9FBFC] whitespace-pre-line font-medium mb-4">{summary}</p>

                {sentiment && (
                  <SentimentIndicator sentiment={sentiment} />
                )}
              </div>
            </motion.div>
          )}

          {isMarketDetailsOpen && renderMarketDetails()}
        </AnimatePresence>
      </div>

      <div className="flex px-3 py-[11px] items-center h-[36px] gap-2 border-t border-[rgba(53,57,65,0.40)] mt-3">
        {timeAgo && (
          <p className="text-[12px] text-[#747986] tracking-[-0.88px] font-suisse-intl-mono uppercase">{timeAgo}</p>
        )}
        <div className="w-[1px] h-[8px] bg-[rgba(255,255,255,0.07)]"></div>
        {/* <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <ReplyIcon className="text-[#747986]" />
            <p className="text-[11px] text-white tracking-[-0.88px] font-suisse-intl-mono">1.2K</p>
          </div>
          <div className="flex items-center gap-1.5">
            <HeartIcon className="text-[#747986]" />
            <p className="text-[11px] text-white tracking-[-0.88px] font-suisse-intl-mono">1.1M</p>
          </div>
          <div className="flex items-center gap-1.5">
            <RetweetIcon className="text-[#747986]" />
            <p className="text-[11px] text-white tracking-[-0.88px] font-suisse-intl-mono">145</p>
          </div>
        </div> 
        <div className="w-[1px] h-[8px] bg-[rgba(255,255,255,0.07)]"></div>
        */}
        {tweet.link && (
          <a href={tweet.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
            <p className="text-[12px] text-white tracking-[-0.88px] font-suisse-intl-mono">Source</p>
            <ChevronTopRightPlainIcon className="text-[#747986]" size={12} />
          </a>
        )}

        <div className="flex items-center gap-1.5 ml-auto group cursor-pointer hover:bg-[rgba(117,122,132,0.08)] py-1.5 px-2 rounded-[4px]"
          onClick={() =>
          {
            setIsExpanded(!isExpanded)
          }}>
          <img src="/zuke-ai-logo.png" alt="Zuke AI" className="w-[16px] h-[16px]" />
          <p className={classNames(`text-[12px] text-white tracking-[-0.88px] font-suisse-intl-mono transition-all duration-100 group-hover:text-white`, { 'opacity-50': !sentiment })}>ZUKE AI REVIEW</p>
          <ChevronDownIcon
            className={`text-[#747986] transition-all duration-200 group-hover:text-white ${isExpanded ? 'rotate-180' : ''}`}
            size={12}
          />
        </div>
      </div>
    </motion.div>
  );
} 