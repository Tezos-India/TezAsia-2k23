const crypto = require('crypto');

// Encryption function
function encryptMessage(message, encryptionKey) {
  const iv = crypto.randomBytes(16); // Initialization Vector
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
  
  let encrypted = cipher.update(message, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  
  return {
    iv: iv.toString('hex'),
    encryptedMessage: encrypted
  };
}

// Decryption function
function decryptMessage(encryptedData, encryptionKey) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, Buffer.from(encryptedData.iv, 'hex'));
  
  let decrypted = decipher.update(encryptedData.encryptedMessage, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  
  return decrypted;
}

// Message to encrypt
const originalMessage = 'Hello, this is a secret message!';

// Generate a random encryption key (256 bits)
const encryptionKey = crypto.randomBytes(32); // 256 bits = 32 bytes

// Encrypt the message
const encryptedData = encryptMessage(originalMessage, encryptionKey);

// Store the encryption key in local storage (for demonstration purposes)
localStorage.setItem('encryptionKey', encryptionKey.toString('hex'));


// Retrieve the encryption key from local storage
const storedEncryptionKey = localStorage.getItem('encryptionKey');

// Convert the stored key back to a buffer
const encryptionKeyForDecryption = Buffer.from(storedEncryptionKey, 'hex');

// Decrypt the encrypted message
const decryptedMessage = decryptMessage(encryptedData, encryptionKeyForDecryption);

console.log('Encrypted Data:', encryptedData);
console.log('Decrypted Message:', decryptedMessage);
