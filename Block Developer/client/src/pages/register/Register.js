import { useEffect, useState, useDispatch, Fragment, useContext } from "react";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import "./Register.css";
import LoadingSpinner from "../../components/misc/LoadingSpinner/LoadingSpinner";
import AuthContext from "../../store/auth-context";

const Register = ({ history }) => {
  const [username, setUsername] = useState("");
  const [errorData, setErrorData] = useState("");
  const [loading, setLoading] = useState(false)

  const context = useWeb3React();
  const { connector, library, chainId, account, activate, deactivate, active, error } = context;
  
  const ctx = useContext(AuthContext)

  var data = JSON.stringify({
    "address": account,
    "username": username
  });
  
  var config = {
    method: 'post',
    url: 'https://polyess-listner.herokuapp.com/register',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  

  const registerHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios(config)
      const result = await response.data
      console.log(result);
      ctx.registerHandler()
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
    {loading && <LoadingSpinner />}
    <div className="register-screen d-flex flex-column justify-content-center align-items-center">
      <div className="logo my-3 mb-5">
        <h1 className="text-center" style={{ color: "#d1996d" }}>
          <b>Enter Details to Play</b>
        </h1>
      </div>
      <form onSubmit={registerHandler} className="register-screen__form mb-5">
        <h3 className="register-screen__title text-light">Register</h3>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            required
            id="username"
            placeholder="Username"
            value={username}
            autocomplete="off"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            required
            id="address"
            autoComplete="true"
            placeholder="Wallet Address"
            value={account}
          />
        </div>
        <button type="submit" className="form-btn form-btn-primary">
          Register
        </button>
      </form>
    </div>
    </Fragment>
  );
};

export default Register;
