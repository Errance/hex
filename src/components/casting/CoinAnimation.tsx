"use client";

import { motion } from "framer-motion";
import type { CoinValue } from "@/types/divination";

interface CoinAnimationProps {
  coins: [CoinValue, CoinValue, CoinValue];
  isAnimating: boolean;
}

export function CoinAnimation({ coins, isAnimating }: CoinAnimationProps) {
  return (
    <div className="flex gap-8 items-center justify-center">
      {coins.map((coin, index) => (
        <motion.div
          key={index}
          className="relative"
          animate={
            isAnimating
              ? {
                  rotateX: [0, 1080],
                  rotateY: [0, 720],
                }
              : {}
          }
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
        >
          {/* 中国古钱币：外圆内方 */}
          <div className="relative w-20 h-20">
            {/* 外圆 */}
            <div className="absolute inset-0 rounded-full border-4 border-primary bg-gradient-to-br from-amber-600/90 to-amber-800/90 shadow-lg" />
            
            {/* 内方孔 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-card border-2 border-primary/50 shadow-inner" />
            </div>
            
            {/* 文字 */}
            <div className="absolute inset-0 flex items-center justify-center">
              {coin === 3 ? (
                <span className="text-2xl font-bold text-primary drop-shadow-md">陽</span>
              ) : (
                <span className="text-2xl font-bold text-card drop-shadow-md">陰</span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

