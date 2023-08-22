const { generateKeyPair } = require('crypto');
const fs = require('fs');

// Calling generateKeyPair() method
// with its parameters
generateKeyPair('rsa', {
  modulusLength: 530,    // options
  publicExponent: 0x10101,
  publicKeyEncoding: {
    type: 'pkcs1',
    format: 'der'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'der',
    cipher: 'aes-192-cbc',
    passphrase: 'GeeksforGeeks is a CS-Portal!'
  }
}, (err, publicKey, privateKey) => { // Callback function
       if(!err)
       {
         // Prints new asymmetric key pair
         console.log("Public Key is : ", publicKey);
         fs.writeFileSync('public_key.txt', publicKey);
          fs.writeFileSync('private_key.txt', privateKey);

         console.log("Private Key is: ", privateKey);
       }
       else
       {
         // Prints error
         console.log("Errr is: ", err);
       }
         
  });