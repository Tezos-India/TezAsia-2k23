import React, { useState } from "react";
import { toast } from "react-toastify";
import HeadingUnderline from "./HeadingUnderline";
import Button from "./Button";


export default function RegisterTheaterModal({ data, setOpenRegisterTheaterModal }) {

    const [loading, setLoading] = useState(false);


    return (
        <div
            onClick={() => {
                setOpenRegisterTheaterModal(false);
            }}
            className="absolute top-0 left-0 z-[100] w-screen h-screen flex justify-center items-start pt-[15vh] md:pt-[30vh] bg-black/70 md:px-20"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col items-center p-50 pt-[20px] gap-[50px] bg-primaryBg border-[2px] border-primary rounded-20 w-full lg:w-3/4"
            >
                {
                    loading
                        ? "Loading..."
                        : <>
                            <HeadingUnderline>
                                List your theater
                            </HeadingUnderline>

                            <div className="flex flex-col gap-[30px] flex-wrap w-full md:w-3/4 max-h-[calc(70vh-150px)]">
                                <div className="flex flex-row gap-4 items-center w-full">
                                    <p className="font-poppins text-lg font-medium w-[8ch]">Name:</p>
                                    <input
                                        type="text"
                                        className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
                                        placeholder="Eg. PVR VEGA Bengaluru ...."
                                    />
                                </div>
                                <div className="flex flex-row gap-4 items-center w-full">
                                    <p className="font-poppins text-lg font-medium w-[8ch]">City:</p>
                                    <input
                                        type="text"
                                        className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
                                        placeholder="Eg. Bangalore"
                                    />
                                </div>
                                <div className="flex flex-row gap-4 items-center w-full">
                                    <p className="font-poppins text-lg font-medium w-[8ch]">Location:</p>
                                    <input
                                        type="text"
                                        className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
                                        placeholder="Eg. PVR Cinemas, Vega City ...."
                                    />
                                </div>
                                <Button
                                    weight={"800"}
                                >
                                    Register your Theatre →
                                </Button>
                            </div>

                        </>
                }
            </div>
        </div>
    );
}
