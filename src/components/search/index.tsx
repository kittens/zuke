import MagnifierIcon from "@/components/icons/magnifier";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

interface SearchProps
{
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps)
{
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() =>
  {
    onSearch(value);
  }, [value]);

  return (
    <div className={classNames("flex items-center gap-1.5 h-[28px] px-2 py-1.5 rounded-[4px] border border-[rgba(255,255,255,0.05)] transition-all duration-100 ease-in-out", isFocused && 'bg-[rgba(255,255,255,0.05)]')}
      onClick={() => ref.current?.focus()}
    >
      <MagnifierIcon />
      <input type="text" placeholder="SEARCH" className="bg-transparent outline-none text-[12px] leading-[20px] tracking-[-0.36px] text-[#9CA0AB] font-suisse-intl-mono" ref={ref} onChange={(e) => setValue(e.target.value)} value={value} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
    </div>
  );
}