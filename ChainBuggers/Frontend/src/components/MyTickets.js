import React, { useState, useEffect } from "react";
import axios from "axios";
import ResellTicket from "./ResellTicket";
import TicketLogElement from "./TicketLogElement";

const MyTickets = () => {
  // const [movies, setMovies] = useState([]);
  // const [check, setCheck] = useState(false);

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     // url: `https://flexpass-back.onrender.com/movie/getAllMovies`
  //     url: `http://127.0.0.1:8000/movie/getAllMovies`
  //   })
  //     .then((response) => {
  //       // setSplitInto(response.data.userNames)
  //       console.log("data", response.data);
  //       setCheck(true)
  //       setMovies(response.data);
  //       console.log("state", movies);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   }, [0]);

  return (
    <div className="my-10 mx-16">
      <div className="flex flex-col justify-start">
        <div className="text-poppins mb-8 text-21xl font-bold text-white">
          My Tickets :
        </div>
        <div className="text-poppins text-4xl font-medium text-white">
          Recent :
        </div>
        <div className="flex mx-2 my-4 justify-between">
          <ResellTicket />
          <ResellTicket />
        </div>
        <div className="text-poppins text-4xl font-medium text-white">
          History :
        </div>
        {/* <div className="w-full h-[30vh] flex flex-col  mx-2 my-2"> */}
        <div class="parent h-[500px] overflow-hidden m-2 mt-4">
          <div class="child h-auto max-h-[300px] overflow-y-scroll">
            {/* {check && */}
            <TicketLogElement
              image={
                "https://m.media-amazon.com/images/M/MV5BZTNiNDA4NmMtNTExNi00YmViLWJkMDAtMDAxNmRjY2I2NDVjXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg"
              }
              name={"Transformer"}
              status={"Expired"}
              seat={"H-10"}
            />
            <TicketLogElement
              image={
                "https://m.media-amazon.com/images/M/MV5BZTNiNDA4NmMtNTExNi00YmViLWJkMDAtMDAxNmRjY2I2NDVjXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg"
              }
              name={"Transformer"}
              status={"Sold"}
              seat={"H-11"}
            />
            <TicketLogElement
              image={
                "https://m.media-amazon.com/images/M/MV5BZTNiNDA4NmMtNTExNi00YmViLWJkMDAtMDAxNmRjY2I2NDVjXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg"
              }
              name={"Transformer"}
              status={"Expired"}
              seat={"H-12"}
            />
            <TicketLogElement
              image={
                "https://assets-prd.ignimgs.com/2023/02/08/jw4-2025x3000-online-character-1sht-keanu-v187-1675886090936.jpg"
              }
              name={"John Wick"}
              status={"Expired"}
              seat={"I-2"}
            />
            <TicketLogElement
              image={
                "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg"
              }
              name={"Cyberpunk"}
              status={"Sold"}
              seat={"C-9"}
            />
            {/*  } */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTickets;
