'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts, updateProductStock, updateProductQuantity, deleteProduct } from '../../../lib/api';
import ProductFormModal from '../../../components/admin/ProductFormModal';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [quantityInputs, setQuantityInputs] = useState({});

  useEffect(() => {
    loadProducts();
  }, []);

  function loadProducts() {
    setLoading(true);
    getProducts()
      .then((data) => {
        setProducts(data);
        const initialInputs = {};
        data.forEach((p) => {
          initialInputs[p.id] = p.quantity ?? '';
        });
        setQuantityInputs(initialInputs);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  async function handleToggle(productId, currentStock) {
    try {
      await updateProductStock(productId, !currentStock);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, in_stock: !currentStock } : p
        )
      );
    } catch (err) {
      console.error(err);
      alert('Failed to update stock.');
    }
  }

  async function handleQuantitySave(productId) {
    const raw = quantityInputs[productId];
    const quantity = raw === '' ? null : parseInt(raw, 10);

    try {
      const updated = await updateProductQuantity(productId, quantity);
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? updated : p))
      );
    } catch (err) {
      console.error(err);
      alert('Failed to update quantity.');
    }
  }

  async function handleDelete(productId, productName) {
    const confirmed = window.confirm(`Delete "${productName}"? This can't be undone.`);
    if (!confirmed) return;

    try {
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      console.error(err);
      alert('Failed to delete product.');
    }
  }

  function openAddModal() {
    setEditingProduct(null);
    setModalOpen(true);
  }

  function openEditModal(product) {
    setEditingProduct(product);
    setModalOpen(true);
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

      <h1 className="font-hand text-3xl text-crumb-primary text-center mb-6">
        Products
      </h1>

      <div className="max-w-2xl mx-auto mb-4">
        <button
          onClick={openAddModal}
          className="w-full bg-crumb-primary text-white font-bold py-3 rounded-full hover:bg-crumb-primaryDark transition-colors"
        >
          + Add New Product
        </button>
      </div>

      {loading ? (
        <p className="text-center text-crumb-text">Loading products...</p>
      ) : (
        <div className="flex flex-col gap-3 max-w-2xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col gap-2 bg-crumb-bgLight rounded-xl p-3"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={product.image.startsWith('/uploads') ? `${API_URL}${product.image}` : product.image}
                  alt={product.name}
                  width={50}
                  height={50}
                  className="rounded-lg object-cover w-12 h-12"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-crumb-primary">{product.name}</p>
                  <p className="text-xs text-crumb-text">AED {product.price}</p>
                </div>

                <button
                  onClick={() => openEditModal(product)}
                  className="text-xs font-bold text-crumb-primary underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(product.id, product.name)}
                  className="text-xs font-bold text-red-500 underline"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleToggle(product.id, product.in_stock)}
                  className={`text-xs font-bold px-4 py-2 rounded-full transition-colors ${
                    product.in_stock
                      ? 'bg-crumb-primary text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {product.in_stock ? 'In Stock' : 'Out of Stock'}
                </button>
              </div>

              <div className="flex items-center gap-2 pl-[60px]">
                <label className="text-xs text-crumb-text">Today's quantity:</label>
                <input
                  type="number"
                  min="0"
                  placeholder="Unlimited"
                  value={quantityInputs[product.id] ?? ''}
                  onChange={(e) =>
                    setQuantityInputs({ ...quantityInputs, [product.id]: e.target.value })
                  }
                  className="w-20 px-2 py-1 rounded-lg bg-white text-xs text-crumb-text outline-none"
                />
                <button
                  onClick={() => handleQuantitySave(product.id)}
                  className="text-xs font-bold text-crumb-primary underline"
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => setModalOpen(false)}
          onSaved={loadProducts}
        />
      )}
    </main>
  );
}