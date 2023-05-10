import React from "react";
import "./ProductCard.css";

const ProductCard = ({
  id,
  name,
  type,
  description,
  price,
  image_url,
  color,
  memory,
  feature,
  addItemToCart,
}) => {
  const handleAddToCart = () => {
    addItemToCart({
      id,
      name,
      description,
      type,
      price,
      image_url,
      color,
      memory,
      feature,
    });
  };
  return (
    <div className="product-card-container">
      <div className="product-card">
        <div>
          <img src={image_url} alt={name} />
        </div>
        <div className="product-card-text">
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
        <p id="product-card-price" className="product-card-tag">
          £{price}
        </p>
        <div className="product-card-tags">
          <p>{color}</p>
          <p>{memory}GB</p>
          <p>{feature}</p>
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
