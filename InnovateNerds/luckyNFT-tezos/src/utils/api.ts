import axios from 'axios';

export const getNFT=async()=>{
    let tokenNo=Math.floor(Math.random()*50)+1
    const options = {
        method: 'GET',
        url: 'https://opensea13.p.rapidapi.com/asset/',
        params: {
            asset_contract_address: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
            token_id: tokenNo,
            include_orders: 'false'
        },
        headers: {
            'X-RapidAPI-Key': '3883fbdc98mshe4ee32882ea57cfp1b0905jsn6f045dccf9df',
            'X-RapidAPI-Host': 'opensea13.p.rapidapi.com'
        }
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data.image_url);
        return await response.data.image_url
    } catch (error) {
        console.error(error);
    }
    
}