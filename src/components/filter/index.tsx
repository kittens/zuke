'use client';

import { useRef, useState } from "react";
import Button from "../button";
import ChevronDownIcon from "../icons/chevron-down-icon";
import FilterIcon from "../icons/filter";
import { useOnClickOutside } from 'usehooks-ts';

interface FilterProps
{
  filter: string;
  onFilter: (filter: string) => void;
}

export default function Filter({ filter, onFilter }: FilterProps)
{
  const [isOpen, setIsOpen] = useState(false);
  console.log('Filter component rendered with:', filter);

  const dropdownRef = useRef<HTMLDivElement>(null!);
  useOnClickOutside(dropdownRef, () =>
  {
    if (isOpen) {
      setIsOpen(false)
    }
  });

  const handleFilter = (f: string) =>
  {
    onFilter(f);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button onClick={() => setIsOpen(!isOpen)} color="gray" size="sm" startContent={<FilterIcon />} animate={false} endContent={<ChevronDownIcon className="text-[#767A84]" />} key={filter}>
        FILTER {filter !== 'all' ? ` (${filter.toUpperCase()})` : ''}
      </Button>

      {isOpen && (
        <div className="absolute top-[34px] right-0 w-[160px] z-10 shadow-[0_0_0_1px_rgba(116,121,132,0.05),inset_0_1px_rgba(116,121,132,0.05)] rounded-[4px] bg-[rgba(21,22,25,1)]">
          <div className="bg-[rgba(116,121,134,0.18)] rounded-[4px] px-1.5 py-1.5 flex flex-col gap-1">
            <div className={`flex items-center gap-2 cursor-pointer px-2 py-1.5 rounded-[4px] transition-all duration-100 hover:bg-[rgba(116,121,134,0.18)] ${filter === 'all' ? 'bg-[rgba(116,121,134,0.18)]' : ''}`} onClick={() => handleFilter('all')}>
              <div className="w-2 h-2 rounded-full bg-turqoise" />
              <p className="text-[11px] tracking-[-0.55px] font-suisse-intl-mono text-white">ALL</p>
            </div>
            <div className={`flex items-center gap-2 cursor-pointer px-2 py-1.5 rounded-[4px] transition-all duration-100 hover:bg-[rgba(116,121,134,0.18)] ${filter === 'bullish' ? 'bg-[rgba(116,121,134,0.18)]' : ''}`} onClick={() => handleFilter('bullish')}>
              <div className="w-2 h-2 rounded-full bg-[#8DEA7E]" />
              <p className="text-[11px] tracking-[-0.55px] font-suisse-intl-mono text-white">BULLISH</p>
            </div>
            <div className={`flex items-center gap-2 cursor-pointer px-2 py-1.5 rounded-[4px] transition-all duration-100 hover:bg-[rgba(116,121,134,0.18)] ${filter === 'bearish' ? 'bg-[rgba(116,121,134,0.18)]' : ''}`} onClick={() => handleFilter('bearish')}>
              <div className="w-2 h-2 rounded-full bg-[#EB7777]" />
              <p className="text-[11px] tracking-[-0.55px] font-suisse-intl-mono text-white">BEARISH</p>
            </div>
            <div className={`flex items-center gap-2 cursor-pointer px-2 py-1.5 rounded-[4px] transition-all duration-100 hover:bg-[rgba(116,121,134,0.18)] ${filter === 'neutral' ? 'bg-[rgba(116,121,134,0.18)]' : ''}`} onClick={() => handleFilter('neutral')}>
              <div className="w-2 h-2 rounded-full bg-[#747986]" />
              <p className="text-[11px] tracking-[-0.55px] font-suisse-intl-mono text-white">NEUTRAL</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}