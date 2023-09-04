# CrowdFunding DaAp
## Built By
Tarang Ahuja (tarangahuja78@gmail.com)

Sujata Gahlaut

Vanshika Chandan


## Presentation Link
https://github.com/Tezos-India/TezAsia-2k23/blob/main/ChainWizard/Crowd%20Funding%20App.mp4

(If above link not working)

https://www.canva.com/design/DAFnG10_tgw/qlNFbGp9nwfSeNOej-bg5g/edit?utm_content=DAFnG10_tgw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

## Getting Started with CrownFunding App

## DEPLOYED 
[Deployment link](https://crowd-funding-by-1t7aua7a1-stv-crowdfund.vercel.app/)

## Available Scripts

In the project directory, you can run:

### `npm install`
### `npm start`

## Smart Contract deployed at SmartPy

Contract Address : KT1Fyc9TtYHfUj7AuRbtMKU4hBghVHUxDrqz

RPC URL : https://ghostnet.smartpy.io

![image](https://github.com/Blockchain-BY-STV/CrowdFunding/assets/128304440/6494c5be-650c-4940-975c-fc3bed6902cc)


## INSPIRATION
Many students face financial challenges when it comes to paying for their education, textbooks, research projects, or study abroad programs. A crowdfunding platform allows students to create campaigns and seek financial support from a wider community, including family, friends, alumni, and even strangers who are passionate about education. This CrowdFunding app can help bridge the financial gap and enable students to pursue their educational goals.

## HOW WE BUILT IT
This application is built using React for the frontend, including components like Navbar and forms. It interacts with a crowdfunding smart contract deployed on the Tezos blockchain. The contract is implemented using SmartPy, a high-level smart contract language for Tezos. The frontend communicates with the contract using the Taquito library, which provides a JavaScript interface for interacting with Tezos. The application allows users to contribute funds, check the total fund raised, view contributors' information, and end the crowdfunding process.

## CHALLENGES WE RAN INTO
TransactionInvalidBeaconError: An error occurred when attempting to end the fund due to insufficient contract balance and a subtraction underflow. Difficulty handling contract balance: Ensuring that the contract had sufficient balance to cover the required transaction amount. Subtraction underflow: Handling situations where the withdrawal amount exceeded the contract balance to avoid negative results. Smart contract verification: Verifying conditions such as owner restrictions and goal achievement before allowing certain operations.

## ACCOMPLISHMENTS THAT WE'RE PROUD OF
This application allows users to contribute funds to a crowdfunding campaign deployed on the Tezos blockchain. It tracks the total funds raised, goal progress, and displays a list of contributors. Users can contribute, withdraw funds, and end the campaign if the goal is achieved. The challenging task of creating an engaging background was accomplished using the tParticles library, which provides interactive and dynamic particle animations. The application was deployed on Vercel, a platform for hosting and deploying web applications.

## WHAT WE LEARNT
We learnt to deploy smart contract using smartPy, use taquito, Beacon wallet, Tailwind CSS, built the frontend using React, sparticles and axios library

## What's next for Crowdfunding DAAp
We are planning on incorporating NFTs in this application so that the contributors have proof that they donated to this good cause. We are also going to enhance the front end of this application to incorporate different causes that a person can donate to. Along with this, show detailed information on where the donated money went to.

## Built With
- axios
- github
- javascript
- react
- smartpy
- sparticle
- tailwindcss
- taquito
- vercel


![image](https://github.com/Blockchain-BY-STV/CrowdFunding/assets/94349122/2c42755a-faaa-4a10-92b5-de79f3ffdb45)
Any contributor can log into the site and connect their wallet using BeaconWallet. Here in the screenshot, we have used temple wallet. 
![image](https://github.com/Blockchain-BY-STV/CrowdFunding/assets/128304440/64b94eab-7d06-4425-85a3-afb8763a1896)


After Wallet is connected, the user can enter the amount that they want to contribute, and press  on update amount button. They need to click on Contribute button to begin the transaction.

![image](https://github.com/Blockchain-BY-STV/CrowdFunding/assets/128304440/a6dd9028-35ca-4210-b4ea-d2d7b6a7c1ee)


After the transaction is finished , a successful transaction will display the above message.

Remarks:
Contract includes a withdraw transaction function which was not completed before time.
It also includes a goal achieved variable and end transaction functionality which would have stopped the crowdfunding after reaching a particular goal.   

