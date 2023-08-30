# AnswerNFT (Saksham Bisen)

**Track**: NFT and Collectibles
https://github.com/sb-saksham/TezAsia-2k23/tree/main/TezProj-02

Written in JsLIGO, React, Typescript, Material UI
for Tezos TezAsia Hackathon 2023

## Introduction

The "AnswerNFT" project leverages the uniqueness of NFTs and brings together NFTs and Interactive challenges. Developed on the Tezos blockchain, it lets users create and trade Questions as NFTs, that are not just collectible but also interactive.
The idea is to mint questions, riddles, mathematical problems, and puzzles as NFTs. To acquire these NFTs, buyers must solve the associated challenge correctly. Using TypeScript, React, and Material-UI, the user interface is designed to be intuitive and engaging for creators and buyers alike.
"AnswerNFT" aims to tap into NFT’s potential by combining NFT Economics with engaging content, providing an innovative platform for users.

## Demo
**Video Link:**
https://drive.google.com/file/d/1WnZk6VIMi57g2s5Ou8-cPFyJ9mXnJVWq/view?usp=sharing

## Working

Creators craft questions or puzzles and embed the answer hash into the NFT's metadata. Interested buyers can attempt to solve the challenge to purchase the NFT. If their answer matches the stored hash, they can buy the NFT using cryptocurrency.The "AnswerNFT" project adheres to the FA2 standard deployed on Tezos Ghostnet test network and utilizes the Ligo compiler version 0.72.0, with the protocol "Nairobi." The project's key functionalities have been developed using Taqueria, React (TypeScript), and Material UI. Taqueria facilitates the compilation, deployment, and generating of TypeScript interfaces, types, and aliases for React. The contract enables the minting, buying, and selling of NFTs and the withdrawal of funds for the Admin(who deployed the contract).

### Functions:

**mint**

- token_id (automatically inputted)
- question (The question)
- symbol (like "AnsNFT" or "Riddle")
- description(Hints, parameters, conditions, etc)
- answerType (e.g., text, number, boolean)
- answerLength (in characters or words)
- answer
- image (uploaded to Pinata IPFS)
  Minting an NFT requires a fee of 1 tez. The answer is securely hashed using SHA256, and the resulting bytes are stored in token metadata.
  **sell**
- price(in tez)
  Selling NFTs involves setting a price in Tez, and users can overwrite existing sell offers if needed.

**buy**

- answer
  Buying an NFT involves providing a hashed answer using SHA256, which is then matched with the answer hash stored in token metadata. If the hashes align, the ownership transfer is initiated, offering an innovative and engaging way to acquire NFTs.

**withdraw**

This function allows the owner/administrator to claim the accumulated minting fees present within the contract, ensuring efficient financial management.

## Economics

The token economics of the "AnswerNFT" project present a captivating model that blends rarity, intellectual prowess, and economic value. The concept revolves around the idea that rare and challenging questions have inherent value, making them desirable digital assets in the form of NFTs. By minting these NFTs, users are essentially packaging their intellectual creations in a unique and secure digital format. This format holds immense potential value, especially for individuals who can craft intricate puzzles, thought-provoking riddles, and challenging questions.

The platform's structure offers creators, including puzzle makers, riddlers, and experts, a remarkable opportunity to showcase their talents and skills to a global audience. Through their NFTs, they can monetize their ingenuity and creativity, turning their passion into a potential source of income. Moreover, the scarcity of truly original and perplexing questions enhances the value of these NFTs, as they become not just tokens but unique pieces of intellectual artistry.

Furthermore, the project's scope extends to the realm of academia and scientific inquiry. Esteemed researchers, scientists, and PhD holders can utilize this platform to create NFTs that encapsulate complex scientific problems, puzzles, and thought experiments. This not only enables them to share their knowledge with the world but also grants them the opportunity to generate value through their profound expertise. As a result, the platform bridges the gap between intellectual achievement and economic recognition, fostering a vibrant marketplace where unique questions become tokens of intellectual achievement, monetary value, and even historical significance.

## Future Aspects

In the future evolution of the "AnswerNFT" project, several innovative capabilities could be worked on to enhance the authenticity, quality, and reach of the platform:

- **Question Uniqueness with AI Integration:**
  A pivotal advancement lies in implementing cutting-edge AI algorithms to ensure that no question is repeated within the platform. By leveraging AI's analytical prowess, the system will be capable of identifying and filtering out not only identical questions but also those with similar intents. This intelligent curation will prevent redundancy and maintain the value of NFTs by upholding their rarity. Users will have the confidence that each question they encounter is a distinct intellectual creation, contributing to the platform's rich and diverse collection of NFTs.
- **Ensuring Quality through DAO and Reputation System:**
  To counteract the possibility of shell questions or subpar content designed purely for profit, the project envisions the establishment of a Decentralized Autonomous Organization (DAO). This DAO would be responsible for curating and maintaining the quality of questions on the platform. By introducing a reputation system, where buyers can flag skeptical questions and vote on their removal, the platform fosters a community-driven approach to maintaining the integrity and value of the NFTs. This mechanism promotes transparency and accountability while empowering the community to actively shape the platform's content.
- **Cross-Chain Compatibility and Integration:**
  The project's ambitious vision includes expanding beyond the Tezos network to achieve cross-chain compatibility. By integrating the platform with prominent blockchain networks like Ethereum and Solana, users will benefit from a broader ecosystem and increased accessibility. This cross-chain approach opens up new avenues for creators and buyers, enabling them to engage with NFTs across different blockchain ecosystems seamlessly. This expansion not only widens the project's reach but also enhances its relevance in the rapidly evolving blockchain landscape.

## References

https://ligolang.org/docs/intro/introduction/?lang=jsligo

https://react.dev

https://mui.com/material-ui/

https://taqueria.io

https://docs.pinata.cloud

https://marigold-dev.github.io/training-nft-2/
