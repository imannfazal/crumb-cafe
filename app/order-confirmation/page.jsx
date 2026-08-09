'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const WHATSAPP_NUMBER = '971588295388'; // replace with her real WhatsApp number, no + or spaces

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('crumb-last-order');
    if (stored) setOrder(JSON.parse(stored));
  }, []);

  if (!order) {
    return (
      <main className="bg-crumb-bg min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="text-crumb-text mb-6">No recent order found.</p>
        <Link href="/menu" className="text-crumb-primary underline text-sm">
          <img src="/images/icons/back-button.svg" alt="Back" className="inline-block mr-2 h-[11px] -mt-[2px]" /> Back to menu
        </Link>
      </main>
    );
  }

  const shortOrderId = order.id.slice(0, 8);
  const whatsappMessage = encodeURIComponent(
    `Hi! I just placed an order (#${shortOrderId}) for AED ${order.total}. Sending payment confirmation now.`
  );
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <main className="bg-crumb-bg min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-hand text-3xl text-crumb-primary mb-3">
        Order received!
      </h1>
      <p className="text-crumb-text mb-6">
        Thanks {order.name}, we're getting started on your order. You'll hear from us soon at {order.phone}.
      </p>

      <div className="bg-crumb-bgLight rounded-xl p-4 w-full max-w-sm text-left mb-6">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm text-crumb-text mb-1">
            <span>{item.qty} × {item.name}</span>
            <span>AED {item.qty * item.price}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-crumb-primary mt-2 pt-2 border-t border-crumb-primary/20">
          <span>Total</span>
          <span>AED {order.total}</span>
        </div>
      </div>

      {order.paymentMethod === 'bank-transfer' && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-sm mb-4 block text-center bg-green-500 text-white font-bold py-3 rounded-full hover:bg-green-600 transition-colors"
        >
          Send Payment Confirmation on WhatsApp
        </a>
      )}

      <Link
        href="/menu"
        className="bg-crumb-primary text-white font-bold px-6 py-3 rounded-full hover:bg-crumb-primaryDark transition-colors"
      >
        Order Something Else
      </Link>
    </main>
  );
}