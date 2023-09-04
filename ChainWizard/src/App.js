import { useState, useEffect } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { particlesConfig } from "./particles.js";
// Components
import Navbar from "./components/Navbar";
import styles from "./index.css";

//operation
import { ContributeFundOperation, endFund } from "./utils/operation";

//tzkt
import { fetchStorage } from "./utils/tzkt";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [total_fund, setAmount] = useState(0);
  const [goal,setGoal]=useState(10);
  const [contributor, setContributors] = useState([]);
  const [contribution, setContributions] = useState([]);

  const [currency, setCurrency] = useState(0);
  const [loadingContribution, setLoadingContribution] = useState(false);


  
  const particlesInit = async (main) => {
    await loadFull(main);
  };
  
  const particlesLoaded = (container) => {
    console.log(container);
  };
  useEffect(() => {
    (async () => {
      const storage = await fetchStorage();
      setContributors(Object.keys(storage.contributors));
      setContributions(Object.values(storage.contributors));
      setAmount(storage.total_amount);
      setGoal(storage.goal);
    })();
  }, []);

  const onEndGame = async () => {
    try {
      setLoading(true);
      await endFund();
      alert("GAME ENDED!");
    } catch (err) {
      alert("Failed to end!");
    }
    setLoading(false);
  };
  const onContribute = async () => {
    try {
      setLoadingContribution(true);
      await ContributeFundOperation(currency);
      alert("CONTRIBUTED!");
      const updatedStorage = await fetchStorage();
      setContributors(Object.keys(updatedStorage.contributors));
      setContributions(Object.values(updatedStorage.contributors))
    } catch (err) {
      alert("Failed to contribute!");
    }
    setLoadingContribution(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The amount you entered: ${currency/1000000} ꜩ`);
  };

  return (
    <div className="h-100">
      <Navbar />
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <div className={styles.py-1}>FUND ACHIEVED: {total_fund/1000000} ꜩ</div>
        <div className={styles.py-1}>GOAL: {goal/1000000} ꜩ</div>

        <form onSubmit={handleSubmit}>
          <label>
            Enter the amount you want to contribute in standard currency:
            <input
              type="number"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            />
          </label>
          <input type="submit" value="Update amount" />
        </form>

        {/* Action Buttons */}
        {total_fund !== goal ? (
        <button onClick={onContribute} className="btn btn-primary btn-lg">
          {loadingContribution ? "Loading..." : "Contribute ꜩ"}
        </button>
         ) : ( 
        <button onClick={onEndGame} className="btn btn-success btn-lg">
        {loading===true ?"Loading..":"End Fund"}
        </button>
        )}
        {/* List of Contributors */}
        <div className="mt-2">
          {contributor.map((player, index) => (
            <div key={index}>
              <b>Contributor {index+1}:-</b> {player} contributed {contribution[index]}
            </div>
          ))}
          <section>
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesConfig}
            loaded={particlesLoaded}
          />
        </section>
        </div>
      </div>
    </div>
  );
};

export default App;
