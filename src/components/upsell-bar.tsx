'use client';

import Button from "@/components/button";
import { TextScramble } from "@/components/effects/text-scramble";
import ChevronRightIcon from "@/components/icons/chevron-right";
import SparkleIcon from "@/components/icons/sparkle";
import { useState } from "react";
import { useAuthStore } from "@/stores/use-auth-store";
import UpgradeModal from "./upgrade-modal";
import { usePhantom } from "@/hooks/use-phantom";
import { motion } from "motion/react";

export default function UpsellBar()
{
  const { isPremium, publicKey } = useAuthStore();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const {
    connected,
  } = usePhantom();

  // If user is premium, don't show the upsell bar
  if (isPremium) {
    return null;
  }

  return (
    <div className="relative">
      <div className="w-full flex items-center h-[232px] bg-[rgba(35,36,42,0.35)] mt-5 rounded-[10px] zuke-bar relative overflow-hidden">
        <div className="px-10 flex flex-col relative z-10">
          <TextScramble as="h1" className="text-[28px] tracking-[-1.12px] leading-[33.6px] max-w-[300px] w-[300px] tabular-nums">
            Large Language Powered Trench Feed
          </TextScramble>
          <p className="text-l-small text-[#747986] mt-2 mb-4">FRONTRUN THE MARKET IN <span className="text-turqoise">EVERY SCENARIO</span></p>

          <div className="flex gap-3 items-center">
            {(!connected || !publicKey) &&
              <Button color="gray" onClick={() => document.getElementById('wallet-connect-button')?.click()} endContent={<ChevronRightIcon className="text-[#747986] opacity-[.8] group-hover:text-white transition-all duration-100" />}>GET STARTED</Button>
            }
            <UpgradeModal open={upgradeModalOpen} setOpen={setUpgradeModalOpen}>
              <Button
                color="turqoise"
                endContent={<SparkleIcon />}
                onClick={() => setUpgradeModalOpen(true)}
              >
                ZUKE PRO
              </Button>
            </UpgradeModal>
          </div>
        </div>
        <motion.img
          src="/zuke-header-small-coin.png"
          alt="zuke-header-small-coin"
          className="absolute top-[-80px] max-md:hidden md:right-[120px] lg:right-[250px] w-[257px] h-[261px] select-none pointer-events-none"
          initial={{
            y: -10,
          }}
          animate={{
            y: [-10, -20, 0, -10],
            rotate: [0, 0, -6, 0]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
        <div className="absolute dots w-full h-full pointer-events-none select-none z-[10]">
          <div className="w-[2px] h-[2px] bg-[#74CBE9] rounded-full opacity-[.3] filter blur-[2px] absolute top-[136px] left-[417px]"></div>
          <div className="w-[2px] h-[2px] bg-[#74CBE9] rounded-full opacity-[.3] filter blur-[0.5px] absolute top-[126px] left-[502px]"></div>
          <div className="w-[2px] h-[2px] bg-[#74CBE9] rounded-full opacity-[.2] filter blur-[0.5px] absolute top-[105px] left-[572px]"></div>
          <div className="w-[2px] h-[2px] bg-[#74CBE9] rounded-full opacity-[.2] filter blur-[0.9px] absolute top-[205px] left-[574px]"></div>
          <div className="w-[3px] h-[3px] bg-[#74CBE9] rounded-full opacity-[.2] filter blur-[2px] absolute top-[60px] left-[654px]"></div>
          <div className="w-[1.5px] h-[1.5px] bg-[#74CBE9] rounded-full opacity-[.6] filter blur-[0.7px] absolute top-[61px] left-[655px]"></div>
          <div className="w-[1.5px] h-[1.5px] bg-[#74CBE9] rounded-full opacity-[.6] filter blur-[0.7px] absolute top-[162px] left-[873px]"></div>
          <div className="w-[1.5px] h-[1.5px] bg-[#74CBE9] rounded-full opacity-[.6] filter blur-[0.7px] absolute top-[162px] left-[873px]"></div>
          <div className="w-[3px] h-[3px] bg-[#74CBE9] rounded-full opacity-[.2] filter blur-[2px] absolute top-[200px] left-[1000px]"></div>
          <div className="w-[1.5px] h-[1.5px] bg-[#74CBE9] rounded-full opacity-[.6] filter blur-[0.7px] absolute top-[201px] left-[1001px]"></div>
        </div>
      </div>

      <motion.img
        src="/zuke-header-big-coin.png"
        alt="zuke-header-big-coin"
        className="absolute top-[-45px] max-md:hidden md:right-[30px] lg:right-[100px] w-[314px] h-[320px] select-none pointer-events-none"
        initial={{
          y: -5,
        }}
        animate={{
          y: [-5, 5, -5],
          rotate: [0, -3, 0]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
