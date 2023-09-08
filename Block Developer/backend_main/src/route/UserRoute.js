const express = require("express");
const router = express.Router();
const {
    login,
    register,
    postHessBought,
    postHessDestroyed,
    getAllUsers,
    search,
} = require("../controllers/userControll");
router.route("/users").get(getAllUsers);
router.route('/search').post(search);
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/hessBought").post(postHessBought);
router.route("/hessDestroyed").post(postHessDestroyed);
module.exports = router;