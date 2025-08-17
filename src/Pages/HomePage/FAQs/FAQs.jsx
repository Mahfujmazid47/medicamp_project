import { useState } from "react";

const faqs = [
  {
    question: "What is MediCamp?",
    answer:
      "MediCamp is a Medical Camp Management System that helps organizers and participants manage, join, and track medical camps efficiently.",
  },
  {
    question: "How can I register for a camp?",
    answer:
      "Participants can easily register for available camps through the registration form in their dashboard after logging in.",
  },
  {
    question: "Is online payment available?",
    answer:
      "Yes, you can pay securely using our integrated payment system. We accept cards and mobile banking.",
  },
  {
    question: "Can organizers manage multiple camps?",
    answer:
      "Absolutely! Organizers can create, edit, and manage multiple camps directly from their organizer dashboard.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can contact us through the Contact Us page, or send us an email at support@medicamp.com anytime.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section data-aos='fade-up' className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary/70 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center  mb-10">
          Find answers to the most common questions about MediCamp.
        </p>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-primary/30 rounded-2xl shadow-sm hover:shadow-md transition duration-300"
            >
              <button
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-xl font-semibold">
                  {faq.question}
                </span>
                <span className="ml-2 text-primary/70">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4  animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
