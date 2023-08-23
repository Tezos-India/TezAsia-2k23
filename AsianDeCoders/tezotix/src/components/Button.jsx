import React from "react";

const Button = (props) => {
    return (
        <button
            onClick={props.onClick}
            className={`z-20 cursor-pointer flex items-center justify-center py-15 px-20 rounded-10 hover:scale-105 transition
            bg-primaryGradient 
            ${props.style}`}
        >
            <p className={`flex items-center justify-center font-primary font-${props.weight ? props.weight : "700"} text-[15px] leading-[105%] text-black`}>{props.children}</p>
        </button>
    )

}

export default Button;