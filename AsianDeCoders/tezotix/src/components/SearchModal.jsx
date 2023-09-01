import React, { useState, useEffect } from "react";
import HeadingUnderline from "./HeadingUnderline";
import MovieCard from "./MovieCard";
import { fetchMoviesStorage } from "../utils/tzkt";

export default function SearchModal({ data, setOpenMovieModal }) {
	const [loading, setLoading] = useState(false);
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const storage = await fetchMoviesStorage();

			const cityIds = storage.cityIds;

			const movieDetails = storage.movieDetails;

			const theatreDetails = storage.theatreDetails;

			const cityDetails = storage.cityDetails;

			const Data = [];
			const data1 = [];
			const data2 = [];

			for (let i = 0; i < cityIds; i++) {
				const name = cityDetails[i].name;

				const theatreIds = storage.cityDetails[i].theatreIds;

				for (let i = 0; i < theatreIds; i++) {
					const theatreName = theatreDetails[i].name;
					const address = theatreDetails[i].address;
					const movieIds = theatreDetails[i].movieIds;

					for (let i = 0; i < movieIds; i++) {
						const movieName = movieDetails[i].name;
						const description = movieDetails[i].description;
						const posterLink = movieDetails[i].posterLink;
						const screenNumber = movieDetails[i].screenNumber;
						const ticketPrice = movieDetails[i].ticketPrice;
						const startingDate = movieDetails[i].startingDate;
						const timeSlot = movieDetails[i].timeSlot;

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

					const fetchedObject = {
						theatreName: theatreName,
						address: address,
						activeMovies: data2,
					};

					data1.push(fetchedObject);
				}

				const fetchedObject = {
					cityName: name,
					theatreDetails: data1,
				};

				Data.push(fetchedObject);
				setSearchResults(Data);
			}
		} catch (e) {
			throw e;
		}
	};

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
				{loading ? (
					"Loading..."
				) : (
					<>
						<HeadingUnderline>
							All movies in{" "}
							{data.theatreName.length > 20
								? data.theatreName.slice(0, 20) + "..."
								: data.theatreName}
						</HeadingUnderline>

						<div className="flex pb-4 gap-7 max-w-full overflow-x-auto scroll-hor">
							{data.activeMovies.map((item) => {
								return <MovieCard data={item} />;
							})}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
