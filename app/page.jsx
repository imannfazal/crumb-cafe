import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import FeatureStrip from '../components/home/FeatureStrip';
import MadeFreshSection from '../components/home/MadeFreshSection';
import MenuPreview from '../components/home/MenuPreview';

export default function Home() {
  return (
    <main className="bg-crumb-bg">
      {/* <Header /> */}
      <Hero />
      <FeatureStrip />
      <MadeFreshSection />
      <MenuPreview />
      <Footer />
    </main>
  );
}