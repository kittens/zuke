import Fuse from 'fuse.js';
import type { FuseResult, IFuseOptions } from 'fuse.js';
import { useMemo, useState } from 'react';
import { WebSocketMessage } from './use-websocket';

export function useSearch(posts: WebSocketMessage[])
{
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Configure Fuse instance with our search options
  const fuse = useMemo(() =>
  {
    const options: IFuseOptions<WebSocketMessage> = {
      includeScore: true,
      threshold: 0.3,
      keys: [
        { name: 'tweet.text', weight: 0.5 },        // Highest priority
        { name: 'tweet.username', weight: 0.3 },    // Medium priority
        { name: 'tweet.display_name', weight: 0.3 }, // Medium priority
        { name: 'tickers.token.name', weight: 0.2 }  // Lower priority
      ]
    };

    return new Fuse(posts, options);
  }, [posts]);

  // Perform search and return filtered results
  const search = (query: string) =>
  {
    setSearchQuery(query);
  };

  // Get search results
  const searchResults = useMemo(() =>
  {
    if (!searchQuery) return null;

    return fuse.search(searchQuery).map((result: FuseResult<WebSocketMessage>) => result.item);
  }, [fuse, searchQuery]);

  return {
    search,
    searchResults,
    searchQuery
  };
} 