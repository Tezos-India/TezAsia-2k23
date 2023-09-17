import TrendingCard from "./TrendingCard"
// import Fade from 'react-reveal/Fade';
import UNOBg from "../assets/uno-wallpaper.jpeg";
import ChessBg from "../assets/chess_bg.jpeg";

const Trending = () => {
  return (
    <div className="w-full py-[4rem] " >
        {/* <Fade bottom> */}
        <div className="flex flex-col space-y-4 xl:flex-row xl:space-y-0 items-center justify-between" >
            <p className="text-[1.4rem] font-bold text-center " >Currently Trending Games</p>
            {/* <button className="bg-[#160E46] w-[7rem] py-3 text-sm rounded-lg" >SEE ALL</button> */}
        </div>
        {/* </Fade> */}

        {/* <Fade bottom> */}
        <div className="flex flex-wrap items-center justify-center xl:justify-between sm:space-x-4 xl:space-x-0 mt-[4rem]" >
            <TrendingCard image={UNOBg} name={'UNO'} />
            {/* <TrendingCard image={ChessBg} name={'CHESS'} /> */}
            
        </div>
        {/* </Fade> */}
    </div>
  )
}

export default Trending