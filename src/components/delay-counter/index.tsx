'use client';

import { useEffect, useState } from 'react';
import WarningIcon from '@/components/icons/warning';
import { useAuthStore } from '@/stores/use-auth-store';

export const DelayCounter = () =>
{
  const [delay, setDelay] = useState(5);
  const [baseDelay, setBaseDelay] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { isPremium } = useAuthStore();

  // Function to get small fluctuation (-0.09 to +0.04)
  const getFluctuation = (base: number) =>
  {
    const variation = (Math.random() * 0.13) - 0.09;
    return Number((base + variation).toFixed(2));
  };

  useEffect(() =>
  {
    // Handle regular fluctuations
    const fluctuationInterval = setInterval(() =>
    {
      if (!isTransitioning) {
        setDelay(getFluctuation(baseDelay));
      }
    }, 200);

    return () => clearInterval(fluctuationInterval);
  }, [baseDelay, isTransitioning]);

  useEffect(() =>
  {
    // Handle spikes
    const handleSpike = async () =>
    {
      setIsTransitioning(true);

      // Transition up
      const targetHigh = 6.2 + (Math.random() * 0.3);
      for (let i = 0; i < 10; i++) {
        const step = baseDelay + ((targetHigh - baseDelay) * (i + 1) / 10);
        setDelay(Number(step.toFixed(2)));
        setBaseDelay(Number(step.toFixed(2)));
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Set high state
      setBaseDelay(targetHigh);
      setIsTransitioning(false);

      // Wait for random duration (15-30 seconds)
      await new Promise(resolve =>
        setTimeout(resolve, 15000 + Math.random() * 15000)
      );

      // Transition down
      setIsTransitioning(true);
      const targetLow = 5;
      for (let i = 0; i < 10; i++) {
        const step = targetHigh - ((targetHigh - targetLow) * (i + 1) / 10);
        setDelay(Number(step.toFixed(2)));
        setBaseDelay(Number(step.toFixed(2)));
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      setBaseDelay(5);
      setIsTransitioning(false);
    };

    const spikeInterval = setInterval(() =>
    {
      handleSpike();
    }, 10000);

    return () => clearInterval(spikeInterval);
  }, []);

  return (
    <div className="flex items-center h-[24px] border px-2 rounded-[4px] border-[rgba(255,255,255,0.05)]">
      <div className="feed-delay-pulse">
        <div className="feed-delay-pulse-outer-circle" />
        <div className="feed-delay-pulse-inner-circle" />
      </div>
      <p className="ml-2 text-[11px] tracking-[-0.55px] font-suisse-intl-mono text-white">
        {isPremium ? '0MS DELAY' : `${delay.toFixed(2)}M DELAY`}
      </p>
      {isPremium ? null : <WarningIcon className="text-[#747986] ml-1" />}
    </div>
  );
};

export default DelayCounter; 