import React, { useState, useEffect } from "react";
import "./ProductPage.css";
import axios from "axios";
import ProductCard from "../../components/ProductCard/ProductCard";

const Filters = ["Phone", "Tablet", "TV", "Laptop", "Desktop"];

function ProductPage({ addItemToCart }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

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

  const toggleFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const displayedProducts = Array.isArray(products)
    ? products.filter(
        (product) =>
          (selectedFilters.length === 0 ||
            selectedFilters.includes(product.type)) &&
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="product-page-container">
      <div className="page-filters-container">
        <input
          type="search"
          className="search-bar"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="filters-container">
          {Filters.map((filter) => (
            <div
              key={filter}
              className={`filter-pill ${
                selectedFilters.includes(filter) ? "selected" : ""
              }`}
              onClick={() => toggleFilter(filter)}
            >
              {filter}
            </div>
          ))}
        </div>
      </div>
      <div className="products-page-content">
        <div className="products-page-items-container">
          {displayedProducts?.map((product) => (
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
  );
}

export default ProductPage;
