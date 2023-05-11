import React, { useState, useEffect } from "react";
import "./ProductCarousel.css";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
const ProductCarousel = ({ addItemToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = axios.get("http://localhost:8800/products");
        setProducts((await res).data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <>
      <div className="product-carousel-wrapper">
        <h1 id="product-carousel-title">Popular Items</h1>
        <div className="product-carousel-container">
          <div className="product-carousel">
            {products?.slice(0, 7).map((product, index) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                type={product.type}
                description={product.description}
                image_url={product.image_url}
                color={product.color}
                memory={product.memory}
                feature={product.feature}
                price={product.price}
                addItemToCart={addItemToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCarousel;
