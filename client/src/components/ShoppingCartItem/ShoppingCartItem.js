import React from "react";
import "./ShoppingCartItem.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
function ShoppingCartItem({
  name,
  description,
  price,
  image_url,
  memory,
  feature,
  color,
  index,
  removeItemFromCart,
}) {
  const handleRemoveItem = () => {
    removeItemFromCart(index);
  };

  return (
    <div className="shopping-cart-item-container">
      <div>
        <img src={image_url} alt={name} />
      </div>
      <div className="cart-item-content">
        <h1>{name}</h1>
        <p>{description}</p>
        <div className="cart-item-details">
          <sub>
            {memory}GB | {feature} | {color}
          </sub>
          £{price}
        </div>
      </div>
      <div className="cart-item-remove-btn">
        <div className="cart-remove-item" onClick={handleRemoveItem}>
          <HighlightOffIcon />
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartItem;
