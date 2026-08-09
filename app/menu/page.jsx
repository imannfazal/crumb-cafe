'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import MenuProductCard from '../../components/menu/MenuProductCard';
import CartIcon from '../../components/menu/CartIcon';
import GoToCartButton from '../../components/menu/GoToCartButton';
// import Footer from '../../components/layout/Footer';
import { getProducts } from '../../lib/api';

export default function MenuPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-crumb-bg min-h-screen flex flex-col mb-12">
      <div className="px-6 pt-8 pb-14 flex-1">
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="text-crumb-primary text-sm">
            <img src="/images/icons/back-button.svg" alt="Back" className="inline-block mr-2 h-[11px] -mt-[2px]" /> Back to home
          </Link>
          <CartIcon />
        </div>
        <h1 className="font-hand text-3xl text-crumb-primary text-center mb-8">
          Our Menu
        </h1>

        {loading ? (
          <p className="text-center text-crumb-text">Loading treats...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 md:max-w-4xl md:mx-auto">
            {products.map((product) => (
              <MenuProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <GoToCartButton />
      </div>
      {/* <Footer /> */}
    </main>
  );
}