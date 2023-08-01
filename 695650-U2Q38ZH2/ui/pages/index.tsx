import { Homepage } from "@/components/Homepage";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  return (
    <div className=" bg-[#150a3f]">
      <Navbar />
      <hr className="border-t border-white h-2 my-2"></hr>
      <Homepage />
      

      
    </div>
  );
};

export default Home;
