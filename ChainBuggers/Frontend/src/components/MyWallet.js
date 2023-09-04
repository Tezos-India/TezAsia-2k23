import React from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-dapp";


export default function UserDetails(props) {
  const handleTicket = () => {
    props.setButton(1);
  };

    //     // Now you can use the 'web3' instance to interact with the Ethereum network
    //   } catch (error) {
  //   //     console.log(error);
  //   //   }
  //     try{
  //     const wallet = new TempleWallet("Flexpass");
  //     await wallet.connect("ghostnet");

  //     Tezos.setWalletProvider(wallet);

  //     const pkh = await wallet.getPKH();
  //     console.log(`Connected with address: ${pkh}`);
  //   } catch (error) {
  //     console.error("Error connecting wallet:", error);
  //   }
  // };

  const tezos = new TezosToolkit("https://ghostnet.smartpy.io");


  const wallet = new BeaconWallet({
    name: "FlexPass  Dapp",
    preferredNetwork: NetworkType.GHOSTNET,
})

   const connectWallet = async () => {
    await wallet.requestPermissions({ network: {type: NetworkType.GHOSTNET}});
  };

  const getAccount = async () => {
    const connectedWallet = await wallet.client.getActiveAccount();
    if (connectedWallet) {
        return connectedWallet.address;
    }
    else{
        return "";
    }
    tezos.setWalletProvider(wallet);
  };

    // const balance = await Tezos.tz.getBalance(handleConnectWallet.getPKH()); 

  // const balanceOfWallet = async () => {
  //   try {
  //     const balance = await Tezos.tz.getBalance(handleConnectWallet.wallet.getPKH());
  //     console.log(`Balance: ${balance}`);
  //   } catch (error) {
  //     console.error("Error fetching balance:", error);
  //   }
  // };

  return (
    <div className="mx-5 my-5 h-s">
      <div className="relative rounded-lg px-5 py-3 [background:linear-gradient(rgba(0,_0,_0,_0.14),_rgba(0,_0,_0,_0.14)),_linear-gradient(-38.77deg,_rgba(191,_191,_191,_0.06),_rgba(0,_0,_0,_0))] shadow-[-8px_4px_5px_rgba(0,_0,_0,_0.24)] [backdrop-filter:blur(53px)] w-full h-52 font-poppins">
        <div className='relative flex  items-center justify-between'>
          <b className="text-[1.75rem] text-white text-left">
            My Wallet
          </b>
          <button
            className="flex justify-center items-center relative h-75 w-200 rounded-full bg-[#6851FF]"
            onClick={() => {
              connectWallet()
            }}
          >
            <div className="absolute inset-0 bg-opacity-0 bg-white rounded-full border border-solid border-[#6851FF]"></div>
            <span className="text-base font-medium text-white z-10 px-8 py-3">
              +Add Wallet
            </span>
          </button>
        </div>
      </div>
      <div className="mt-10 rounded-lg bg-[#242333] py-10 px-20">
        <div className='h-20 text-white'>
            Wallet Activity
        </div>
      </div>
    </div>
  );
}
