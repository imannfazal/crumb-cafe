import { products, categories } from '../../../data/products';
import MenuProductCard from '../../../components/menu/MenuProductCard';
import CartIcon from '../../../components/menu/CartIcon';
import Footer from '../../../components/layout/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const categoryInfo = categories.find((c) => c.id === category);
  const items = products.filter((p) => p.category === category);

  if (!categoryInfo) notFound();

  return (
    <main className="bg-crumb-bg min-h-screen">
      <div className="px-6 pt-8 pb-14">
        <div className="flex justify-between items-center mb-4">
          <Link href="/menu" className="text-crumb-primary text-sm">
            ← Back to menu
          </Link>
          <CartIcon />
        </div>
        <h1 className="font-hand text-3xl text-crumb-primary text-center mb-8">
          {categoryInfo.name}
        </h1>
        <div className="flex flex-col">
          {items.map((product) => (
            <MenuProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}