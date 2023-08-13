import { Homepage } from "../components/Homepage";
import {Navbar} from "../components/Navbar";

const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-purple-900 min-h-screen">
      <Navbar />
      <hr className="border-t border-white"></hr>
      <Homepage />
    </div>
  );
};

export default Home;
