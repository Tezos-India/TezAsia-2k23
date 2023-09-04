const express = require("express");
const router = express.Router();

const {
   postNftMinted, postNftExchange, getAllNfts, getNft
} = require("../controllers/nftController");
router.route('/nft').post(getNft);
router.route('/nfts').get(getAllNfts);
router.route("/nftMinted").post(postNftMinted);
router.route('/nftTransfer').post(postNftExchange);

module.exports = router;