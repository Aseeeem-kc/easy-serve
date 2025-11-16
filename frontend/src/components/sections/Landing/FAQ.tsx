import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does EasyServe work?",
      answer: "EasyServe uses multi-agent AI technology to handle customer queries automatically. Our intelligent system analyzes incoming requests, categorizes them, and routes them to specialized AI agents trained for specific types of queries. This ensures accurate, context-aware responses in real-time."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We follow enterprise-grade security protocols with end-to-end encryption for all data transmission and storage. We're compliant with GDPR, SOC 2, and other major security standards. Your data is stored in secure, encrypted databases with regular security audits."
    },
    {
      question: "Can I integrate with my existing tools?",
      answer: "Yes! We support seamless integrations with popular CRMs like Salesforce and HubSpot, communication platforms like Slack and Microsoft Teams, and many other business tools. Our API also allows for custom integrations to fit your unique workflow."
    },
    {
      question: "Do you offer customer support?",
      answer: "We provide 24/7 chat support for Pro and Enterprise users. Starter plan users have access to email support with response times under 24 hours. Enterprise customers also get a dedicated account manager for personalized assistance."
    },
    {
      question: "What's included in the free trial?",
      answer: "Our 14-day free trial gives you full access to all Pro plan features, including unlimited conversations, advanced analytics, priority support, and 10 AI agents. No credit card required to start, and you can cancel anytime."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades will apply at the start of your next billing cycle. You'll never lose access to your data, and we'll help you transition smoothly."
    },
    {
      question: "How accurate are the AI responses?",
      answer: "Our AI agents maintain an average accuracy rate of 94% across all industries. The system continuously learns from interactions and feedback, improving over time. For critical queries, you can set up human oversight to review responses before they're sent."
    },
    {
      question: "What happens if I exceed my plan limits?",
      answer: "We'll notify you when you're approaching your plan limits. You can choose to upgrade to a higher tier, or purchase additional conversation credits. We never cut off service abruptly - your customers will always receive support."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(156 163 175 / 0.1) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white mb-6 shadow-lg">
            <HelpCircle className="w-4 h-4 mr-2" /> 
            <span className="text-sm font-semibold">Got Questions?</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked
            <span className="block mt-2 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about EasyServe. Can't find an answer? Chat with our team.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white border-2 border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-lg text-gray-900 pr-8">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-6 h-6 text-gray-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl p-12 shadow-2xl">
          
          <h3 className="text-3xl font-bold text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-200 text-lg mb-6 max-w-2xl mx-auto">
            Our team is here to help. Get in touch and we'll respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
          href="https://calendar.app.google/9x5vBf1FhQpH4G6L9"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-gray-100 transition-all hover:scale-105"
        >
          Contact Support
        </a>

            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;