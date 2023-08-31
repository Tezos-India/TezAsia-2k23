import clsx from "clsx";
import React from "react";
import { HiSparkles } from "react-icons/hi";

type Props = {
  title: string;
  description: string;
  selected: boolean;
  Icon:React.ReactNode
};

const NftTypeCard = ({Icon, title, description, selected }: Props) => {
  if (selected) {
    return (
      <div className="bg-gradient-to-tr h-full from-primary-600 hover:-translate-y-4 duration-300 ease-out hover:shadow-2xl via-primary-500 to-primary-600 backdrop-blur-lg shadow-xl cursor-pointer rounded-xl px-5 py-8 flex flex-col gap-4 justify-center items-center">
        <div className="bg-blue-700 text-white p-4 rounded-full">
          {Icon}
        </div>
        <h6 className="text-2xl font-bold text-white">{title}</h6>
        <p className="text-primary-100 text-sm text-center">{description}</p>
      </div>
    );
  }
  return (
    <div className="border border-slate-300 h-full hover:-translate-y-4 duration-300 ease-out cursor-pointer backdrop-blur-xl bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.32)] to-transparent bg-opacity-25 hover:shadow-xl hover:border-primary-500 rounded-xl gap-4 px-5 py-8 flex flex-col justify-center items-center">
      <div className="bg-slate-200 text-primary-500 p-4 rounded-full">
          {Icon}
      </div>
      <h6 className="text-2xl font-bold text-gray-900">{title}</h6>
      <p className="text-gray-500 text-center text-sm ">{description}</p>
    </div>
  );
};

export default NftTypeCard;
