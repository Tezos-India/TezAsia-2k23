import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../utils/AuthProvider';

import searchResults from "../data"

import ConnectBtn from '../components/ConnectBtn';
import HeadingUnderline from '../components/HeadingUnderline';
import MovieCard from '../components/MovieCard';

export default function Admin() {

    const { address, connected } = useContext(AuthContext);

    return (
        <div className='flex flex-col flex-1 px-28'>
            {
                connected
                    ? <div className="flex flex-col gap-[70px]">
                        <h2 className="text-4xl font-medium">Hey ({searchResults[0].name.length >= 20 ? searchResults[0].name.slice(0, 20) + "..." : searchResults[0].name}) 👋</h2>
                        <div>
                            <HeadingUnderline>Upcoming shows</HeadingUnderline>

                            <div className="flex mt-30 pb-4 gap-7 max-w-full overflow-x-auto scroll-hor">
                                {
                                    searchResults[0].activeMovies.map((item) => {
                                        return (<MovieCard data={item} />)
                                    })
                                }
                            </div>
                        </div>
                        <div>
                            <HeadingUnderline>Past shows</HeadingUnderline>

                            <div className="flex mt-30 pb-4 gap-7 max-w-full overflow-x-auto scroll-hor">
                                {
                                    searchResults[0].activeMovies.map((item) => {
                                        return (<MovieCard data={item} withoutBtn={true} withTotalPrice={true} />)
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    : <div className="flex-1 flex flex-col justify-center items-center gap-14">
                        <div className='flex flex-col justify-center items-center gap-3'>
                            <h2 className="text-5xl font-semibold">Oops!</h2>
                            <p className="text-lg font-medium text-center">Looks like you're not connected to your wallet!</p>
                        </div>
                        <ConnectBtn />
                    </div>
            }
        </div>
    )
}
