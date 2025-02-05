import Badge from "@/components/badge";
import BearishIcon from "@/components/icons/bearish";
import BullishIcon from "@/components/icons/bullish";
import NeutralIcon from "@/components/icons/neutral";

type SentimentType = 'bearish' | 'bullish' | 'neutral';

interface SentimentIndicatorProps
{
  sentiment: SentimentType;
}

export default function SentimentIndicator({ sentiment }: SentimentIndicatorProps)
{
  const config = {
    bearish: { color: 'red' as const, icon: <BearishIcon />, text: 'BEARISH' },
    bullish: { color: 'green' as const, icon: <BullishIcon />, text: 'BULLISH' },
    neutral: { color: 'gray' as const, icon: <NeutralIcon />, text: 'NEUTRAL' },
  };

  // Validate that sentiment is one of the expected values
  if (!sentiment || !config[sentiment as SentimentType]) {
    return null;
  }

  const { color, icon, text } = config[sentiment];

  return (
    <Badge color={color} withGlow startContent={icon}>
      {text}
    </Badge>
  );
}