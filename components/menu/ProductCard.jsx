'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

export default function ProductCard({ name, image }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className="relative rounded-2xl overflow-hidden bg-crumb-primary mx-auto mb-6 w-[220px] h-[273px] shadow-lg shadow-crumb-primaryDark/30 cursor-pointer"
    >
      <span className="absolute top-4 left-0 right-0 text-center font-hand text-[25px] text-white z-10">
        {name}
      </span>
      <Image
        src={image}
        alt={name}
        width={900}
        height={800}
        className="mt-10 w-[260px]"
      />
      <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center z-10">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 11L11 3M11 3H4M11 3V10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </motion.div>
  );
}