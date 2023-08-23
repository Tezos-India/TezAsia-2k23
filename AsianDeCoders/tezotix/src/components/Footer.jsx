import React from 'react';
import { Link } from 'react-router-dom';

import Logo from "../assets/Logo.svg";
import LogoGlow from "../assets/LogoGlow.svg";
import LogoText from "../assets/LogoText.svg";

export default function Footer() {
    return (
        <div className="mx-[100px] flex flex-row items-center justify-between p-0 gap-[10px] mt-[50px] box-border pt-[20px] border-t-2 border-t-white10">
            <Link to="/">
                <div className="flex flex-row items-end justify-center p-0 gap-[12px]">
                    <div className="relative flex items-center justify-center">
                        <img draggable={false} src={Logo} height="35px" alt="TezoTix" />
                        <img draggable={false} src={LogoGlow} className="absolute h-[120px] w-[120px] max-w-[120px]" alt="TezoTix" />
                    </div>
                    <img draggable={false} src={LogoText} alt="TezoTix" />
                </div>
            </Link>

            <p className="SpaceGrotesk font-light text-sm tracking-wider text-center text-white50">Built by <a className='underline font-semibold' href='https://twitter.com/atharvvarshney7' target="_blank">Atharv</a> & <a className='underline font-semibold' href='https://twitter.com/ankit7241' target="_blank">Ankit</a>. All rights reserved.</p>

            <div className="flex flex-row items-start p-0 gap-[30px]">
                {/* <img src={Twitter.src} width={Twitter.width} height={Twitter.height} className="hover:color-blue-500" />
                <img src={Linkedin.src} width={Linkedin.width} height={Linkedin.height} className="hover:color-blue-500" />
                <img src={Instagram.src} width={Instagram.width} height={Instagram.height} className="hover:color-blue-500" />
                <img src={Facebook.src} width={Facebook.width} height={Facebook.height} className="hover:color-blue-500" /> */}
            </div>
        </div>
    )
}
