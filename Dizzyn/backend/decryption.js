const fs = require('fs');
const crypto = require('crypto');

// Read the encryption key from the file
const encryptionKey = fs.readFileSync('encryption_key.txt', 'utf-8');

// Read the encrypted data from the file
const encryptedData = JSON.parse(fs.readFileSync('encrypted_data.json', 'utf-8'));

console.log(encryptedData)
// Decrypt the message
const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'hex'), Buffer.from(encryptedData.iv, 'hex'));
let decrypted = decipher.update(encryptedData.encryptedMessage, 'hex', 'utf-8');
decrypted += decipher.final('utf-8');

console.log('Decrypted Message:', decrypted);
