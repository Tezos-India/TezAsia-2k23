import React from "react";

export const Card = ({tittle,description}:any) => {
  return (
    <div className="text-center text-3xl font-['Averia_Serif_Libre'] font-bold text-white relative ml-4 rounded-3xl h-[255px] w-[255px] border pt-8">
      {tittle}
      <br />
      <div className="text-3xl font-sans font-semibold ">
        <br />
      </div>
      <div className="text-2xl font-sans font-semibold text-[#777777] px-[26px]">
        {description}
      </div>
    </div>
  );
};
