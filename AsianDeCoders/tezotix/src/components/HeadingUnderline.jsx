import React from 'react'

export default function HeadingUnderline(props) {
    return (
        <div className="relative z-10 w-max">
            <h2 className="w-max text-white Poppins text-2xl font-semibold before:content-[''] before:w-full before:h-[7px] before:absolute before:left-0 before:top-[75%] before:-rotate-[1deg] before:bg-secondaryGradient before:-z-10">{props.children}</h2>
        </div>
    )
}