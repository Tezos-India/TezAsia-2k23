import React, { useState } from "react";
import check from "../assets/check-mark.png";
import signup from "../assets/signup-bg.svg";
import axios from "axios";

export default function SignUpPage(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== conPassword) {
      console.log("Check password");
    }
    else {
      axios({
        method: "post",
        url: "https://flexpass-back.onrender.com/user/signup",
        // url: "http://127.0.0.1:8000/user/signup",
        data: {
          name: name,
          email: email,
          phone: phone,
          password: password.toString(),
        },
      })
        .then(function (response) {
          localStorage.setItem("jwt_token", JSON.stringify({token:response.data.user.token, time:new Date().getTime()}));
          props.setUserData(response.data.user)
          console.log(response);
          props.setSignup(!props.checkSignup);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <div className="w-full h-screen flex">
      <span
        className="absolute z-10 text-white top-10 left-10 text-[34px] cursor-pointer"
        onClick={() => {
          props.setSignup(!props.checkSignup);
        }}
      >
        &lt;--
      </span>
      <div className=" w-full relative h-screen ">
        <div>
          <img className=" w-full h-screen object-cover" src={signup} alt="" />
        </div>
      </div>
      <div className=" w-3/5 absolute right-0 z-10 h-screen  ml-auto text-left text-base bg-[#5952ac] text-white font-noto-sans px-36 py-10 rounded-l-[90px]">
        <div className="flex flex-col items-start justify-start">
          <div className="relative font-medium">
            Just some details to get you in.!
          </div>
          <div className="relative text-[2.25rem] mb-5 font-semibold">
            Signup
          </div>
          <input
            className="rounded-xl text-white text-[20px] mb-6 box-border w-full py-3 px-5 border-2 border-solid border-white bg-transparent placeholder-white focus:outline-none"
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            className="rounded-xl text-white text-[20px] mb-6 box-border w-full py-3 px-5 border-2 border-solid border-white bg-transparent placeholder-white focus:outline-none"
            type="text"
            placeholder="Phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <input
            className="rounded-xl text-white text-[20px] mb-6 box-border w-full py-3 px-5 border-2 border-solid border-white bg-transparent placeholder-white focus:outline-none"
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="rounded-xl text-white text-[20px] mb-6 box-border w-full py-3 px-5 border-2 border-solid border-white bg-transparent placeholder-white focus:outline-none"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            className="rounded-xl text-white text-[20px] mb-6 box-border w-full py-3 px-5 border-2 border-solid border-white bg-transparent placeholder-white focus:outline-none"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConPassword(e.target.value);
            }}
          />
          <div className="flex space-x-1 items-center mb-6">
            <img src={check} />
            <div>Remember Me</div>
          </div>
          <div className=" rounded-xl [background:linear-gradient(90.57deg,#628eff,#8740cd_53.13%,#580475)] w-full py-2 mb-2">
            <div
              className=" py-1 text-center text-5xl font-semibold cursor-pointer"
              onClick={handleSubmit}
            >
              Sign Up
            </div>
          </div>
          <div
            className="mt-6 text-3xl font-sans font-medium text-center mx-auto cursor-pointer"
            onClick={() => {
              props.setLogin(!props.checkLogin);
              props.setSignup(!props.checkSignup);
            }}
          >
            Already Registered? Login
          </div>
          <div className="flex mx-auto">
            <div className="mt-6 text-3xl mr-5  font-sans font-medium text-center">
              Terms & Conditions
            </div>
            <div className="mt-6 text-3xl mr-5 font-sans font-medium text-center">
              Support
            </div>
            <div className="mt-6 text-3xl mr-5 font-sans font-medium text-center">
              Customer Care
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
