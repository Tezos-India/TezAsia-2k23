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
                                All movies in {data.theatreName.length > 20 ? data.theatreName.slice(0, 20) + "..." : data.theatreName}
                            </HeadingUnderline>

                            <div className="flex pb-4 gap-7 max-w-full overflow-x-auto scroll-hor">
                                {
                                    data.activeMovies.map((item, ind) => {
                                        return (<MovieCard data={{ ...item, id: ind }} />)
                                    })
                                }
                            </div>
                        </>
                }
            </div>
        </div>
    );
}
