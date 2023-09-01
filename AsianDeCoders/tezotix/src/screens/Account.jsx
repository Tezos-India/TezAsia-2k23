import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/AuthProvider";

import ConnectBtn from "../components/ConnectBtn";
import HeadingUnderline from "../components/HeadingUnderline";
import MovieCard from "../components/MovieCard";

import { fetchMoviesStorage } from "../utils/tzkt";

export default function Account() {
	const { address } = useContext(AuthContext);

	const [data, setData] = useState([]);

	// const data = [
	// 	{ img: "bafkreiexppcr3tlbrvf4kezv75qyqm4b6nb5igf7lk2yypifcimocgyj2q" },
	// 	{ img: "bafkreiexppcr3tlbrvf4kezv75qyqm4b6nb5igf7lk2yypifcimocgyj2q" },
	// 	{ img: "bafkreiexppcr3tlbrvf4kezv75qyqm4b6nb5igf7lk2yypifcimocgyj2q" },
	// ];

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const storage = await fetchMoviesStorage();

			const data2 = [];

			const ticketUrls = storage.ticketOwner[address];

			console.log(ticketUrls);

			for (let i = 0; i < ticketUrls.length; i++) {
				const fetchedObject = {
					img: ticketUrls[i],
				};

				data2.push(fetchedObject);
			}

			setData(data2);
			console.log(data2);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="flex flex-col flex-1 px-28">
			{address ? (
				<div className="flex flex-col gap-[70px]">
					<h2 className="text-4xl font-medium">
						Hey ({address.slice(0, 4) + "..." + address.slice(-4)}) 👋
					</h2>
					<div>
						<HeadingUnderline>Your Tickets</HeadingUnderline>

						<div className="flex mt-30 pb-4 gap-7 max-w-full overflow-x-auto scroll-hor">
							{data.map((item) => {
								return (
									<Link
										to={"https://ipfs.io/ipfs/" + item.img}
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											src={"https://ipfs.io/ipfs/" + item.img}
											className="w-[200px]"
										/>
									</Link>
								);
							})}
						</div>
					</div>
				</div>
			) : (
				<div className="flex-1 flex flex-col justify-center items-center gap-14">
					<div className="flex flex-col justify-center items-center gap-3">
						<h2 className="text-5xl font-semibold">Oops!</h2>
						<p className="text-lg font-medium text-center">
							Looks like you're not connected to your wallet!
						</p>
					</div>
					<ConnectBtn />
				</div>
			)}
		</div>
	);
}
