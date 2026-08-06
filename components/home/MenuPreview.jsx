import ProductCard from '../menu/ProductCard';
import ComingSoonCard from '../menu/ComingSoonCard';

export default function MenuPreview() {
  return (
    <section className="bg-crumb-bg pt-10 pb-14">
      <h2 className="font-hand text-[30px] text-crumb-primary text-center mb-8">
        Fresh flavors for every mood
      </h2>

      <ProductCard name="Cookies" image="/images/products/cookies-tray.svg" className="mt-220" />
      <ProductCard name="Brownies" image="/images/products/brownies-plate.svg" />
      <ComingSoonCard name="Cinnamon Rolls" image="/images/products/cinnamon-roll-plate.svg" />
      <ComingSoonCard name="Coffee" image="/images/products/coffee-cup.svg" />
    </section>
  );
}