import React from "react";

export const Card = ({title, description}: any) => {
  return (
    <div className="bg-purple-900 p-6 rounded-3xl shadow-lg w-72 h-auto text-center transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-serif font-bold text-white mb-4">{title}</h2>
      <p className="text-xl font-sans font-medium text-purple-300">{description}</p>
    </div>
  );
};


