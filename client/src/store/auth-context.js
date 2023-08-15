import React, { useState, useEffect, useReducer } from "react"
import { useWeb3React} from '@web3-react/core';
import axios from 'axios';

const AuthContext = React.createContext({
    registered: false,
    loading:true,
    loginData: {},
    registerHandler: () => {}
})

const authInitialState = {
    registered: false,
    loading:true,
    loginData: {},
    registerHandler: () => {}
}

const authReducer = (state, action) => {
    // const registerResult = state.registered
    if(action.type === 'CREATE_USER') {
        console.log("dispatch created");
        state.registered=true
        window. location. reload()
    }
    console.log(state);
    return state;
}

export const AuthContextProvider = (props) => {
    const context = useWeb3React()
    const { account, error } = context
    const [UserData, setUserData] = useState({})
    const [isRegistered, setIsRegistered] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [authState, dispatchAuthAction] = useReducer(
        authReducer, authInitialState
    )
    const [contextState, setContextState] = useState(false)


    const registerStatehandler = () => {
        dispatchAuthAction({ type: 'CREATE_USER' })
    }

    var data = JSON.stringify({
        "address": "0x7ffd8A206c64759C54A90F3584e50b3A22b674Da"
    });
    var config = {
        method: 'post',
        url: 'http://polyess-listner.herokuapp.com/login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    };
    
    useEffect(() => {
    const fetchData = async () => {
        var data = JSON.stringify({
            "address": account
        });
        var config = {
            method: 'post',
            url: 'http://polyess-listner.herokuapp.com/login',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };
        try{
            const response=await axios(config);
            const result=await response.data;
            setIsRegistered(result.user.username!=="")
            setUserData(result)
            setIsLoading(false)
            console.log(result)
        }catch(e){
            console.log(e);
        }
    }
        
    fetchData();
}, [account, isRegistered]);

    return (
        <AuthContext.Provider
        value={{
            registered:isRegistered,
            loading:isLoading,
            loginData: UserData,
            registerHandler: registerStatehandler,
            contextState,
            setContextState
        }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext