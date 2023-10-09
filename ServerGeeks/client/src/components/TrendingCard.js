import { useNavigate } from "react-router-dom";

const TrendingCard = ({image, name}) => {
    const navigate = useNavigate();
    return (
      <div className="flex flex-col items-center mt-[2rem]" onClick={() => navigate("/uno", { replace: true })}>
          <div className="rounded-2xl cursor-pointer overflow-hidden" >
              <img src={image} className="hover:scale-110 duration-300 " />
          </div>
  
          <div className="flex items-center space-x-1 mt-4 " >
              <h1 className="font-bold text-lg" >{name}</h1>
          </div>
      </div>
    )
  }
  
  export default TrendingCard