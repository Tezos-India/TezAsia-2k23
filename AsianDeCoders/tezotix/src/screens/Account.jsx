import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../utils/AuthProvider';

import poster from "../assets/oppenheimer.png"

import ConnectBtn from '../components/ConnectBtn';
import HeadingUnderline from '../components/HeadingUnderline';
import MovieCard from '../components/MovieCard';

export default function Account() {

    const { address } = useContext(AuthContext);

    const data = [
        {
            poster: poster,
            name: "Oppenheimer",
            dateTime: "26 Aug 2023, 11:00",
            theatre: "PVR VEGA Bengaluru",
            screenNo: "5",
            seats: ["A1", "A2", "A3"],
            price: 0.6,
            address: address
        },
        {
            poster: poster,
            name: "Oppenheimer",
            dateTime: "26 Aug 2023, 11:00",
            theatre: "PVR VEGA Bengaluru",
            screenNo: "5",
            seats: ["A1", "A2", "A3"],
            price: 0.6,
            address: address
        },
        {
            poster: poster,
            name: "Oppenheimer",
            dateTime: "26 Aug 2023, 11:00",
            theatre: "PVR VEGA Bengaluru",
            screenNo: "5",
            seats: ["A1", "A2", "A3"],
            price: 0.6,
            address: address
        },
    ]


    return (
        <div className='flex flex-col flex-1 px-28'>
            {
                address
                    ? <div className="flex flex-col gap-[70px]">
                        <h2 className="text-4xl font-medium">Hey ({address.slice(0, 4) + "..." + address.slice(-4)}) 👋</h2>
                        <div>
                            <HeadingUnderline>Upcoming shows</HeadingUnderline>

                            <div className="flex mt-30 pb-4 gap-7 max-w-full overflow-x-auto scroll-hor">
                                {
                                    data.map((item) => {
                                        return (<MovieCard data={item} withoutBtn={true} withDateTime={true} />)
                                    })
                                }
                            </div>
                        </div>
                        <div>
                            <HeadingUnderline>Past shows</HeadingUnderline>

                            <div className="flex mt-30 pb-4 gap-7 max-w-full overflow-x-auto scroll-hor">
                                {
                                    data.map((item) => {
                                        return (<MovieCard data={item} withoutBtn={true} withDateTime={true} />)
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