import React, { useState, useEffect } from "react";

import Search from "../assets/Search.svg";
import LocationPin from "../assets/locationPin.svg";
import slideshowIcon from "../assets/slideshow.svg";

import SearchModal from "../components/SearchModal";

import { fetchMoviesStorage } from "../utils/tzkt";

export default function TheatreSearch() {
	const [cities, setCities] = useState([
		"Bangalore",
		"Delhi",
		"Mumbai",
		"Kolkata",
		"Chennai",
	]);
	const [searchResults, setSearchResults] = useState([
		"Bangalore",
		"Delhi",
		"Mumbai",
		"Kolkata",
		"Chennai",
	]);
	const [current, setCurrent] = useState(0);
	const [openMovieModal, setOpenMovieModal] = useState(false);
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const storage = await fetchMoviesStorage();

			const cityID = storage.cityIds;

			const movieDetails = storage.movieDetails;

			const theatreDetails = storage.theatreDetails;

			const cityDetails = storage.cityDetails;

			const movieID = storage.movieID;

			const theatreID = storage.theatreID;

			const Data = [];

			const data3 = [];
			console.log("Hello");

			for (let i = 0; i < cityID; i++) {
				const data1 = [];
				const name = cityDetails[i].name;

				const theatreIds = storage.cityDetails[i].theatreIds;
				console.log(theatreIds.length);

				for (let x = 0; x < theatreID; x++) {
					const data2 = [];
					for (let j = 0; j < theatreIds.length; j++) {
						if (theatreIds[j] == x) {
							console.log(name, x);
							const theatreName = theatreDetails[x].name;
							const address = theatreDetails[x].address;
							const movieIds = theatreDetails[x].movieIds;

							console.log(name, theatreName, movieIds);

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
										const uniqueId = k;

										const fetchedObject = {
											movieName: movieName,
											description: description,
											posterLink: posterLink,
											screenNumber: screenNumber,
											ticketPrice: ticketPrice,
											startingDate: startingDate, //text
											timeSlot: timeSlot, //text
											uniqueId: uniqueId,
										};

										data2.push(fetchedObject);
									}
								}
							}

							const fetchedObject = {
								theatreName: theatreName,
								address: address,
								activeMovies: data2,
							};

							data1.push(fetchedObject);
						}
					}
				}

				const fetchedObject = {
					cityName: name,
					theatreDetails: data1,
				};

				Data.push(fetchedObject);
				setSearchResults(Data);
				console.log(Data[0].theatreDetails);
				data3.push(name);
				setCities(data3);
			}
		} catch (e) {
			throw e;
		}
	};

	return (
		<>
			<div className="w-1/2 mx-auto">
				<div className="flex1-1 flex gap-5">
					<div className="w-full flex items-center px-20 py-15 gap-4 rounded-10 bg-blackToTrans border-primary hover:border-secondary">
						<img src={Search} height="17px" width="17px" alt="Search" />
						<input
							type="text"
							className="border-none outline-none font-poppins text-sm bg-transparent flex-1 "
							placeholder={`Search for theaters in ${cities[current]}`}
						/>
					</div>
					<select
						onChange={(e) => {
							setCurrent(e.target.value);
						}}
						className="px-15 py-10 rounded-10 outline-none bg-transparent bg-blackToTrans border-primary"
					>
						{cities &&
							cities.length &&
							cities.map((item, index) => {
								return (
									<option value={index} className="bg-primaryBg">
										{item}
									</option>
								);
							})}
					</select>
				</div>

				<p className="Poppins text-[15px] font-light text-white/40 mt-15">
					Showing all theaters in {cities[current]}:
				</p>

				<div className="mt-12 flex flex-col gap-5">
					{searchResults[current].theatreDetails &&
						searchResults[current].theatreDetails.length &&
						searchResults[current].theatreDetails.map((item, ind) => {
							return (
								<div
									key={ind}
									className="w-full px-30 py-15 flex flex-col gap-3 border-primary rounded-10 bg-blackToTrans cursor-pointer"
									onClick={() => setOpenMovieModal(item)}
								>
									<h3 className="text-white Poppins text-xl font-semibold">
										{item.theatreName}
									</h3>
									<div className="flex flex-row gap-5">
										<div className="flex flex-row items-center gap-3 w-full">
											<img className="w-6" src={LocationPin} />
											<p className="text-white/40 Poppins text-xs">
												{item.address}
											</p>
										</div>
										<div className="flex flex-row items-center gap-3">
											<img className="w-6" src={slideshowIcon} />
											<p className="text-white66 Poppins text-2xl font-semibold">
												{item.activeMovies.length}
											</p>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>

			{openMovieModal && (
				<SearchModal
					data={openMovieModal}
					setOpenMovieModal={setOpenMovieModal}
				/>
			)}
		</>
	);
}
