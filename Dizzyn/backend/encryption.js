const fs = require('fs');
const crypto = require('crypto');

// Message to encrypt
const originalMessage = 'Amit Singha';

// Generate a random encryption key (256 bits)
const encryptionKey = crypto.randomBytes(32); // 256 bits = 32 bytes

// Encrypt the message
const iv = crypto.randomBytes(16); // Initialization Vector
const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
let encrypted = cipher.update(originalMessage, 'utf-8', 'hex');
encrypted += cipher.final('hex');

// Store the encrypted message and the key in a file
const encryptedData = {
  iv: iv.toString('hex'),
  encryptedMessage: encrypted
};

fs.writeFileSync('encrypted_data.json', JSON.stringify(encryptedData, null, 2));
fs.writeFileSync('encryption_key.txt', encryptionKey.toString('hex'));

console.log('Message encrypted and key stored.');
