"use client";

import { useState } from "react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is GIM MART?",
      answer:
        "GIM MART is a digital marketplace where users can buy and manage their game collections easily and securely.",
    },
    {
      question: "How do I buy a game?",
      answer:
        "Simply log in to your account, browse the store, choose a game you like, and proceed with checkout using our supported payment methods.",
    },
    {
      question: "Is my payment safe?",
      answer:
        "Yes. We use secure payment gateways powered by Midtrans, ensuring all transactions are encrypted and protected.",
    },
    {
      question: "Can I refund a game?",
      answer:
        "Refunds are available under certain conditions. Please contact our support team with your order details for assistance.",
    },
    {
      question: "Where can I view my purchased games?",
      answer:
        "All purchased games are stored in your personal Library page, accessible after logging in.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 md:px-20 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Here you can find answers to the most common questions about GIM MART.
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
                <h2 className="font-semibold text-lg text-indigo-600">{faq.question}</h2>

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
