import React, { useState } from "react";

type FAQPageProps = {
  id: string;
};

const FAQPage: React.FC<FAQPageProps> = ({ id }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: "What is Staking?",
      answer:
        "Staking is when you lock crypto assets for a set period of time.",
    },
    {
      question: "Will my money be safe if I stake?",
      answer:
        "Staking through our platform is secure with smart contracts ensuring the safety of your assets.",
    },
    {
      question: "Can I play games without staking?",
      answer:
        "Absolutely! While staking enhances your gameplay, you can also play in different modes without staking.",
    },
    {
      question: "Where can I see my NFTs?",
      answer: "Your exclusive NFTs are visible in your profile dashboard.",
    },
    {
      question: "How do I stake?",
      answer:
        "To stake, you need to first create a wallet, then register your profile on our platform.",
    },
    {
      question: "What are the benefits of staking on your platform?",
      answer:
        "By staking on our platform, you get enhanced gameplay, potential rewards, and exclusive access to new features.",
    },
    {
      question: "Are there any fees associated with staking?",
      answer:
        "A nominal fee is charged for staking to maintain the platform and ensure optimal performance.",
    },
    {
      question: "Can I transfer my NFTs to another user?",
      answer:
        "Yes, our platform allows secure and seamless transfer of NFTs between users.",
    },
    {
      question: "What games can I play on the platform?",
      answer:
        "We offer a diverse range of games, from strategy to arcade. Explore our game section for more.",
    },
  ];

  return (
    <div id={id} className="container mx-auto py-20 bg-gray-900">
      <h2 className="text-white text-4xl text-center font-bold mb-10">
        Frequently Asked Questions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            onClick={() => setActiveIndex(index === activeIndex ? null : index)}
          >
            <div className="flex justify-between items-center">
              <div className="font-semibold text-white text-2xl">
                {item.question}
              </div>
              <div
                className={activeIndex === index ? "transform rotate-180" : ""}
              >
                <svg
                  className="w-6 h-6 text-white fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 16l-6-6 1.414-1.414L12 13.172l5.586-5.586L19 10z" />
                </svg>
              </div>
            </div>
            {activeIndex === index && (
              <div className="mt-4 text-gray-300 text-lg">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center pt-12 text-xl font-semibold text-gray-400 cursor-pointer hover:text-white">
        {`Can't find your question?`} <span className="underline">Contact Us!</span>
      </div>
    </div>
  );
};

export default FAQPage;
