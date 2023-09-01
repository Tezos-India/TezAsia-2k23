import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../utils/AuthProvider";
import { Link } from "react-router-dom";

import ConnectBtn from "../components/ConnectBtn";
import Button from "../components/Button";
import HeadingUnderline from "../components/HeadingUnderline";
import MovieCard from "../components/MovieCard";
import AddMovieModal from "../components/AddMovieModal";
import RegisterTheaterModal from "../components/RegisterTheaterModal";

import { fetchMoviesStorage } from "../utils/tzkt";
// import searchResults from "../data";

export default function Admin() {
	const { address } = useContext(AuthContext);

	const [theatreId, setTheatreId] = useState(null);
	const [theatreDetails, setTheatreDetails] = useState([]);
	const [activeMovies, setActiveMovies] = useState([]);

	const [openAddMovieModal, setOpenAddMovieModal] = useState(false);
	const [openRegisterTheaterModal, setOpenRegisterTheaterModal] =
		useState(false);

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
				theatreId ? (
					theatreDetails ? (
						<div className="flex flex-col gap-[70px]">
							<div className="flex gap-10 items-center">
								<h2 className="text-4xl font-medium">
									Hey (
									{theatreDetails.name.length >= 20
										? theatreDetails.name.slice(0, 20) + "..."
										: theatreDetails.name}
									) 👋
								</h2>
								<div className="flex gap-3 items-center">
									<div
										className="flex gap-3 px-4 h-[45px] justify-between items-center bg-blackToTrans border-primary rounded-20 hover:bg-white/5 transition cursor-pointer"
										onClick={() => setOpenAddMovieModal(true)}
									>
										<p className="text-4xl text-center">+</p>
										<p className="text-sm text-center font-semibold">
											List a Movie
										</p>
									</div>
								</div>
							</div>

							<div>
								<HeadingUnderline>Upcoming shows</HeadingUnderline>

								<div className="flex mt-30 pb-4 gap-7 max-w-full overflow-x-auto scroll-hor">
									{activeMovies.map((item) => {
										return <MovieCard data={item} />;
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
												withTotalPrice={true}
											/>
										);
									})}
								</div>
							</div>
						</div>
					) : (
						<div className="flex-1 flex flex-col justify-center items-center gap-14">
							<div className="flex flex-col justify-center items-center gap-3">
								<h2 className="text-5xl font-semibold">No Theater found!</h2>
								<p className="text-lg text-center">
									If you're looking to book tickets, navigate to{" "}
									<Link className="underline" to="/search">
										search page
									</Link>
									.
								</p>
							</div>
							<Button
								weight={"700"}
								onClick={() => setOpenRegisterTheaterModal(true)}
							>
								Register your Theatre →
							</Button>
						</div>
					)
				) : (
					<div className="flex-1 flex flex-col justify-center items-center gap-14">
						<div className="flex flex-col justify-center items-center gap-3">
							<h2 className="text-5xl font-semibold">Oops!</h2>
							<p className="text-lg font-medium text-center">
								Looks like you don't have a registered theatre with us!
							</p>
						</div>
						<Button onClick={() => setOpenRegisterTheaterModal(true)}>
							Add theatre
						</Button>
					</div>
				)
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

			{openAddMovieModal && (
				<AddMovieModal
					data={openAddMovieModal}
					setOpenMovieModal={setOpenAddMovieModal}
					theatre={theatreId}
				/>
			)}
			{openRegisterTheaterModal && (
				<RegisterTheaterModal
					data={openRegisterTheaterModal}
					setOpenRegisterTheaterModal={setOpenRegisterTheaterModal}
				/>
			)}
		</div>
	);
}
