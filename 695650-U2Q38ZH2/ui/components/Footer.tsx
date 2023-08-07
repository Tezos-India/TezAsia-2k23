import Image from "next/image";
import React from "react";

export const Footer = () => {
  return (
    <div className="bg-black flex flex-col pt-px gap-6 h-64 shrink-0 items-center">
      <div className="border-solid border-white self-stretch mb-10 h-px shrink-0 border-t border-b-0 border-x-0" />
      <div className="flex flex-row mb-1 gap-20 w-1/2 items-center">
        <div className="text-2xl font-['Averia_Serif_Libre'] text-[#777777] mr-2 w-16 shrink-0">
          Home
        </div>
        <div className="whitespace-nowrap text-2xl font-['Averia_Serif_Libre'] text-[#777777] w-[180px] shrink-0">
          Term of services
        </div>
        <div className="whitespace-nowrap text-2xl font-['Averia_Serif_Libre'] text-[#777777] mr-4 w-[116px] shrink-0">
          Contact us
        </div>
        <div className="text-2xl font-['Averia_Serif_Libre'] text-[#777777] w-12 shrink-0">
          FAQ
        </div>
      </div>
      <Image
        src="https://file.rendit.io/n/aK53xcPsdbAxc3UbBRzf.svg"
        className="min-h-0 min-w-0"
        alt={""}
      />
      <div className="whitespace-nowrap text-xs font-['Averia_Serif_Libre'] font-bold text-[#777777] mb-5 w-56">
        C 2023 EtherStrike, All right reserved.
      </div>
      <div className="border-solid border-white self-stretch h-px shrink-0 border-t border-b-0 border-x-0" />
    </div>
  );
};
