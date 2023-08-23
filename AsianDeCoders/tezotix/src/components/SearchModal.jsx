import React, { useState } from "react";
import { toast } from "react-toastify";
import HeadingUnderline from "./HeadingUnderline";
import MovieCard from "./MovieCard";

export default function SearchModal({ data, setOpenMovieModal }) {

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
                                All movies in {data.name.length > 20 ? data.name.slice(0, 20) + "..." : data.name}
                            </HeadingUnderline>

                            <div className="flex justify-center gap-7">
                                {
                                    data.activeMovies.map((item) => {
                                        return (<MovieCard data={item} />)
                                    })
                                }
                            </div>
                        </>
                }
            </div>
        </div>
    );
}
