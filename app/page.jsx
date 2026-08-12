import Image from 'next/image';
import Hero from '../components/home/Hero';
import FeatureStrip from '../components/home/FeatureStrip';
import MadeFreshSection from '../components/home/MadeFreshSection';
import MenuPreview from '../components/home/MenuPreview';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <main className="bg-crumb-bg relative overflow-hidden">
      {/* <Header /> */}
      <Hero />
      <FeatureStrip />
      <MadeFreshSection />
      <MenuPreview />
      <Footer />
    </main>
  );
}