'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

const PRODUCTS = [
  '/images/products/brownie-motion.svg',
  '/images/products/cookies-motion.svg',
  '/images/products/cinnamon-rolls-motion.svg',
  '/images/products/coffee-motion.svg',
];

const variants = {
  main: { x: 0, y: 0, scale: 1, filter: 'blur(0px)', opacity: 1 },
  secondary: { x: 55, y: -18, scale: 0.55, filter: 'blur(3px)', opacity: 0.65 },
  enter: { x: 90, y: -30, scale: 0.35, filter: 'blur(5px)', opacity: 0 },
  exit: { x: -20, y: 90, scale: 0.8, filter: 'blur(0px)', opacity: 0 },
};

export default function HeroProductCarousel() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycle((prev) => prev + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const mainIdx = cycle % PRODUCTS.length;
  const secondaryIdx = (cycle + 1) % PRODUCTS.length;

  const visible = [
    { key: mainIdx, role: 'main' },
    { key: secondaryIdx, role: 'secondary' },
  ];

  return (
    <div className="absolute right-[-50px] md:right-[350px] top-[-40px] md:top-[-60px] w-[250px] md:w-[560px] h-[300px] md:h-[560px]">
      <AnimatePresence>
        {visible.map((item) => (
          <motion.div
            key={item.key}
            variants={variants}
            initial="enter"
            animate={item.role}
            exit="exit"
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: item.role === 'main' ? 10 : 5 }}
          >
            <Image
              src={PRODUCTS[item.key]}
              alt="Fresh treats"
              width={300}
              height={300}
              className="w-full h-full object-contain"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}