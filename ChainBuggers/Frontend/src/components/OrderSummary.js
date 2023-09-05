import React, { useState } from "react";
import bg from '../assets/order-bg.png'
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-dapp";
// import { wallet } from "./MyWallet";


export default function OrderSummary(props) {
  // const [seatType, setSeatType] = useState({
  //   budget:0,
  //   elite:0
  // });
  const tezos = new TezosToolkit("https://ghostnet.smartpy.io");


  const seats = props.seats;
  const convenience = seats.length * 49;
  const seatType = {
    budget: 0,
    elite: 0,
  };



  const wallet = new BeaconWallet({
    name: "FlexPass  Dapp",
    preferredNetwork: NetworkType.GHOSTNET,
})

  tezos.setProvider({ config: { streamerPollingIntervalMilliseconds: 15000 } });

  // const sub = Tezos.stream.subscribeOperation(filter)

  seats.forEach((seat) => {
    console.log("abcd", seat.slice(0, 1));
    const row = seat.slice(0, 1);
    if (row === "K" || row === "L") {
      // setSeatType(seatType.elite+1)
      seatType.elite += 1;
    } else {
      // setSeatType(seatType.budget+1)
      seatType.budget += 1;
    }
  });

  // Define the contract address (KT1 address)
  const contractAddress = "KT1S2DUhxuvKwL1w8q51tBAb7kVbdVkF423r";
  tezos.setWalletProvider(wallet);
  // Function to buy a ticket
  const buyTicketOperation = async () => {
    try {
      // Load the contract instance
      const contract = await tezos.wallet.at(contractAddress);
  
      // Call the smart contract method to buy a ticket
      const op = await contract.methods.buy_ticket().send({
        amount: 1,
        mutez: false,
      });
  
      console.log("Waiting for confirmation...");
      await op.confirmation(1);
  
      console.log("Ticket bought successfully!");
    } catch (err) {
      console.error("Error buying ticket:", err);
    }
  };
  
  const seatPrice = seatType.elite * 350 + seatType.budget * 250;
  const taxes = ((seatPrice + convenience) * 0.15).toFixed(2);
  const total = Number(seatPrice) + Number(convenience) + Number(taxes);
  console.log(seatType, seatPrice);

  return (
    <div className="rounded-xl flex justify-center">
      <img className="object-cover" src={bg} alt="" />
      <div className="absolute items-center justify-center z-10">
        <div className="flex flex-col justify-between py-16">
          <div className="flex flex-col justify-between h-full font-poppins text-white">
            <div className="text-4xl items-center font-semibold">
              ORDER SUMMARY
            </div>
            <hr className="border-1 bg-gray-300 h-px my-4" />
            <div className="flex justify-between items-center">
              <div className="text-2xl font-medium">SELECTED SEATS :</div>
              <div className="text-2xl font-base flex items-center">
                <div className="text-base text-dimgray-200">
                  ({seats.length})
                </div>
                <div className="ml-1">
                  (
                  {seats.map((seat, index) => {
                    if (index < seats.length - 1) {
                      return `${seat}, `;
                    } else {
                      return `${seat}`;
                    }
                  })}
                  )
                </div>
              </div>
            </div>
            <hr className="border-1 bg-gray-300 h-px my-4" />
            <div className="flex flex-col justify-between flex-1">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-medium">SUBTOTAL :</div>
                  <div className="text-2xl font-base flex items-center">
                    <div className="text-base text-dimgray-200">
                      ({seatType.budget > 0 ? `${seatType.budget}*250` : ""}
                      {seatType.budget === 0 || seatType.elite === 0
                        ? " "
                        : " +  "}
                      {seatType.elite > 0 ? `${seatType.elite}*350` : ""})
                    </div>
                    <div className="ml-1">{seatPrice}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-medium">CONVENIENCE FEE :</div>
                  <div className="text-2xl font-base flex items-center">
                    <div className="text-base text-dimgray-200">
                      (49*{props.seats.length})
                    </div>
                    <div className="ml-1">{convenience}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-medium">TAXES :</div>
                  <div className="text-2xl font-base flex items-center">
                    <div className="text-base text-dimgray-200">(15%)</div>
                    <div className="ml-1">{taxes}</div>
                  </div>
                </div>
              </div>
              <hr className="border-1 bg-gray-300 h-px my-2" />
              <div className="flex font-base text-2xl justify-between">
                <div className="font-medium">ORDER TOTAL :</div>
                <div className="font-base">{total}</div>
              </div>

              <hr className="border-1 bg-gray-300 h-px my-4" />
              <div className="flex items-center justify-center w-1/2 m-auto">
                <div
                  className=" rounded-xl [background:linear-gradient(90.57deg,#628eff,#8740cd_53.13%,#580475)] w-full py-2 mb-2 ">
                  <div className="py-1 text-center text-5xl font-semibold cursor-pointer">
                  <button onClick={buyTicketOperation}>Place Order</button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
