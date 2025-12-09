"use client";

import { useState } from "react";

export default function FAQDevPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I upload my game to GIM MART?",
      answer:
        "Go to the Developer Panel and open the Upload Game page. Fill out all required fields including title, description, category, price, and upload the game files or links, then submit.",
    },
    {
      question: "How do I edit or update my game?",
      answer:
        "You can edit your game details from the Your Game page inside the Dev Panel. Select a game and choose the Edit option.",
    },
    {
      question: "How do I see the sales statistics of my game?",
      answer:
        "The Statistik page on the Dev Panel shows game performance such as total purchases, revenue, and user engagement charts.",
    },
    {
      question: "Can I set promo prices for my game?",
      answer:
        "Yes. Go to the Promo section to create, manage, or delete promo discounts for your uploaded games.",
    },
    {
      question: "How does the revenue sharing system work?",
      answer:
        "Developers receive a fixed percentage of each sale. Revenue is calculated automatically and accessible via the Statistik section.",
    },
    {
      question: "How do I withdraw my earnings?",
      answer:
        "Withdrawal options will be available soon. Meanwhile, revenue is tracked inside your Developer Balance page.",
    },
    {
      question: "Can I remove a game I've uploaded?",
      answer:
        "Yes, but once a game has been purchased by users, removal requires admin approval for policy reasons.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 md:px-20 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">
          Developer FAQ
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Find answers to common questions about uploading, managing, and selling games on GIM MART.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow border transition-all p-6 cursor-pointer ${
                openIndex === index
                  ? "border-indigo-400 shadow-md"
                  : "border-gray-100 hover:border-indigo-300"
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg text-indigo-600">
                  {faq.question}
                </h2>

                <span className="text-gray-500 text-xl select-none">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40 mt-3" : "max-h-0"
                }`}
              >
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
