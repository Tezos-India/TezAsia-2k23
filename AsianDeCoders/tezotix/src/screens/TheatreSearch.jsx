import React, { useState, useEffect } from "react";

import Search from "../assets/Search.svg";
import LocationPin from "../assets/locationPin.svg";
import slideshowIcon from "../assets/slideshow.svg";

// import searchResults from "../data";
import SearchModal from "../components/SearchModal";

import { fetchMoviesStorage } from "../utils/tzkt";

export default function TheatreSearch() {
    // const [cities, setCities] = useState([]);
    const [current, setCurrent] = useState(0);
    const [openMovieModal, setOpenMovieModal] = useState(false);

    const [searchResults, setSearchResults] = useState([]);

    const fetchData = async () => {
        try {
            const storage = await fetchMoviesStorage();
            const cityIds = storage.cityIds;

            const movieDetails = storage.movieDetails;

            const theatreDetails = storage.theatreDetails;

            const cityDetails = storage.cityDetails;

            const compiledCityDetails = [];

            for (let i = 0; i < cityIds; i++) {
                const name = cityDetails[i].name;

                const theatreIds = storage.cityDetails[i].theatreIds;
                const compiledTheatreDetails = [];
                // compiling theatre details
                for (let i = 0; i < theatreIds.length; i++) {
                    const theatreName = theatreDetails[i].name;
                    const address = theatreDetails[i].address;

                    const movieIds = theatreDetails[i].movieIds;
                    const compiledMovieDetails = [];
                    // compiling movie details
                    for (let i = 0; i < movieIds.length; i++) {
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

                        compiledMovieDetails.push(fetchedObject);
                    }

                    const fetchedObject = {
                        theatreName: theatreName,
                        address: address,
                        activeMovies: compiledMovieDetails,
                    };

                    compiledTheatreDetails.push(fetchedObject);
                }

                const fetchedObject = {
                    cityName: name,
                    theatreDetails: compiledTheatreDetails,
                };
                compiledCityDetails.push(fetchedObject);

            }
            setSearchResults(compiledCityDetails);
            console.log(compiledCityDetails)
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <div className="w-1/2 mx-auto">
                <div className="flex1-1 flex gap-5">
                    <div className="w-full flex items-center px-20 py-15 gap-4 rounded-10 bg-blackToTrans border-primary hover:border-secondary">
                        <img src={Search} height="17px" width="17px" alt="Search" />
                        <input
                            type="text"
                            className="border-none outline-none font-poppins text-sm bg-transparent flex-1 "
                            placeholder={`Search for theaters in ${searchResults[current]?.cityName}`}
                        />
                    </div>
                    <select
                        onChange={(e) => {
                            setCurrent(e.target.value);
                        }}
                        className="px-15 py-10 rounded-10 outline-none bg-transparent bg-blackToTrans border-primary"
                    >
                        {searchResults &&
                            searchResults.length &&
                            searchResults.map((item, index) => {
                                return (
                                    <option value={index} className="bg-primaryBg">
                                        {item.cityName}
                                    </option>
                                );
                            })}
                    </select>
                </div>

                <p className="Poppins text-[15px] font-light text-white/40 mt-15">
                    Showing all theaters in {searchResults[current]?.cityName}:
                </p>

                <div className="mt-12 flex flex-col gap-5">
                    {searchResults[current]?.theatreDetails
                        &&
                        searchResults[current]?.theatreDetails.length
                        ? searchResults[current]?.theatreDetails.map((item, ind) => {
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
                        })
                        : <p className="Poppins text-center text-[20px] font-medium text-white/50 mt-10">No theatres found in {searchResults[current]?.cityName}!</p>
                    }
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
