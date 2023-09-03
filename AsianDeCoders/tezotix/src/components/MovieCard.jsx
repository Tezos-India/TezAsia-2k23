import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

import { fetchMoviesStorage } from "../utils/tzkt";

export default function MovieCard({
    data,
    withoutBtn,
    withDateTime,
    withTotalPrice,
}) {
    const [totalPriceEarned, setTotalPriceEarned] = useState(0);

    useEffect(() => {
        console.log(data);
        if (withTotalPrice) {
            (async () => {
                const storage = await fetchMoviesStorage();

                let seatCount = 0;
                Object.keys(storage.seatDetails).forEach(function (key) {
                    if (storage.seatDetails[key].movieId === data.id.toString()) {
                        seatCount += 1;
                    }
                });
                console.log(seatCount);
                setTotalPriceEarned(
                    Math.floor(seatCount * parseInt(data.ticketprice) * 100) / 100
                );
            })();
        }
    }, [data, withTotalPrice]);

    return (
        <Link to={`/movie/${data.id}`}>
            <div className="w-[320px] max-w-[320px] flex flex-col justify-center p-10 gap-3 border-primary bg-blackToTrans rounded-20 cursor-pointer">
                <img src={data.posterLink} className="rounded-10" />
                <div className="flex flex-row justify-between items-center pl-2 gap-1">
                    <div className="flex flex-col justify-center pl-2 gap-1">
                        <h2 className="Poppins w-full text-lg font-medium">
                            {data.movieName}
                        </h2>
                        <p className="Poppins text-sm text-white/50 font-medium w-full">
                            {data.ticketPrice} ꜩ
                        </p>
                    </div>

                    {withoutBtn ? null : (
                        <Button weight={"700"} style={"!px-15 !py-10 h-max"}>
                            View →
                        </Button>
                    )}
                    {withDateTime ? (
                        <p className="Poppins text-xs text-white/50 font-light">
                            {data.startingDate}
                        </p>
                    ) : null}
                    {withTotalPrice ? (
                        <p className="Poppins text-xs text-white/50">
                            Earned: <span className="text-white75">{totalPriceEarned} ꜩ</span>
                        </p>
                    ) : null}
                </div>
            </div>
        </Link>
    );
}
