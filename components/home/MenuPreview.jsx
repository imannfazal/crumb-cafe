import Link from 'next/link';
import ProductCard from '../menu/ProductCard';
import ComingSoonCard from '../menu/ComingSoonCard';

export default function MenuPreview() {
    return (
        <section className="bg-crumb-bg pt-10 pb-14">
            <h2 className="font-hand text-[30px] md:text-[60px] text-crumb-primary text-center mb-8">
                Fresh flavors for every mood
            </h2>
            <span className='md:grid md:grid-cols-4 md:gap-8'>
                <Link href="/menu/cookies">
                    <ProductCard name="Cookies" image="/images/products/cookies-tray.svg" />
                </Link>
                <Link href="/menu/brownies">
                    <ProductCard name="Brownies" image="/images/products/brownies-plate.svg" />
                </Link>
                <ComingSoonCard name="Cinnamon Rolls" image="/images/products/cinnamon-roll-plate.svg" />
                <ComingSoonCard name="Coffee" image="/images/products/coffee-cup.svg" />
            </span>
        </section>
    );
}