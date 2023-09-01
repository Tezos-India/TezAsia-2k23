import React from "react";
import "./cardStyle.css";
const Card = (props) => {
  const { item } = props;
  console.log(item);
  return (
    <div
      className="cardd"
      style={{
        margin: "1rem",
      }}
    >
      <div className="cardd-border-top"></div>
      <div className="img" style={{}}>
        <img
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            objectFit: "cover",
            borderRadius: "0.6rem",
          }}
          src={`https://gateway.pinata.cloud/ipfs/${item.value.image}`}
          alt=""
        />
      </div>
      <span>
        <h3
          style={{
            color: "white",
          }}
        >
          {item.value.name}
        </h3>
      </span>
      <p className="job"> {item.value.header}</p>
      <button disabled={true}> Click</button>
    </div>
  );
};

export default Card;
