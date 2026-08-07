'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import CartIcon from '../menu/CartIcon';

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
            <section className="relative px-6 pt-9 pb-14">
                {/* Cookies - left */}
                <Image
                    src="/images/products/cookies.svg"
                    alt="Fresh cookies"
                    width={250}
                    height={250}
                    className="absolute left-[-108px] md:left-[-120px] top-[-60px] md:top-[-90px] w-[250px] md:w-[500px] h-auto"
                />
                {/* Cinnamon roll - top right */}
                <Image
                    src="/images/products/cinamon-roll.svg"
                    alt="Cinnamon roll"
                    width={120}
                    height={120}
                    className="absolute right-0 -top-10 md:top-[-150px] md:w-[350px] h-auto"
                />
                {/* Brownie - bottom right */}
                <Image
                    src="/images/products/brownie.svg"
                    alt="Brownie"
                    width={300}
                    height={300}
                    className="absolute right-[-20px] md:right-[350px] md:w-[560px] h-auto md:top-[-60px]"
                />
                <div className="ml-[49px] md:ml-[300px] md:pt-[30px]">
                    <h1 className="font-hand md:text-[50px] text-[37px] leading-[36px] md:leading-[56px] text-crumb-primary w-[221px] md:w-[500px]  relative z-10">
                        Your cozy corner for warm, flavorful, freshly-baked goodness.
                    </h1>
                    <Link
                        href="/menu"
                        className="hover:cursor-pointer w-[139px] h-[44px] md:w-[239px] md:h-[60px] mt-8 rounded-full bg-crumb-primary text-white font-medium text-[12px] md:text-[16px] relative z-10 hover:bg-crumb-primaryDark transition-colors flex items-center justify-center"
                    >
                        Explore our menu
                    </Link>
                </div>
            </section>
        </div>
    );
}