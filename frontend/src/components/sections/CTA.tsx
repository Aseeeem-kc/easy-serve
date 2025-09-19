import React from "react";
import Button from "../common/Button";

const CTA: React.FC = () => {
  return (
    <section id="contact" className="text-center py-16 bg-gray-100 text-gray-900">
      <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
      <p className="mb-6 text-gray-600">
        Join hundreds of businesses automating their support today.
      </p>
      <Button variant="primary">Contact Us</Button>
    </section>
  );
};

export default CTA;
