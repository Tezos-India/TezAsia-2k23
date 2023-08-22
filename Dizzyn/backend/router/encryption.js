const crypto = require('crypto');

const encryptionKey = crypto.randomBytes(32); // 256 bits = 32 bytes

module.exports = encryptionKey.toString('hex');