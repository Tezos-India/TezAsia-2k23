
export const fetchData=async ()=>{
   
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      let response=await fetch(`http://localhost:8080/getGames?token=c59n15dhg7u7w2t5jurqcheb39n9xe`, requestOptions)
     
        const result=await response.json();
        // console.log(result)
        return result;
     
    
}