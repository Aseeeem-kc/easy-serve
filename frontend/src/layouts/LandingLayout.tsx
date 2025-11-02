import React from "react";
import Navbar from "../components/common/Navbar";
import Hero from "../components/sections/Landing/Hero";
import Features from "../components/sections/Landing/Features";
import Pricing from "../components/sections/Landing/Pricing";
import CTA from "../components/sections/Landing/CTA";
import FAQ from "../components/sections/Landing/FAQ";
import Testimonials from "../components/sections/Landing/Testimonials";
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
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
