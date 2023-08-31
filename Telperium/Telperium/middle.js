
const { TezosToolkit } = require('@taquito/taquito');

const Tezos = new TezosToolkit('https://ghostnet.ecadinfra.com');

// const contractAddress = 'KT1MJF3fs21doh5M8geHpci4zrqo1vgUgNzH';
// const contractAddress = 'KT18jBM8zJXok7YT1oZXqa5jfKJQn6sjmGmj';
const contractAddress = 'KT1UPuPWXnRQL8FptoPLyNCxG1xVgke2pi12';

async function fetchDesiredTimestamp() {
  const contract = await Tezos.contract.at(contractAddress);
  const storage = await contract.storage();
  
  
  const isoTimestamp = storage.deadline ;
  const deadline = Date.parse(isoTimestamp)/1000;
  console.log('deadline     =  ' + deadline );


  return deadline;
}

(async () => {
  try {
    const desiredTime = await fetchDesiredTimestamp();
    const currentTimestamp = Math.floor(Date.now() / 1000);
   

    console.log('curent time  =  ' + currentTimestamp );
 
    if (currentTimestamp >= desiredTime) {
   
      await initializeOnMetaAPIs() ;

      // console.log('Timestamp condition met. Initializing OnMeta APIs...');
    } else {
      console.log('Timestamp condition not met yet.');
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();

const apiBaseUrl = "https://stg.api.onmeta.in/v1";
const apiKey = "enter api k";
const authToken = "";




function initializeLogin() {
  const loginData = { "email": "" };
  const loginOptions = getFetchOptions("POST", loginData);

  fetchWithLogging(`${apiBaseUrl}/users/login`, loginOptions, "Login Result");
}

function refreshToken() {
  const requestOptions = getAuthorizedFetchOptions("GET");
  fetchWithLogging(`${apiBaseUrl}/users/refresh-token`, requestOptions);
}

function linkAccount() {
  const bodyData = { name: "Rohan", panNumber: "jdj94850", email: "", kycVerified: true, bankDetails: {}, phone: {} };
  const requestOptions = getAuthorizedFetchOptions("POST", bodyData);

  fetchWithLogging(`${apiBaseUrl}/users/account-link`, requestOptions);
}

function bankStatus() {
  const requestOptions = getAuthorizedFetchOptions("POST");
  fetchWithLogging(`${apiBaseUrl}/users/get-bank-status/{refNumber}`, requestOptions);
}

function fetchTokens() {
  const tokensOptions = getFetchOptions("GET");
  fetchWithLogging(`${apiBaseUrl}/tokens/`, tokensOptions, "Tokens Result");
}

function fetchQuotation() {
  const quotationData = { "buyTokenSymbol": "MATIC", "chainId": 80001, "fiatCurrency": "inr", "fiatAmount": 100, "buyTokenAddress": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" };
  const quotationOptions = getFetchOptions("POST", quotationData);

  fetchWithLogging(`${apiBaseUrl}/quote/buy`, quotationOptions);
}

function initializeOrderCreation() {
  const orderData = { "buyTokenSymbol": "MATIC",
  "chainId": 80001,
  "fiatCurrency": "inr",
  "fiatAmount": 100,
  "buyTokenAddress": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  "receiverAddress": "",
  "paymentMode": "INR_UPI",
 "metaData": { "userID": "email@stypedia.com", "userName": "" } 
};
  const orderOptions = getAuthorizedFetchOptions("POST", orderData);

  fetchWithLogging(`${apiBaseUrl}/orders/create`, orderOptions);
}

function getFetchOptions(method, body = null) {
  const headers = new Headers({ "Accept": "application/json", "x-api-key": apiKey });
  return { method, headers, body: body ? JSON.stringify(body) : undefined, redirect: 'follow' };
}

function getAuthorizedFetchOptions(method, body = null) {
  const headers = new Headers({ "Accept": "application/json", "Authorization": `Bearer ${authToken}`, "x-api-key": apiKey });
  return { method, headers, body: body ? JSON.stringify(body) : undefined, redirect: 'follow' };
}


function fetchWithLogging(url, options, logLabel = null) {
  console.log(`Initializing ${logLabel || url} API...`);
  fetch(url, options)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function submitUtr() {
    const utrData = { "orderId": '' , "utr": '1234569881' };
    const requestOptions = getAuthorizedFetchOptions("POST", utrData);
  
    fetchWithLogging(`${apiBaseUrl}/orders/utr`, requestOptions);
  }

  

function initializeOnMetaAPIs() {
    initializeLogin();
    refreshToken();
    linkAccount();
    bankStatus();
    fetchTokens();
    fetchQuotation();
    initializeOrderCreation();
    submitUtr();
  }
// initializeOnMetaAPIs();
