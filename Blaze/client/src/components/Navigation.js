import React from "react";
import { Link } from "react-router-dom";

function Navigation({ lang = false }) {
  return (
    <>
      <ul>
        <li>
          <a
            href="/"
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
            }}
          >
            Home
          </a>
        </li>
        <li>
          <Link
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
            }}
            to="/voting"
          >
            Voting
          </Link>
        </li>

        <li>
          <Link
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
            }}
            to="/results"
          >
            Results
          </Link>
        </li>
        <li>
          <Link
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
            }}
            to="/donate"
          >
            Donate
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Navigation;
