import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../utils/AuthProvider";

import poster from "../assets/oppenheimer.png";

import ConnectBtn from "../components/ConnectBtn";
import HeadingUnderline from "../components/HeadingUnderline";
import MovieCard from "../components/MovieCard";

import { fetchMoviesStorage } from "../utils/tzkt";

export default function Account() {
	const { address } = useContext(AuthContext);

	const [theatreId, setTheatreId] = useState(null);
	const [theatreDetails, setTheatreDetails] = useState([]);
	const [activeMovies, setActiveMovies] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const storage = await fetchMoviesStorage();

			const theatreId = storage.theatreOwner[address];
			setTheatreId(theatreId);

			const theatreDetail = storage.theatreDetails[theatreId];

			const movieIds = storage.theatreDetails[theatreId];

			const movieID = storage.movieID;

			const movieDetails = storage.movieDetails;

			setTheatreDetails(theatreDetail);

			const data2 = [];

			for (let k = 0; k < movieID; k++) {
				for (let l = 0; l < movieIds.length; l++) {
					if (movieIds[l] == k) {
						const movieName = movieDetails[k].name;
						const description = movieDetails[k].description;
						const posterLink = movieDetails[k].posterLink;
						const screenNumber = movieDetails[k].screenNumber;
						const ticketPrice = movieDetails[k].ticketPrice;
						const startingDate = movieDetails[k].startingDate;
						const timeSlot = movieDetails[k].timeSlot;

						const fetchedObject = {
							movieName: movieName,
							description: description,
							posterLink: posterLink,
							screenNumber: screenNumber,
							ticketPrice: ticketPrice,
							startingDate: startingDate, //text
							timeSlot: timeSlot, //text
						};

						data2.push(fetchedObject);
					}
				}
			}

			setActiveMovies(data2);
		} catch (e) {
			throw e;
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
						<HeadingUnderline>Upcoming shows</HeadingUnderline>

						<div className="flex mt-30 pb-4 gap-7 max-w-full overflow-x-auto scroll-hor">
							{activeMovies.map((item) => {
								return (
									<MovieCard
										data={item}
										withoutBtn={true}
										withDateTime={true}
									/>
								);
							})}
						</div>
					</div>
					<div>
						<HeadingUnderline>Past shows</HeadingUnderline>

						<div className="flex mt-30 pb-4 gap-7 max-w-full overflow-x-auto scroll-hor">
							{activeMovies.map((item) => {
								return (
									<MovieCard
										data={item}
										withoutBtn={true}
										withDateTime={true}
									/>
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
