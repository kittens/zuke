'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'motion/react';
import { AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import Button from '../button';
import ChevronRightIcon from '../icons/chevron-right';
import CrossIcon from '../icons/cross';
import { useAuthStore } from '@/stores/use-auth-store';

export default function HowItWorksModal()
{
  const { publicKey } = useAuthStore();
  const [open, setOpen] = useState(false);

  useEffect(() =>
  {
    // Check if it's the first visit
    const hasSeenModal = localStorage.getItem('hasSeenHowItWorksModal');

    // If user hasn't seen the modal and isn't logged in, show it
    if (!hasSeenModal && !publicKey) {
      setOpen(true);
      // Mark that user has seen the modal
      localStorage.setItem('hasSeenHowItWorksModal', 'true');
    } else {
      setOpen(false);
    }
  }, [publicKey, setOpen]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal forceMount>
        <AnimatePresence>
          {open && (
            <Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-overlayShow z-[50]" />
          )}
          {open && (
            <Dialog.Content>
              <motion.div
                className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] lg:max-w-[460px] -translate-x-1/2 -translate-y-1/2 focus:outline-none z-[100] bg-[#17191C] rounded-[6px] shadow-modal border border-[rgba(161,121,134,0.08)]"
                initial={{ scaleX: 0.9, scaleY: 0.65, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                animate={{ scaleX: 1, scaleY: 1, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                exit={{ scaleX: 0.9, scaleY: 0.65, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                transition={{ type: 'spring', stiffness: 400, damping: 20, mass: 0.05 }}
              // transition={{ ease: [0.6, 0.6, 0, 1.45], duration: .3 }}
              >
                <div className="flex flex-col">
                  <div className="flex flex-col p-[20px]">
                    <p className="mt-3 text-[#f9fbfc] text-[22px] font-[450] tracking-[-0.88px] leading-[28px] max-w-[200px]">How it works</p>
                    <p className="mt-2 text-[#747986] text-[13px] tracking-[-0.39px] leading-[20px] font-suisse-intl-mono">FILTER BY BULLISH, READ SUMMARY, USE HYPERLINKS TO QUICKBUY. PROFIT. ALL IN ONE PLACE.</p>
                  </div>

                  <div className="w-full h-[1px] bg-[rgba(116,121,134,0.08)]"></div>
                  <div className="zuke-how-it-works-modal">
                    <img src="/how-it-works-image.png" alt="How it works" className="w-full h-auto" />
                  </div>
                  <div className="w-full h-[1px] bg-[rgba(116,121,134,0.08)]"></div>

                  <div className="flex px-[20px] pt-[14px] pb-[16px] items-center justify-between">
                    <div className="flex gap-1.5 items-center">
                      <div className="w-[24px] h-[24px] bg-[hsla(195,73%,68%,0.1)] flex items-center justify-center rounded-full">
                        <img src="/zuke-favicon.svg" alt="Zuke" />
                      </div>
                      <p className="text-white text-[12px] tracking-[-0.6px] leading-[20px] font-suisse-intl-mono">POWERED BY <span className="underline underline-offset-2 decoration-dotted">$ZUKE</span></p>
                    </div>
                    <div className="flex ml-auto gap-3 justify-end items-center">
                      <Button
                        color={'gray'}
                        endContent={<ChevronRightIcon />}
                        onClick={() => document.getElementById('wallet-connect-button')?.click()}
                      >
                        GET STARTED
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
