'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useCart } from '../../context/CartContext';
import CartIcon from '../menu/CartIcon';
import HeroProductCarousel from './HeroProductCarousel';

const MotionLink = motion(Link);

export default function Hero() {
    const { totalItems } = useCart();

    return (
        <div className="overflow-hidden md:overflow-visible">
            <div className="w-full pt-[36px] px-6 flex justify-center md:justify-start items-center relative">
                <Link href="/">
                    <Image
                        src="/images/logo.svg"
                        alt="The Crumb Cafe"
                        width={140}
                        height={140}
                        priority
                    />
                </Link>
                {totalItems > 0 && (
                    <div className="absolute right-6 top-[36px]">
                        <CartIcon />
                    </div>
                )}
            </div>
            <section className="relative pt-9 pb-14">
                <HeroProductCarousel />

                <div className="ml-[33px] md:ml-[300px] md:pt-[30px]">
                    <h1 className="font-hand md:text-[50px] text-[37px] leading-[36px] md:leading-[56px] text-crumb-primary w-[198px] md:w-[500px] relative z-10">
                        Your cozy corner for warm, flavorful, freshly-baked goodness.
                    </h1>
                    <MotionLink
                        href="/menu"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.96, y: 2 }}
                        transition={{ duration: 0.15 }}
                        className="hover:cursor-pointer w-[139px] h-[44px] md:w-[239px] md:h-[60px] mt-8 rounded-full bg-crumb-primary text-white font-medium text-[12px] md:text-[16px] relative z-10 hover:bg-crumb-primaryDark transition-colors flex items-center justify-center shadow-lg shadow-crumb-primaryDark/30 border-b-4 border-crumb-primaryDark"
                    >
                        Explore our menu
                    </MotionLink>
                </div>
            </section>
        </div>
    );
}