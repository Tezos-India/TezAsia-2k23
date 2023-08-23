import React from 'react'
import { Link } from 'react-router-dom';
import Button from './Button';


export default function MovieCard({ data }) {
    return (
        <Link to={`/movie/${data.id}`}>
            <div className="flex flex-col justify-center p-10 gap-3 border-primary bg-blackToTrans rounded-20 cursor-pointer">
                <img src={data.poster} className="rounded-10" />
                <div className='flex flex-row justify-between items-center pl-2 gap-1'>
                    <div className='flex flex-col justify-center pl-2 gap-1'>
                        <h2 className="Poppins w-full text-lg font-medium">{data.name}</h2>
                        <p className="Poppins text-sm text-white/50 font-medium w-full">{data.price} ꜩ</p>
                    </div>
                    <Button weight={"700"} style={"!px-15 !py-10 h-max"}>
                        View →
                    </Button>
                </div>
            </div>
        </Link >
    )
}