'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../context/CartContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MenuProductCard({ product }) {
  const {
    name,
    image,
    price,
    in_stock: inStock,
    coming_soon: comingSoon,
    quantity,
    id,
  } = product;

  const imageSrc = image?.startsWith('/uploads') ? `${API_URL}${image}` : image;

  const { cart, addToCart, updateQty } = useCart();

  const cartItem = cart.find((item) => item.id === id);
  const qty = cartItem ? cartItem.qty : 0;

  const hasLimitedStock = quantity !== null && quantity !== undefined;
  const atMaxQty = hasLimitedStock && qty >= quantity;
  const lowStock = hasLimitedStock && quantity > 0 && quantity <= 5;

  return (
    <motion.div layout className="relative rounded-2xl overflow-hidden bg-crumb-primary w-full">
      <span className={`absolute top-2 left-0 right-0 text-center font-hand text-[17px] md:text-base z-10 px-1 ${comingSoon ? 'text-white/50' : 'text-white'}`}>
        {name}
      </span>

      <Image
        src={imageSrc}
        alt={name}
        width={200}
        height={200}
        className={`w-full h-44 md:h-40 object-cover mt-2 ${comingSoon ? 'opacity-40 blur-[1px]' : ''}`}
      />

      {comingSoon ? (
        <span className="absolute inset-0 flex items-center justify-center text-crumb-accent font-bold text-xs z-10">
          Coming Soon
        </span>
      ) : price !== undefined ? (
        <motion.div layout className="flex flex-col gap-1 px-2 py-2 bg-crumb-primaryDark">
          <div className="flex items-center justify-between">
            <span className="text-white font-body text-xs">AED {price}</span>
            {lowStock && (
              <span className="text-crumb-accent text-[10px] font-bold">
                Only {quantity} left
              </span>
            )}
          </div>

          <AnimatePresence mode="wait">
            {qty === 0 ? (
              <motion.button
                key="add-button"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                disabled={!inStock}
                onClick={() => addToCart(product)}
                className="bg-crumb-accent text-white text-[10px] font-bold px-2 h-[30px] rounded-full hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed w-full"
              >
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </motion.button>
            ) : (
              <motion.div
                key="stepper"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center gap-2 bg-crumb-accent rounded-full px-2 h-[30px]"
              >
                <button
                  onClick={() => updateQty(id, qty - 1)}
                  className="text-white font-bold text-sm leading-none"
                >
                  −
                </button>
                <span className="text-white text-[10px] font-bold w-3 text-center">{qty}</span>
                <button
                  onClick={() => !atMaxQty && updateQty(id, qty + 1)}
                  disabled={atMaxQty}
                  className="text-white font-bold text-sm leading-none disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </motion.div>
  );
}