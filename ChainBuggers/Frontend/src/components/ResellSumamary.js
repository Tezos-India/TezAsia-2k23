import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'

export default function ResellSumamary() {
    return (
        <div className='w-full my-10 mx-16'>
            <div className='flex flex-col justify-start'>
                <div className='text-poppins mb-8 text-21xl font-bold text-white'>Resell Sumamary :</div>
                <div className='flex justify-between items-center'>
                    <div className="relative w-72 h-[27rem] flex flex-col items-start justify-start text-left text-[0.75rem] text-gray-100 font-caption-1-regular">
                        <div className="self-stretch flex-1 rounded-2xl bg-gray-200 [backdrop-filter:blur(64px)] flex flex-col p-[1rem] items-center justify-start gap-[1.5rem] border-[1px] border-solid border-gray-100">
                            <img className="self-stretch relative rounded-xl max-w-full overflow-hidden h-[15rem] shrink-0" alt="" src="{/*put image here*/}" />
                            <div className="self-stretch flex flex-col items-start justify-start gap-[0.75rem]">
                                <div className="self-stretch flex flex-col items-start justify-start">
                                    <div className="relative leading-[1rem]">Movie</div>
                                    <div className="self-stretch relative text-[1rem] leading-[1.5rem] font-semibold text-white flex items-center overflow-hidden text-ellipsis whitespace-nowrap h-[1.5rem] shrink-0">Spider Man</div>
                                </div>
                                <div className="self-stretch rounded-xl bg-lightsteelblue flex flex-row py-[0.5rem] px-[0.75rem] items-start justify-between">
                                    <div className="flex flex-col items-start justify-start gap-[0.13rem]">
                                        <div className="relative leading-[1rem]">Price</div>
                                        <div className="relative text-[1rem] leading-[1.5rem] font-semibold text-white">250/-</div>
                                        <div className="flex flex-row items-center justify-start">
                                            <div className="relative leading-[1rem]">original</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start justify-start gap-[0.13rem]">
                                        <div className="relative leading-[1rem]">Best offer</div>
                                        <div className="relative text-[1rem] leading-[1.5rem] font-semibold text-white">300/-</div>
                                        <div className="flex flex-row items-center justify-start gap-[0.25rem]">
                                            <img className="relative w-[0.88rem] h-[0.88rem] overflow-hidden shrink-0" alt="" src="icon/clock.svg" />
                                            <div className="relative leading-[1rem]">4hrs left</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-3/4 ml-10 my-2'>
                        <div className='flex flex-col items-start'>
                            <div className='flex font-roboto font-medium mb-6'>
                                <div className='text-[#9DA8BE] font-21xl'><FaLocationDot /></div>
                                <div className='text-[#9DA8BE] ml-2 font-5xl'>Theatre Name</div>
                                <div className='text-[#414A63] ml-2 font-5xl'>Show Typ</div>
                            </div>
                            <div className='w-3/4 mx-7'>
                                <div className='flex justify-between items-center font-poppins font-medium text-3xl text-white'>
                                    <div className='flex flex-col justify-between items-start'>
                                        <div className='mb-2'>Seat No.:</div>
                                        <div className='mb-2'>Listed Price :</div>
                                        <div className='mb-2'>Theater Royalty :</div>
                                        <div className='mb-2'>Platform Fee :</div>
                                    </div>
                                    <div className='flex flex-col justify-between items-end'>
                                        <div className='mb-2'>C-14</div>
                                        <div className='mb-2'>750</div>
                                        <div className='mb-2'>147</div>
                                        <div className='mb-2'>125</div>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <hr className="border-1.5 bg-gray-300 h-px my-2" />
                                    <div className='flex justify-between items-center font-poppins font-medium text-4xl text-white'>
                                        <div>Profit</div>
                                        <div className='flex justify-between items-center'>
                                            <div className='font-poppins font-base text-3xl text-[#1ea83c]'>(40%)</div>
                                            <div>1222</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex px-52 py-6 items-center justify-center w-3/4">
                                <div className=" rounded-xl [background:linear-gradient(90.57deg,#628eff,#8740cd_53.13%,#580475)] w-full py-2 mb-2 ">
                                    <div className=" py-1 text-white text-center text-5xl font-semibold cursor-pointer">
                                        Resell
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
