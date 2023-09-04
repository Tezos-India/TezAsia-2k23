import React from "react";

const TokenCard = ({ item, onClick, onCollect }) => {
  return (
    <div className="ui fluid card">
      <div className="image">
      <img
					onClick={onClick}
					style={{ maxHeight: "200px", objectFit: "cover" }}
					src={`https://ipfs.io/ipfs/${
						item.image.split("ipfs://")[1]
					}`}
					alt={item.description}
				/>
      </div>
      <div className="content">
        <div className="right floated">
          Price:
          <div style={{ color: "black" }}>{item.amount}</div>
        </div>
        <div className="header">{item.name}</div>
        <div className="meta">{item.symbol}</div>
        <div className="description">
          {item.description.length > 15
            ? item.description.slice(0, 15) + "..."
            : item.description}
        </div>
      </div>

      <div className="extra content">
        <span className="right floated">
          <button className="ui basic button" onClick={onCollect}>
            {item.collectable ? "Buy" : "Sold Out"}
          </button>
        </span>
        <span>
          Token ID:
          <div style={{ color: "black" }}>{item.token_id}</div>
        </span>
      </div>
    </div>
  );
};

export default TokenCard;
