import React from "react";
import "./Header.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function Header({ toggleCart, cart, isLoggedIn }) {
  const handleCartClick = () => {
    toggleCart();
  };

  return (
    <div className="header-container">
      <div className="header">
        <div className="logo">
          <a href="/">
            SM<span>RC</span>
          </a>
        </div>
        <div className="page-link">
          <a href="/ProductPage">All Products</a>
        </div>
        <div className="cart-icon-container">
          {!isLoggedIn && (
            <button className="admin-button">
              <a href={isLoggedIn ? "/AdminPage" : "AdminLoginPage"}>
                Admin Hub
              </a>
            </button>
          )}
          <div className="cart-icon" onClick={handleCartClick}>
            {cart.length > 0 && (
              <div className="cart-item-count">{cart.length}</div>
            )}
            <ShoppingCartOutlinedIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
