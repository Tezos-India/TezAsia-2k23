import React, { useState } from 'react';

import Search from "../assets/Search.svg";
import LocationPin from "../assets/locationPin.svg"
import slideshowIcon from "../assets/slideshow.svg"

import searchResults from "../data"
import SearchModal from '../components/SearchModal';

export default function TheatreSearch() {

    const [cities, setCities] = useState(["Bangalore", "Delhi", "Mumbai", "Kolkata", "Chennai"])
    const [current, setCurrent] = useState(0)
    const [openMovieModal, setOpenMovieModal] = useState(false)

    return (
        <>
            <div className='w-1/2 mx-auto'>

                <div className="flex1-1 flex gap-5">
                    <div className='w-full flex items-center px-20 py-15 gap-4 rounded-10 bg-blackToTrans border-primary hover:border-secondary'>
                        <img src={Search} height="17px" width="17px" alt="Search" />
                        <input
                            type="text"
                            className="border-none outline-none font-poppins text-sm bg-transparent flex-1 "
                            placeholder={`Search for theaters in ${cities[current]}`}
                        />
                    </div>
                    <select onChange={(e) => { setCurrent(e.target.value) }} className='px-15 py-10 rounded-10 outline-none bg-transparent bg-blackToTrans border-primary'>
                        {
                            cities && cities.length && cities.map((item, index) => {
                                return <option value={index} className='bg-primaryBg'>{item}</option>
                            })
                        }
                    </select>
                </div>

                <p className='Poppins text-[15px] font-light text-white/40 mt-15'>Showing all theaters in {cities[current]}:</p>

                <div className="mt-12 flex flex-col gap-5">
                    {
                        searchResults.map((item, ind) => {
                            return (
                                <div
                                    key={ind}
                                    className="w-full px-30 py-15 flex flex-col gap-3 border-primary rounded-10 bg-blackToTrans cursor-pointer"
                                    onClick={() => setOpenMovieModal(item)}
                                >
                                    <h3 className="text-white Poppins text-xl font-semibold">{item.name}</h3>
                                    <div className="flex flex-row gap-5">
                                        <div className="flex flex-row items-center gap-3 w-full">
                                            <img className="w-6" src={LocationPin} />
                                            <p className="text-white/40 Poppins text-xs">{item.location}</p>
                                        </div>
                                        <div className="flex flex-row items-center gap-3">
                                            <img className="w-6" src={slideshowIcon} />
                                            <p className="text-white66 Poppins text-2xl font-semibold">{item.activeMovies.length}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {openMovieModal &&
                <SearchModal
                    data={openMovieModal}
                    setOpenMovieModal={setOpenMovieModal}
                />
            }
        </>
    )
}