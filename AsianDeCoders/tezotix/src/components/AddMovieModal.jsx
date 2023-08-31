import React, { useState } from "react";
import { toast } from "react-toastify";
import HeadingUnderline from "./HeadingUnderline";

export default function AddMovieModal({ data, setOpenMovieModal }) {

    const [loading, setLoading] = useState(false);


    return (
        <div
            onClick={() => {
                setOpenMovieModal(false);
            }}
            className="absolute top-0 left-0 z-[100] w-screen h-screen flex justify-center items-start pt-[100px] bg-black/70 md:px-20"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col items-center p-50 pt-[20px] gap-[50px] bg-primaryBg border-[2px] border-primary rounded-20 lg:w-3/4"
            >
                {
                    loading
                        ? "Loading..."
                        : <>
                            <HeadingUnderline>
                                List a Movie
                            </HeadingUnderline>

                            <div className="flex flex-col gap-[30px] flex-wrap w-full max-h-[calc(70vh-150px)]">
                                <div className="flex flex-row gap-4 items-center w-1/2">
                                    <p className="font-poppins text-lg font-medium">Name:</p>
                                    <input
                                        type="text"
                                        className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
                                        placeholder="Eg. Oppenheimer"
                                    />
                                </div>
                                <div className="flex flex-row gap-4 items-center w-1/2">
                                    <p className="font-poppins text-lg font-medium">Description:</p>
                                    <input
                                        type="text"
                                        className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
                                        placeholder="Eg. During World War II, Lt. Gen. Le...."
                                    />
                                </div>
                                <div className="flex flex-row gap-4 items-center w-1/2">
                                    <p className="font-poppins text-lg font-medium">Screen No.:</p>
                                    <input
                                        type="number"
                                        className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
                                        placeholder="Eg. 5"
                                    />
                                </div>
                                <div className="flex flex-row gap-4 items-center w-1/2">
                                    <p className="font-poppins text-lg font-medium">Ticket price:</p>
                                    <input
                                        type="number"
                                        className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
                                        placeholder="Eg. 23 ꜩ"
                                    />
                                </div>
                                <div className="flex flex-row gap-4 items-center w-1/2">
                                    <p className="font-poppins text-lg font-medium">Starting date:</p>
                                    <input
                                        type="date"
                                        className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
                                    />
                                </div>
                                <div className="flex flex-row gap-4 items-center w-1/2">
                                    <p className="font-poppins text-lg font-medium">Total shows:</p>
                                    <input
                                        type="text"
                                        className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
                                        placeholder="Eg. 1"
                                    />
                                </div>
                                <div className="flex flex-row gap-4 items-center w-1/2">
                                    <p className="font-poppins text-lg font-medium">Time slots:</p>
                                    <input
                                        type="text"
                                        className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
                                        placeholder="Eg. Oppenheimer"
                                    />
                                </div>
                                <div className="flex flex-row gap-4 items-center w-1/2">
                                    <p className="font-poppins text-lg font-medium">Landscape poster:</p>
                                    <input
                                        type="text"
                                        className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
                                        placeholder="Eg. https://cdn.movi...."
                                    />
                                </div>
                            </div>

                        </>
                }
            </div>
        </div>
    );
}
