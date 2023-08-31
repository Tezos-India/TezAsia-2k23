# TezAsia-2k23

![tezosindia1](https://github.com/TauqeerAhmad5201/TezAsia-2k23/assets/68806440/735f95af-4a62-4095-bdbd-c9fe4f4c57b1)

## Team Name  : Block Developer


## What problem you are trying to solve  : 

it is one stop for all chess lovers and web3 enthusiasts. It is a combination of decentralized gaming, NFT marketplaces, and the classic and one of the oldest game "Chess". It gives anyone a platform to not only get interested in chess but also blockchain and Web3.

1. **In-Game Currency (HT Token)** 💸
   - Polyess introduces an in-game currency called the HT token.
   - Users can acquire HT tokens, either through gameplay or by purchasing them, and even exchange them for Matic.

2. **NFT Marketplace** 📈📉
   - Polyess boasts a robust NFT marketplace that hosts 35 exquisite NFTs of legendary chess players.
   - This marketplace is accessible through both the mobile app and web platform.

3. **Visual NFT Battle** ⚔️🗡
   - The NFTs on Polyess aren't just collectibles; they serve as avatars in thrilling NFT staking games.
   - These NFT battles offer personalized gaming experiences as you strategize with your chosen NFT as the king.

4. **Diverse Game Modes** ♟♟
   - Polyess caters to all types of chess enthusiasts with three distinct game modes:
     - Free-to-Play: Enjoy casual chess games with friends and fellow players.
     - Token Betting: Add stakes to your games by betting with Hess tokens.
     - NFT Staking: Participate in exclusive NFT battles, wagering your NFTs and competing against friends.

5. **Leaderboard** 🪧🎯
   - The leaderboard adds a competitive edge to the platform, promoting engagement and improvement.
   - As you play more games and hone your skills, your rank on the leaderboard reflects your progress.

6. **User Profiles** 👨🏼‍⚕️🧑🏽‍🎓
   - Each user has a personalized profile that showcases their gaming statistics.
   - You can view your wins, losses, NFT collection, and the number of Hess Tokens in your account, all under your unique username.

7. **Video Chat** 📹🕹
   - Enhance your gaming experience with real-time video chat while playing chess.
   - Connect with your opponent, adding a social dimension to your games.

8. **Stunning User Experience and Graphics** 🌟
   - Polyess prioritizes an exceptional user experience with user-friendly interfaces and eye-catching graphics.
   - The Android app offers seamless gaming on the go.

Tech Stack used while building the project * 

Certainly, here's a concise list of the key technologies used in Polyess for your README:

**Technologies Used:**

- **Tezos**: Used for creating smart contracts on the Ethereum blockchain to manage in-game assets and NFTs.

- **IPFS (InterPlanetary File System)**: Utilized for decentralized storage and distribution of NFT data and game content.

- **React**: The primary library for building the interactive and responsive web interface of Polyess.

- **Flutter**: Employed for developing the Android app, ensuring a consistent user experience across platforms.

- **Web3**: Enabling decentralized gaming and NFT ownership through integration with blockchain and cryptocurrency technologies.

- **Blockchain**: The underlying technology powering secure and transparent transactions, NFT ownership, and the HT token.

- **ERC-1155**: A multi-token standard used to manage the NFT marketplace, allowing for the creation and exchange of various NFTs.

- **Polygon**: Integrated to enhance platform scalability and cost-effectiveness through layer-2 scaling for Ethereum.

- **Full-Stack Web Development**: Comprehensive development approach covering both front-end (React) and back-end (Solidity) for a seamless user experience.
- 
## Demo Video Link:
 * <a href="https://www.canva.com/design/DAFtGElfoDo/35xtWWO86FUvhRhpamU4pQ/watch?utm_content=DAFtGElfoDo&utm_campaign=share_your_design&utm_medium=link&utm_source=shareyourdesignpanel">Video link</a>

 ## PPT Link:
 * <a href="https://www.canva.com/design/DAFtAqQBeoo/3DjXImN4X-JaROHlCnOhFQ/view?utm_content=DAFtAqQBeoo&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink">PPT link</a>
 
## Project Demo Photos,

![3](https://github.com/ProgrammingPirates/TezAsia-2k23/assets/78801686/0fb85a5a-37f1-43ec-a9c5-df56dd84a7fc)

![2](https://github.com/ProgrammingPirates/TezAsia-2k23/assets/78801686/470253bd-88a8-474c-8462-d22f2241ce4a)

![3](https://github.com/ProgrammingPirates/TezAsia-2k23/assets/78801686/fb0118a5-7808-4e76-a08f-a780bc2eb960)


![4](https://github.com/ProgrammingPirates/TezAsia-2k23/assets/78801686/49dcc9bb-c8af-49f3-90dc-692175180c18)



 
## Your Deployed Smart Contract's Link * ( write NA if no contract is deployed)

- INFURA_KEY = '254ab7d222334c87bf12345678910027'
- CONTRACT_ADDRESS = '0x66dy6492j5F212B81A1723336bDaf235b6932ha1'
- BASE_URI='https://ipfs.io/ipfs/xyz'
- ALCHMEY_API='https://eth-rinkeby.alchemyapi.io/v2/xyz'

## Github repository link  [Github](https://github.com/ProgrammingPirates/Block_Developer)


## Your Team members Info.

- Dharmendra



## Installation


1. Run the development console.
    ```javascript
    truffle develop
    ```

2. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```

3. In the `client` directory, we run the React app. Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // in another terminal (i.e. not in the truffle develop prompt)
    cd client
    npm run start
    ```

4. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
    ```javascript
    // inside the development console.
    test

    // outside the development console..
    truffle test
    ```

5. Jest is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors.
    ```javascript
    // ensure you are inside the client directory when running this
    npm run test
    ```

6. To build the application for production, use the build script. A production build will be in the `client/build` folder.
    ```javascript
    // ensure you are inside the client directory when running this
    npm run build
    ```

