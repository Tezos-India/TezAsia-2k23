const fs = require('fs');
const crypto = require('crypto');

// Load public and private keys from files
const publicKey = fs.readFileSync('public_key.pem', 'utf-8');
const privateKey = fs.readFileSync('private_key.pem', 'utf-8');

// Simulate a message to encrypt
const plaintextMessage = 'Hello, this is a secret message!';

// Encrypt the message using the public key
const encryptedMessage = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256',
  },
  Buffer.from(plaintextMessage)
);

console.log('Encrypted Message:', encryptedMessage.toString('base64'));

// Decrypt the message using the private key
const decryptedMessage = crypto.privateDecrypt(
  {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256',
  },
  encryptedMessage
);

console.log('Decrypted Message:', decryptedMessage.toString('utf-8'));
