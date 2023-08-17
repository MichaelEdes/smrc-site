import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminLoginPage from "./pages/AdminLoginPage/AdminLoginPage";
import Header from "./components/Header/Header";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";

function App() {
  const [isActive, setIsActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.removeItem("isLoggedIn");
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("isLoggedIn", String(isLoggedIn));
  }, [cart, isLoggedIn]);

  const toggleCart = () => {
    setIsActive(!isActive);
  };

  const addItemToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeItemFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const emptyCart = () => {
    setCart([]);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <ShoppingCart
          isActive={isActive}
          cart={cart}
          toggleCart={toggleCart}
          removeItemFromCart={removeItemFromCart}
          emptyCart={emptyCart}
        />
        <Header toggleCart={toggleCart} cart={cart} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={<HomePage addItemToCart={addItemToCart} />}
          />
          <Route
            path="/ProductPage"
            element={<ProductPage addItemToCart={addItemToCart} />}
          />
          <Route
            path="/AdminPage"
            element={
              isLoggedIn ? (
                <AdminPage />
              ) : (
                <AdminLoginPage setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route
            path="/AdminLoginPage"
            element={<AdminLoginPage setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
