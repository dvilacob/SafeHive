import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Comparison } from "@/components/Comparison";
import { Technology } from "@/components/Technology";
import { Configurator } from "@/components/Configurator";
import { Deployment } from "@/components/Deployment";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Comparison />
      <Technology />
      <Configurator />
      <Deployment />
      <Footer />
    </main>
  );
}
