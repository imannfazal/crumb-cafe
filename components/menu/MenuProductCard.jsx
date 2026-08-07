'use client';

import Image from 'next/image';
import { useCart } from '../../context/CartContext';

export default function MenuProductCard({ product }) {
  const { name, image, price, inStock, comingSoon, id } = product;
  const { cart, addToCart, updateQty } = useCart();

  const cartItem = cart.find((item) => item.id === id);
  const qty = cartItem ? cartItem.qty : 0;

  return (
    <div className="relative rounded-2xl overflow-hidden bg-crumb-primary mx-0 mb-6 w-full ">
      <span className={`absolute top-4 left-0 right-0 text-center font-hand text-xl z-10 ${comingSoon ? 'text-white/50' : 'text-white'}`}>
        {name}
      </span>

      <Image
        src={image}
        alt={name}
        width={900}
        height={800}
        className={`w-full h-[140px] object-cover mt-10 ${comingSoon ? 'opacity-40 blur-[1px]' : ''}`}
      />

      {comingSoon ? (
        <span className="absolute inset-0 flex items-center justify-center text-crumb-accent font-bold text-sm z-10">
          Coming Soon
        </span>
      ) : price !== undefined ? (
        <div className="flex justify-between items-center px-3 py-3 bg-crumb-primaryDark">
          <span className="text-white font-body text-xs">AED {price}</span>

          {qty === 0 ? (
            <button
              disabled={!inStock}
              onClick={() => addToCart(product)}
              className="bg-crumb-accent text-white text-xs font-semibold px-2 py-[5px] rounded-full hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-crumb-accent rounded-full px-2 py-1">
              <button
                onClick={() => updateQty(id, qty - 1)}
                className="text-white font-bold text-lg leading-none"
              >
                −
              </button>
              <span className="text-white text-xs font-bold w-4 text-center">{qty}</span>
              <button
                onClick={() => updateQty(id, qty + 1)}
                className="text-white font-bold text-lg leading-none"
              >
                +
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}