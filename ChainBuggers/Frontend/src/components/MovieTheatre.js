import React from "react";
import TheatreDetails from "./TheatreDetails";

export default function MovieTheatre() {
  return (
    <div className="flex flex-col">
      <div className="absolute w-full top-[0rem] right-[0rem] left-[0rem] box-border h-[2.06rem] border-b-[0.7px] border-solid border-black">
        <div className="absolute h-[calc(100%_-_21px)] top-[0.63rem] bottom-[0.69rem] left-[47.64rem] flex flex-row items-start justify-start">
          <div className="flex flex-row py-[0rem] pr-[0.6rem] pl-[0rem] items-center justify-center">
            <div className="flex flex-row items-center justify-center gap-[0.5rem]">
              <div className="relative rounded bg-mediumseagreen-100 w-[0.5rem] h-[0.5rem]" />
              <div className="relative uppercase">Available</div>
            </div>
          </div>
          <div className="flex flex-row py-[0rem] pr-[0.57rem] pl-[0rem] items-center justify-center">
            <div className="flex flex-row items-center justify-center gap-[0.5rem]">
              <div className="relative rounded bg-darkorange w-[0.5rem] h-[0.5rem]" />
              <div className="relative uppercase">Fast Filling</div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10">
        <TheatreDetails />
      </div>
      <div className="py-10">
        <TheatreDetails />
      </div>
      <div className="py-10">
        <TheatreDetails />
      </div>
      <div className="py-10">
        <TheatreDetails />
      </div>
      <div className="py-10">
        <TheatreDetails />
      </div>
    </div>
  );
}
