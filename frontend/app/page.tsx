import Hero from "@/components/landing/Hero";
import AppPreview from "@/components/landing/AppPreview";
import Stats from "@/components/landing/Stats";
import WhyInferix from "@/components/landing/WhyInferix";
import Features from "@/components/landing/Features";
import Models from "@/components/landing/Models";
import Keyboard from "@/components/landing/Keyboard";
import AISection from "@/components/landing/AISection";
import Privacy from "@/components/landing/Privacy";
import CTA from "@/components/landing/CTA";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <AppPreview />
      <Stats />
      <WhyInferix />
      <Features />
      <Models />
      <Keyboard />
      <AISection />
      <Privacy />
      <CTA />
      <Footer />
    </main>
  );
}
