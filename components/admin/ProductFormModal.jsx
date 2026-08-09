'use client';

import { useState } from 'react';
import Image from 'next/image';
import { createProduct, updateProduct, uploadImage } from '../../lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CATEGORIES = [
  { value: 'cookies', label: 'Cookies' },
  { value: 'brownies', label: 'Brownies' },
  { value: 'cinnamon-rolls', label: 'Cinnamon Rolls' },
  { value: 'coffee', label: 'Coffee' },
];

export default function ProductFormModal({ product, onClose, onSaved }) {
  const isEditing = !!product;

  const [form, setForm] = useState({
    name: product?.name || '',
    category: product?.category || CATEGORIES[0].value,
    price: product?.price || '',
    image: product?.image || '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(
    product?.image
      ? product.image.startsWith('/uploads')
        ? `${API_URL}${product.image}`
        : product.image
      : null
  );
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImageSelect(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = form.image;

      if (imageFile) {
        const uploadResult = await uploadImage(imageFile);
        imageUrl = uploadResult.url;
      }

      const payload = {
        name: form.name,
        category: form.category,
        price: parseFloat(form.price),
        image: imageUrl,
      };

      if (isEditing) {
        await updateProduct(product.id, payload);
      } else {
        await createProduct({ ...payload, in_stock: true, coming_soon: false });
      }

      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to save product.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-6 z-50">
      <div className="bg-crumb-bg rounded-2xl p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto">
        <h2 className="font-hand text-2xl text-crumb-primary text-center mb-4">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {preview && (
            <Image
              src={preview}
              alt="Preview"
              width={200}
              height={150}
              className="w-full h-32 object-cover rounded-xl"
            />
          )}

          <label className="w-full text-center bg-crumb-bgLight text-crumb-primary font-bold text-sm py-3 rounded-full cursor-pointer hover:opacity-90 transition-opacity">
            {imageFile ? 'Change Image' : 'Choose Product Image'}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </label>

          <input
            type="text"
            name="name"
            placeholder="Product name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full bg-white text-sm text-crumb-text outline-none"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full bg-white text-sm text-crumb-text outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price (AED)"
            required
            step="0.01"
            value={form.price}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full bg-white text-sm text-crumb-text outline-none"
          />

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full bg-crumb-bgLight text-crumb-primary font-bold text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 rounded-full bg-crumb-primary text-white font-bold text-sm disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}