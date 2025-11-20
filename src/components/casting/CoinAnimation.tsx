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
          <div className="w-20 h-20 rounded-full border-4 border-primary bg-card flex items-center justify-center text-3xl font-bold shadow-lg">
            {coin === 3 ? (
              <span className="text-primary">陽</span>
            ) : (
              <span className="text-muted-foreground">陰</span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

