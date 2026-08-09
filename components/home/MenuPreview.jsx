'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '../menu/ProductCard';
import ComingSoonCard from '../menu/ComingSoonCard';
import { getProducts } from '../../lib/api';

const CATEGORIES = [
    { id: 'cookies', name: 'Cookies', fallbackImage: '/images/products/cookies-tray.svg' },
    { id: 'brownies', name: 'Brownies', fallbackImage: '/images/products/brownies-plate.svg' },
    { id: 'cinnamon-rolls', name: 'Cinnamon Rolls', fallbackImage: '/images/products/cinnamon-roll-plate.svg' },
    { id: 'coffee', name: 'Coffee', fallbackImage: '/images/products/coffee-cup.svg' },
];

export default function MenuPreview() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
            .then(setProducts)
            .catch((err) => console.error(err));
    }, []);

    const categoryCards = CATEGORIES.map((cat) => {
        const productsInCategory = products.filter((p) => p.category === cat.id);
        return {
            ...cat,
            hasProducts: productsInCategory.length > 0,
        };
    });

    return (
        <section className="bg-crumb-bg pt-10 pb-14">
            <h2 className="font-hand text-[30px] md:text-[60px] text-crumb-primary text-center mb-8">
                Fresh flavors for every mood
            </h2>
            <span className='md:grid md:grid-cols-4 md:gap-8'>
                {categoryCards.map((cat) =>
                    cat.hasProducts ? (
                        <Link key={cat.id} href={`/menu/${cat.id}`}>
                            <ProductCard name={cat.name} image={cat.fallbackImage} />
                        </Link>
                    ) : (
                        <ComingSoonCard key={cat.id} name={cat.name} image={cat.fallbackImage} />
                    )
                )}
            </span>
        </section>
    );
}