// Modify connectToTezosWallet function to include error logging
async function connectToTezosWallet() {
  try {
    // ... existing code ...
    // Request user to select a Tezos wallet and authorize connection
    const permissions = await BeaconSdk.requestPermissions({
      network: {
        type: 'mainnet', // You can use 'delphinet' for testnet
      },
    });

    // Check if the user granted the necessary permissions
    if (permissions.address.length === 0) {
      throw new Error('Tezos wallet connection rejected.');
    }

    // Get wallet information from the returned permissions
    const walletInfo = permissions.address[0];

    // Return the wallet information for further processing
    return walletInfo;
  } catch (error) {
    console.error('Error connecting to Tezos wallet:', error);
    throw error; // Re-throw the error to be caught in the calling function
  }
}

// Initialize Google Sign-In with your Client ID
gapi.load('auth2', function() {
  gapi.auth2.init({
    client_id: 'YOUR_CLIENT_ID'
  });
});

// Attach a click event listener to the "Login with Google" button
const googleButton = document.getElementById('googleButton');
googleButton.addEventListener('click', function() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signIn().then(function(googleUser) {
    // Handle the Google user data, e.g., send it to your backend for authentication
    const profile = googleUser.getBasicProfile();
    const email = profile.getEmail();
    const idToken = googleUser.getAuthResponse().id_token;
    
    // Send the email and idToken to your server for further processing
    // Example: You can make an AJAX request to your server with this data
  });
});
