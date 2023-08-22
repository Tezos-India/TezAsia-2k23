const fs = require('fs');
const crypto = require('crypto');

// Function to generate RSA key pair
function generateKeyPair() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    }
  });

  return { privateKey, publicKey };
}

// Function to create a new user with keys
function createUser() {
  const user = {
    username: `user_${Date.now()}`,
    keys: generateKeyPair()
  };
  return user;
}

// Create a new user and log their keys
const newUser = createUser();
console.log('New User:', newUser);
console.log('Private Key:', newUser.keys.privateKey);
console.log('Public Key:', newUser.keys.publicKey);
