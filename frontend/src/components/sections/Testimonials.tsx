import React from "react";

const Testimonials: React.FC = () => {
  const testimonials = [
    { name: "Alice", text: "EasyServe cut our support time in half!" },
    { name: "Bob", text: "The AI is smarter than I expected. Super useful." },
    { name: "Charlie", text: "Integration was seamless and fast." },
  ];

  return (
    <section id="testimonials" className="py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <div key={i} className="p-6 border rounded-lg shadow-sm">
            <p className="italic">"{t.text}"</p>
            <p className="mt-4 font-semibold">- {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
