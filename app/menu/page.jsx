import Link from 'next/link';
import { products } from '../../data/products';
import MenuProductCard from '../../components/menu/MenuProductCard';
import CartIcon from '../../components/menu/CartIcon';
import Footer from '../../components/layout/Footer';

export default function MenuPage() {
    return (
        <main className="bg-crumb-bg min-h-screen">
            <div className="px-6 pt-8 pb-14">
                <div className="flex justify-between items-center mb-4">
                    <Link href="/" className="text-crumb-primary text-sm">
                        ← Back to home
                    </Link>
                    <CartIcon />
                </div>
                <h1 className="font-hand text-3xl text-crumb-primary text-center mb-8">
                    Our Menu
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 md:max-w-4xl md:mx-auto ">
                    {products.map((product) => (
                        <MenuProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}