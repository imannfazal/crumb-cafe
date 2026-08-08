'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAdminOrders, updateOrderStatus } from '../../lib/api';

const STATUS_OPTIONS = {
  pickup: ['received', 'baking', 'ready for pickup', 'picked up'],
  delivery: ['received', 'baking', 'out for delivery', 'delivered'],
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  function loadOrders() {
    setLoading(true);
    getAdminOrders()
      .then(setOrders)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  async function handleStatusChange(orderId, newStatus) {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error(err);
      alert('Failed to update status.');
    }
  }

  return (
    <main className="bg-crumb-bg min-h-screen px-6 pt-8 pb-14">
      <div className="flex justify-center gap-4 mb-6">
        <Link href="/admin" className="text-sm font-bold text-crumb-primary underline">
          Orders
        </Link>
        <Link href="/admin/products" className="text-sm font-bold text-crumb-primary underline">
          Products
        </Link>
      </div>

      <h1 className="font-hand text-3xl text-crumb-primary text-center mb-8">
        Orders
      </h1>

      {loading ? (
        <p className="text-center text-crumb-text">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-crumb-text">No orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {orders.map((order) => {
            const statusOptions = STATUS_OPTIONS[order.fulfillment] || STATUS_OPTIONS.pickup;

            return (
              <div key={order.id} className="bg-crumb-bgLight rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-crumb-primary">{order.name}</p>
                    <p className="text-xs text-crumb-text">{order.phone} · {order.email}</p>
                    <p className="text-xs text-crumb-text capitalize">
                      {order.fulfillment}{order.address ? ` — ${order.address}` : ''}
                    </p>
                  </div>
                  <span className="text-xs text-crumb-text">
                    {new Date(order.created_at).toLocaleString()}
                  </span>
                </div>

                <div className="text-sm text-crumb-text mb-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{item.qty} × {item.name}</span>
                      <span>AED {item.qty * item.price}</span>
                    </div>
                  ))}
                </div>

                {order.notes && (
                  <p className="text-xs text-crumb-text italic mb-2">Note: {order.notes}</p>
                )}

                <div className="flex justify-between items-center pt-2 border-t border-crumb-primary/20">
                  <span className="font-bold text-crumb-primary text-sm">
                    Total: AED {order.total}
                  </span>

                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="text-xs font-bold bg-crumb-primary text-white rounded-full px-3 py-1.5 outline-none capitalize"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status} className="capitalize">
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}