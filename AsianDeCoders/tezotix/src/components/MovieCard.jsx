import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { fetchMoviesStorage } from "../utils/tzkt";
import { tezos } from "../utils/tezos";

import addresses from "../config/config";

export default function MovieCard({
	data,
	withoutBtn,
	withDateTime,
	withTotalPrice,
}) {
	const [totalPriceEarned, setTotalPriceEarned] = useState(0);

	useEffect(() => {
		// const contractInstance = await tezos.wallet.at(addresses.movies);

		// const storage = await fetchMoviesStorage();

		// const cityIds = storage.cityIds;
		// const cityDetails = storage.cityDetails;
		// console.log(cityDetails[0].theatreIds);
		if (withTotalPrice) {
			let sum = 0;
			data.dates.forEach((item) => {
				console.log(item);
				item.shows.forEach((item2) => {
					sum += item2.booked.length * data.price;
				});
			});
			console.log(Math.floor(sum * 100) / 100);
			setTotalPriceEarned(Math.floor(sum * 100) / 100);
		}
	}, [data, withTotalPrice]);

	return (
		<Link to={`/movie/${data.id}`}>
			<div className="w-[320px] max-w-[320px] flex flex-col justify-center p-10 gap-3 border-primary bg-blackToTrans rounded-20 cursor-pointer">
				<img src={data.poster} className="rounded-10" />
				<div className="flex flex-row justify-between items-center pl-2 gap-1">
					<div className="flex flex-col justify-center pl-2 gap-1">
						<h2 className="Poppins w-full text-lg font-medium">{data.name}</h2>
						<p className="Poppins text-sm text-white/50 font-medium w-full">
							{data.price} ꜩ
						</p>
					</div>

					{withoutBtn ? null : (
						<Button weight={"700"} style={"!px-15 !py-10 h-max"}>
							View →
						</Button>
					)}
					{withDateTime ? (
						<p className="Poppins text-xs text-white/50 font-light">
							{data.dateTime}
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
