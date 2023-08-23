import React from 'react';
import '../static/css/navbar.css'
import LoginButton from './LoginButton';
import Register from './Register';
import {Flex, Spacer} from '@chakra-ui/react';

function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg">
            <Flex>
            <a style={{textDecorationStyle:"solid", fontWeight:"bold", paddingLeft:"5px", fontSize:"40px"}} className="navbar-brand" href="/">NFT Creators&apos; Paradise</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Spacer/>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {/* <ul className="navbar-nav mx-auto"> */}
                    {/* <li className="nav-item mr-auto"> */}
                        {/* <Register/> */}
                    {/* </li> */}
                {/* </ul> */}
                {/* <ul className="navbar-nav"> */}
                    {/* <li className="nav-item"> */}
                        <LoginButton/>
                    {/* </li> */}
                {/* </ul> */}
            </div>
            </Flex>
        </nav>
    );
}

export default Navbar;