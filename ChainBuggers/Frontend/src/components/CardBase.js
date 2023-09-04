import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import MovieCard from "./MovieCard";
export default function   CardBase() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: `https://flexpass-back.onrender.com/movie/getAllMovies`
    })
      .then((response) => {
        // setSplitInto(response.data.userNames)
        console.log("data", response.data);

        setMovies(response.data);
        console.log("state", movies);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [0]);

  return (
    <div className="text-white capitalize font-semibold  text-[4rem]">
      <span className="p-20">Movies</span>

      <div className="grid grid-cols-3 justify-items-start ">
        {movies.map((movie) => {
          return (
            <div onClick={()=>{
              navigate('/theatreSelection',{state:movie});
            }}>
                <MovieCard
                  name={movie.name}
                  image={movie.image}
                  release={movie.release}
                />
            </div>
          );
        })}

        {/* <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard /> */}
      </div>
    </div>
  );
}
