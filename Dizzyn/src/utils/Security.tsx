import crypto from "crypto"
import axios from "axios";

// Function to generate RSA key pair
export const generateKeyPair = () =>{
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


export const encryptMessage = (message, publicKey)=> {
  const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(message, 'utf-8'));
  return encrypted.toString('base64');
}

// Function to decrypt a message using a private key
export const decryptMessage = (encryptedMessage, privateKey)=> {
  const decrypted = crypto.privateDecrypt(privateKey, Buffer.from(encryptedMessage, 'base64'));
  return decrypted.toString('utf-8');
}



