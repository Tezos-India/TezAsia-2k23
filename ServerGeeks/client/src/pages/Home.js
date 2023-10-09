// import Footer from "./components/Footer";
// import Header from "../components/Header/Header";
import Hero from "../components/Hero";
import Trending from "../components/Trending";
import WeeklyGame from "../components/WeeklyGames";
import Bg_img from "../assets/star-bg.jpeg";

function Home() {
  return (
    <main className="text-white" style={{backgroundImage:`url(${Bg_img})`, backgroundRepeat:"repeat"}} >
      <div className="w-full xl:max-w-[1250px] mx-auto px-4 "  >
        {/* <img className="home-bg" src={Bg_img} /> */}
        <Hero />
        <Trending />
        <WeeklyGame />
      </div>
      {/* <Footer /> */}
    </main>
  );
}

export default Home;