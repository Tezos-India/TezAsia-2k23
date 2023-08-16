import React from 'react';

const FAQPage = () => {
  const faqData = [
    {
      question: 'What is Staking?',
      answer: 'Staking is when you lock crypto assets for a set period of time to help support the operation of a blockchain.',
    },
    {
      question: 'Will my money be safe if I stake?',
      answer: 'Yes, smart contract ensure that.',
    },
    {
      question: 'Can I play games without staking?',
      answer: 'Yes, we have different modes also.',
    },
    {
        question: "Where I can see my Nft's?",
        answer: 'They are vissible in profile dashboard.',
    },
    {
        question: "How do I stake?",
        answer: 'Create a Walltet and register your profile.',
    },
    
  ];

  return (
    <div className="container mx-auto pt-20 pb-20">
      <h2 className="text-black text-4xl text-center font-bold mb-20 underline underline-offset-2">Frequently Asked Questions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faqData.map((item, index) => (
          <div key={index} className="pb-8">
            <div className="font-semibold text-gray-300 text-2xl text-left">{item.question}</div>
            <div className="text-whit text-gray-400 text-xl  mt-2">{item.answer}</div>
          </div>
        ))}
      </div>
      <div className='text-center pt-12 text-xl  font-semibold cursor-pointer'>Can't find your question? Contact Us!</div>
    </div>
  );
};

export default FAQPage;
