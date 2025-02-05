'use client';

import UpsellBar from "@/components/upsell-bar";
import DelayCounter from "@/components/delay-counter";
import Post from "@/components/post";
import { useWebSocket } from "@/hooks/use-websocket";
import Search from "@/components/search";
import { useSearch } from "@/hooks/use-search";
import Filter from "@/components/filter";
import { useState, useMemo } from "react";
import 'react-medium-image-zoom/dist/styles.css'
import { useAuthStore } from '@/stores/use-auth-store';
import HowItWorksModal from "@/components/how-it-works-modal";

export default function Home()
{
  const { posts, isConnected, error } = useWebSocket();
  const { search, searchResults } = useSearch(posts);
  const { isPremium } = useAuthStore();
  const [filter, setFilter] = useState('all');

  // Get the posts to display - either search results or all posts
  const displayPosts = useMemo(() =>
  {
    const postsToFilter = searchResults || posts;
    // First filter by sentiment if needed
    const filteredPosts = filter === 'all'
      ? postsToFilter
      : postsToFilter.filter(post => post.sentiment === filter);

    // Then sort by timestamp (newest first) with safety checks
    return [...filteredPosts].sort((a, b) =>
    {
      const timestampA = a?.tweet?.timestamp || 0;
      const timestampB = b?.tweet?.timestamp || 0;
      return timestampB - timestampA;
    });
  }, [searchResults, posts, filter]);

  return (
    <div className="container mx-auto">
      <UpsellBar />
      <HowItWorksModal />

      <div className="w-full bg-[rgba(35,36,42,0.35)] rounded-[10px] mt-2">
        {/* feed header */}
        <div className="flex max-sm:flex-col md:items-center max-sm:gap-2 max-sm:py-3 justify-between md:h-[56px]">
          <div className="flex items-center gap-3 px-5">
            <h3 className="text-[16px] leading-[24px] tracking-[-1.28px] font-suisse-intl-mono text-[#9CA0AB]">TERMINAL</h3>
            <DelayCounter />
            {!isPremium &&
              <p className="text-[11px] tracking-[-0.55px] font-suisse-intl-mono text-turqoise cursor-pointer">UPGRADE TO <span className="underline underline-offset-2 decoration-dotted">0MS</span></p>
            }
          </div>
          <div className="flex items-center gap-5 px-5">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-[#8DEA7E]' : 'bg-[#EB7777]'}`} />
              <p className="text-[11px] tracking-[-0.55px] font-suisse-intl-mono text-[#747986]">
                {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Search onSearch={search} />
              <Filter filter={filter} onFilter={setFilter} />
            </div>
          </div>
        </div>

        {/* feed body */}
        <div className="flex flex-col gap-4 mt-1 px-5 pb-5">
          {error && (
            <div className="bg-[#EB7777]/10 text-[#EB7777] p-3 rounded-[6px] text-sm">
              {error}
            </div>
          )}

          {!isConnected && !error && displayPosts.length === 0 && (
            <div className="bg-[rgba(117,122,132,0.08)] p-3 rounded-[6px] text-sm text-[#747986]">
              Connecting to server...
            </div>
          )}

          {displayPosts.map((post) =>
          {
            // Safety check for required properties
            if (!post?.tweet?.link) {
              console.warn('Invalid post data:', post);
              return null;
            }

            // Create a unique key combining tweet ID and timestamp
            const uniqueKey = `${post.tweet.link}-${post.tweet.timestamp}`;

            return (
              <Post
                key={uniqueKey}
                {...post}
              />
            );
          })}

          {isConnected && displayPosts.length === 0 && (
            <div className="bg-[rgba(117,122,132,0.08)] p-3 rounded-[6px] text-sm text-[#747986]">
              No posts yet. Waiting for new tweets...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
