'use client';

import Link from 'next/link';
import { useCart } from '../../context/CartContext';

export default function GoToCartButton() {
  const { totalItems, totalPrice } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 px-6 pb-6 pt-3 bg-gradient-to-t from-crumb-bg via-crumb-bg/95 to-transparent z-20">
      <Link
        href="/cart"
        className="flex justify-between items-center bg-crumb-primary text-white font-bold px-6 py-3 rounded-full shadow-lg max-w-md mx-auto hover:bg-crumb-primaryDark transition-colors"
      >
        <span>{totalItems} item{totalItems > 1 ? 's' : ''} · AED {totalPrice}</span>
        <span>Go to Cart →</span>
      </Link>
    </div>
  );
}