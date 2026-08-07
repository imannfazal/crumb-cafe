'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="relative inline-block">
      <Image src="/images/icons/cart.svg" alt="Cart" width={28} height={28} />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-crumb-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
}