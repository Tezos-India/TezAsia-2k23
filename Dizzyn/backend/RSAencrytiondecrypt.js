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

// Function to encrypt a message using a public key
function encryptMessage(message, publicKey) {
  const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(message, 'utf-8'));
  return encrypted.toString('base64');
}

// Function to decrypt a message using a private key
function decryptMessage(encryptedMessage, privateKey) {
  const decrypted = crypto.privateDecrypt(privateKey, Buffer.from(encryptedMessage, 'base64'));
  return decrypted.toString('utf-8');
}

// Generate a new key pair
const keys = generateKeyPair();

// Message to encrypt
const originalMessage = 'Hello, this is a secret message!';

// Encrypt the message using the public key
const encryptedMessage = encryptMessage(originalMessage, keys.publicKey);

console.log('Encrypted Message:', encryptedMessage);

// Decrypt the encrypted message using the private key
const decryptedMessage = decryptMessage(encryptedMessage, keys.privateKey);

console.log('Decrypted Message:', decryptedMessage);
