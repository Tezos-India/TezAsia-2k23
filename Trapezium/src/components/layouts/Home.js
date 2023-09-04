import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { collectNFT } from "../../actions";
import Token from "../sections/TokenCard";

const Home = ({ Tezos }) => {
    const selector = useSelector((state) => state.tokenData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const tokens = selector.map((obj, idx) => (
      <Token
        key={idx}
        item={obj}
        onCollect={() =>
          dispatch(collectNFT({ Tezos, amount: obj.amount, id: obj.token_id }))
        }
        onClick={() =>
          navigate(`/show/${obj.token_id}`)
        }
      />
    ));

    return <div className="ui link three column grid cards">{tokens}</div>;
};

export default Home;
