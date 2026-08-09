'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CartPage() {
  const { cart, updateQty, removeFromCart, totalPrice } = useCart();

  return (
    <main className="bg-crumb-bg min-h-screen">
      <div className="px-6 pt-8 pb-14">
        <Link href="/menu" className="text-crumb-primary text-sm mb-4 inline-block">
          <img src="/images/icons/back-button.svg" alt="Back" className="inline-block mr-2 h-[11px] -mt-[2px]" />
          Back to menu
        </Link>

        <h1 className="font-hand text-3xl text-crumb-primary text-center mb-8">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center text-center mt-10">
            <p className="text-crumb-text mb-6">
              Your cart's looking a little empty,<br />let's fix that.
            </p>
            <Link
              href="/menu"
              className="bg-crumb-primary text-white font-bold px-6 py-3 rounded-full hover:bg-crumb-primaryDark transition-colors"
            >
              Browse Treats
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {cart.map((item) => {
                const imageSrc = item.image?.startsWith('/uploads')
                  ? `${API_URL}${item.image}`
                  : item.image;

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-crumb-bgLight rounded-xl p-3"
                  >
                    <Image
                      src={imageSrc}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover w-14 h-14"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-crumb-primary">{item.name}</p>
                      <p className="text-xs text-crumb-text">AED {item.price}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-crumb-accent rounded-full px-2 py-1">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="text-white font-bold px-1"
                      >
                        −
                      </button>
                      <span className="text-white text-xs font-bold w-4 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="text-white font-bold px-1"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-crumb-primary text-xs underline ml-2"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-between items-center border-t border-crumb-primary/20 pt-4">
              <span className="font-bold text-crumb-primary">Total</span>
              <span className="font-bold text-crumb-primary">AED {totalPrice}</span>
            </div>

            <Link
              href="/checkout"
              className="mt-6 block text-center bg-crumb-primary text-white font-bold py-3 rounded-full hover:bg-crumb-primaryDark transition-colors"
            >
              Proceed to Checkout
            </Link>
          </>
        )}
      </div>
    </main>
  );
}