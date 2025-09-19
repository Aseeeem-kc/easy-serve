import React from "react";
import Navbar from "../components/common/Navbar";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import Pricing from "../components/sections/Pricing";
import CTA from "../components/sections/CTA";
import FAQ from "../components/sections/FAQ";
import Footer from "../components/common/Footer";

const LandingLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
