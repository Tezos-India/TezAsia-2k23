const express = require("express");
const app = express();
// let cors_proxy = require('cors-anywhere');
const axios = require('axios');

const cors = require('cors');

app.use(cors());

// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;


// cors_proxy.createServer({
//     originWhitelist: [], // Allow all origins
//     requireHeader: ['origin', 'x-requested-with'],
//     removeHeaders: ['cookie', 'cookie2']
// }).listen(port, host, function() {
//     console.log('Running CORS Anywhere on ' + host + ':' + port);
// });

app.get("/",(req, res)=>{

  res.send("Hello world")
})

//To extract token from igdb
app.get("/getToken",(req, res)=>{

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://id.twitch.tv/oauth2/token?client_id=c6jd48ju5s4c4u7xu1qgyafqfgaee8&client_secret=lvjoeeu40tzzury0ghs44ola0uccl1&grant_type=client_credentials',
    headers: { }
  };
  
axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  res.send(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
})


// Handle the "/getCover" route
app.get("/getCover", (req, res) => {
  
  const token = req.query.token ;
  const gameid = req.query.id ;
  fetch(
    `https://api.igdb.com/v4/covers/${gameid}`,
    { method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': 'c6jd48ju5s4c4u7xu1qgyafqfgaee8',
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin':'http://localhost:8080',
      },
      body: "fields alpha_channel,animated,checksum,game,game_localization,height,image_id,url,width;"
  
  })
    .then(response => {
        return response.json();
    })
    .then(data =>{
      console.log(data)
      res.send(data)

    }
      
    )
    .catch(err => {
        console.error(err);
    });
  console.log('last URL')
});

// Handle the "/getImages" route
app.get("/getImages", (req, res) => {
  
  const token = req.query.token ;
  fetch(
    "https://api.igdb.com/v4/screenshots/",
    { method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': 'c6jd48ju5s4c4u7xu1qgyafqfgaee8',
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin':'http://localhost:8080',
      },
      body: "fields alpha_channel,animated,checksum,game,height,image_id,url,width;;"
  
  })
    .then(response => {
        return response.json();
    })
    .then(data =>{
      console.log(data)
      res.send(data)

    }
      
    )
    .catch(err => {
        console.error(err);
    });
  console.log('last URL')
});

// Handle the "/getGames" route
app.get("/getGames", (req, res) => {
  let data = 'fields id,name,summary,rating,cover.url,screenshots.url;\r\nwhere rating>90;\r\nlimit 100;\r\n\r\n\r\n\r\n\r\n';
  
  const token = req.query.token ;
  fetch(
    "https://api.igdb.com/v4/games/",
    { method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': 'c6jd48ju5s4c4u7xu1qgyafqfgaee8',
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin':'http://localhost:8080',
      },
      body: data
  
  })
    .then(response => {
        return response.json();
    })
    .then(data =>{
      console.log(data)
      res.send(data)

    }
      
    )
    .catch(err => {
        console.error(err);
    });
  console.log('last URL')
});


// Listen on port 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});