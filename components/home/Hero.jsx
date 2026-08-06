import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    return (
        <div className="overflow-hidden">
            <div className="w-full pt-[36px] flex justify-center items-center">
                <Link href="/">
                    <Image
                        src="/images/logo.svg"
                        alt="The Crumb Cafe"
                        width={140}
                        height={140}
                        priority
                    />
                </Link>
            </div>
            <section className="relative px-6 pt-9 pb-14">
                {/* Cookies - left */}
                <Image
                    src="/images/products/cookies.svg"
                    alt="Fresh cookies"
                    width={250}
                    height={250}
                    className="absolute left-[-108px] top-[-60px] w-[250px] md:w-36 h-auto"
                />

                {/* Cinnamon roll - top right */}
                <Image
                    src="/images/products/cinamon-roll.svg"
                    alt="Cinnamon roll"
                    width={120}
                    height={120}
                    className="absolute right-0 -top-10  md:w-32 h-auto"
                />

                {/* Brownie - bottom right */}
                <Image
                    src="/images/products/brownie.svg"
                    alt="Brownie"
                    width={300}
                    height={300}
                    className="absolute right-[-20px]   md:w-40 h-auto"
                />
                <div className="ml-[49px]">
                    <h1 className="font-hand text-[37px] leading-[36px] text-crumb-primary w-[221px] md:max-w-xs  relative z-10">
                        Your cozy corner for warm, flavorful, freshly-baked goodness.
                    </h1>

                    <button className="w-[139px] h-[44px] mt-8  py-4 rounded-full bg-crumb-primary text-white font-medium text-[12px] relative z-10 hover:bg-crumb-primaryDark transition-colors">
                        Explore our menu
                    </button>
                </div>
            </section>
        </div>
    );
}