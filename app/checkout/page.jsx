'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../lib/api';

const BANK_DETAILS = {
  bankName: 'Emirates NBD', // update with her actual bank
  accountName: 'Her Full Name', // update with actual account holder name
  accountNumber: '0000000000000', // update with real account number
  iban: 'AE000000000000000000000', // update with real IBAN
};

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [fulfillment, setFulfillment] = useState('pickup');
  const [paymentMethod, setPaymentMethod] = useState('bank-transfer');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const orderPayload = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      fulfillment,
      address: form.address || null,
      notes: form.notes
        ? `${form.notes} | Payment: ${paymentMethod === 'bank-transfer' ? 'Bank Transfer' : 'Cash'}`
        : `Payment: ${paymentMethod === 'bank-transfer' ? 'Bank Transfer' : 'Cash'}`,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        qty: item.qty,
      })),
      total: totalPrice,
    };

    try {
      const order = await createOrder(orderPayload);
      localStorage.setItem('crumb-last-order', JSON.stringify({ ...order, paymentMethod }));
      clearCart();
      router.push('/order-confirmation');
    } catch (err) {
      console.error(err);
      alert('Something went wrong placing your order. Please try again.');
      setSubmitting(false);
    }
  }

  if (cart.length === 0) {
    return (
      <main className="bg-crumb-bg min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="text-crumb-text mb-6">Your cart is empty — add something tasty first.</p>
        <Link
          href="/menu"
          className="bg-crumb-primary text-white font-bold px-6 py-3 rounded-full hover:bg-crumb-primaryDark transition-colors"
        >
          Browse Treats
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-crumb-bg min-h-screen">
      <div className="px-6 pt-8 pb-14">
        <Link href="/cart" className="text-crumb-primary text-sm mb-4 inline-block">
          ← Back to cart
        </Link>

        <h1 className="font-hand text-3xl text-crumb-primary text-center mb-8">
          Checkout
        </h1>

        <div className="bg-crumb-bgLight rounded-xl p-4 mb-6">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm text-crumb-text mb-1">
              <span>{item.qty} × {item.name}</span>
              <span>AED {item.qty * item.price}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-crumb-primary mt-2 pt-2 border-t border-crumb-primary/20">
            <span>Total</span>
            <span>AED {totalPrice}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Pickup / Delivery */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setFulfillment('pickup')}
              className={`flex-1 py-2 rounded-full text-sm font-bold transition-colors ${
                fulfillment === 'pickup'
                  ? 'bg-crumb-primary text-white'
                  : 'bg-crumb-bgLight text-crumb-primary'
              }`}
            >
              Pickup
            </button>
            <button
              type="button"
              onClick={() => setFulfillment('delivery')}
              className={`flex-1 py-2 rounded-full text-sm font-bold transition-colors ${
                fulfillment === 'delivery'
                  ? 'bg-crumb-primary text-white'
                  : 'bg-crumb-bgLight text-crumb-primary'
              }`}
            >
              Delivery
            </button>
          </div>

          {/* Payment method */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-crumb-primary">Payment Method</span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('bank-transfer')}
                className={`flex-1 py-2 rounded-full text-sm font-bold transition-colors ${
                  paymentMethod === 'bank-transfer'
                    ? 'bg-crumb-primary text-white'
                    : 'bg-crumb-bgLight text-crumb-primary'
                }`}
              >
                Bank Transfer
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`flex-1 py-2 rounded-full text-sm font-bold transition-colors ${
                  paymentMethod === 'cash'
                    ? 'bg-crumb-primary text-white'
                    : 'bg-crumb-bgLight text-crumb-primary'
                }`}
              >
                Cash {fulfillment === 'pickup' ? 'on Pickup' : 'on Delivery'}
              </button>
            </div>
          </div>

          {paymentMethod === 'bank-transfer' && (
            <div className="bg-crumb-bgLight rounded-xl p-4 text-sm text-crumb-text">
              <p className="font-bold text-crumb-primary mb-2">Bank Transfer Details</p>
              <p>Bank: {BANK_DETAILS.bankName}</p>
              <p>Account Name: {BANK_DETAILS.accountName}</p>
              <p>Account Number: {BANK_DETAILS.accountNumber}</p>
              <p>IBAN: {BANK_DETAILS.iban}</p>
              <p className="mt-2 italic">
                Please complete the transfer and send a confirmation screenshot via WhatsApp. We'll start baking once payment is received.
              </p>
            </div>
          )}

          <input
            type="text"
            name="name"
            placeholder="Full name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full bg-white text-sm text-crumb-text outline-none"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            required
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full bg-white text-sm text-crumb-text outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full bg-white text-sm text-crumb-text outline-none"
          />

          {fulfillment === 'delivery' && (
            <input
              type="text"
              name="address"
              placeholder="Delivery address"
              required
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full bg-white text-sm text-crumb-text outline-none"
            />
          )}

          <textarea
            name="notes"
            placeholder="Any notes for your order? (optional)"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 rounded-2xl bg-white text-sm text-crumb-text outline-none resize-none"
          />

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 bg-crumb-primary text-white font-bold py-3 rounded-full hover:bg-crumb-primaryDark transition-colors disabled:opacity-50"
          >
            {submitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </main>
  );
}