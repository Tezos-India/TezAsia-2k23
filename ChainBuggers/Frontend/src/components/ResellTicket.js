import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


export default function ResellTicket() {
    const navigate = useNavigate();

    const handleResale = ()=>{

        // navigate('/payment', {state:{seats, movie:movie._id, theatre:theatre._id, status:"first"}})
        navigate('/payment', {state:{status:"resale"}})
    }

    return (
        <div className="relative w-full h-40">
            <div className='flex bg-[#393d5e] rounded-lg h-40 w-3/4'>
                <div className='bg-green-200 w-2/5 rounded-lg'></div>
                <div className='flex w-4/5'>
                    <div className="relative text-5xs font-thin font-roboto text-gainsboro text-left [transform:_rotate(-90deg)] [transform-origin:0_0]">( Regular 2D)</div>
                    <div className='flex flex-col'>
                        <div className='font-medium font-montserrat font-3xl'>Grand Turismo</div>
                        <div className='font-base font-montserrat font-regular'>Monday, 16 December 2023</div>
                        <div className='flex justify-start items-center'>
                            <div className='text-[#9DA8BE] font-2xl'><FaLocationDot /></div>
                            <div className='text-[#9DA8BE] font-2xl font-roboto font-regualar'>Theatre Name</div>
                        </div>
                        <div className='left-0'>
                            <button class="px-6 py-3 rounded-md bg-orange font-montserrat font-medium font-2xl text-white" onClick={handleResale}>Resale</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
