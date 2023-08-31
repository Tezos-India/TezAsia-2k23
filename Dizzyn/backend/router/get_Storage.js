const axios = require("axios")
const RSA = require("./RSA")
async function storage(){
    const res = await axios.get(
        // "https://api.ghostnet.tzkt.io/v1/contracts/KT1J6DYrKbMomK6zs9uYqD6Cn92s8uRy5NCM/storage" // updateDiagnosis Problem
         "https://api.ghostnet.tzkt.io/v1/contracts/KT1KKknhpn1iiBqB315okxm7iiscPtpRWgwy/storage"
    )
    return res.data;
};

async function getAESkey(shaAadhar, RSAprivateKey){
    const store = await storage();
    const rsa = JSON.parse(store.public_keys[shaAadhar]).RSAencryptedcipherKey
    const key = RSA.decryptMessage(rsa, RSAprivateKey)
    // console.log(AES_KEY)
    return {key, rsa}
}

module.exports = {storage, getAESkey};