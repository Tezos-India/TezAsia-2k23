const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../mongo/models/userSchema");
const WalletTxn = require("../mongo/models/walletTxnSchema");

const router = new express.Router();

const userAuth = require("../middlewares/userAuth");

router.post("/signup", async (req, res) => {
  let existanceMail;
  let existancePhone;
  if (req.body.email) {
    existanceMail = await User.findOne({ email: req.body.email });
  }
  if (req.body.phone) {
    existancePhone = await User.findOne({ phone: req.body.phone });
  }

  if (existanceMail || existancePhone) {
    return res.send("Email or Phone already exists");
  }

  try {
    let pass;
    bcrypt.hash(req.body.password, 8, async function (err, hash) {
      pass = hash;
      // });
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: pass,
      });
      await user.generateAuthToken();
      // await user.save()
      const walletInit = {
        userId: user._id,
        balance: 0,
        amount: 0,
        txnType: "Initialisation",
      };

      const init = new WalletTxn(walletInit);
      await init.save();
      user.balance.push(init);
      await user.save();
      res.send({ user });
    });

    // console.log("user", user)
  } catch (e) {
    console.log(e);
    if ((e.code = 11000)) {
      return res.status(400).send("User already registered");
    }
    res.status(500).send(e);
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const phone = req.body.phone;

  const user = req.body.email
    ? await User.findOne({ email })
    : await User.findOne({ phone });
  console.log(user);
  if (!user) {
    res.status(404).send("Wrong credentials");
  } else {
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log("check", isMatch);
    if (isMatch) {
      await user.generateAuthToken();
      await user.save();
      console.log(user);
      res.send({ user });
    } else {
      res.status(404).send("Wrong password");
    }
  }
});

router.post("/addAddress/:id", userAuth, async(req,res)=>{
  const user = await req.user
  user.walletAdd = req.params.id
  await user.save()
  res.send(user)
})

router.get("/getBalance", userAuth, async (req, res) => {
  try {
    const user = await req.user.populate("balance");
    const balance = user.balance[user.balance.length - 1].balance;
    // console.log("bal", balance)
    res.status(200).send(balance.toString());
  } catch (error) {
    res.send(error);
  }
});

router.get("/test", userAuth, async (req, res) => {
  res.send(`hiii ${req.user.name}`);
});

module.exports = router;
