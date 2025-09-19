import React from "react";

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-semibold mb-3 text-gray-800">How does EasyServe work?</h3>
            <p className="text-gray-600">
              EasyServe uses multi-agent AI to handle customer queries automatically.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-gray-800">Is my data secure?</h3>
            <p className="text-gray-600">
              Yes, we follow enterprise-grade security protocols and encryption.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-gray-800">Can I integrate with my tools?</h3>
            <p className="text-gray-600">
              We support integrations with CRMs, Slack, and other platforms.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-gray-800">Do you offer support?</h3>
            <p className="text-gray-600">
              Yes, 24/7 chat support is available for Pro and Enterprise users.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
