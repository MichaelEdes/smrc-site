import CancelIcon from "@mui/icons-material/Cancel";
import React, { useState } from "react";
import "./ShoppingCart.css";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";
import axios from "axios";

function ShoppingCart({
  isActive,
  toggleCart,
  cart,
  removeItemFromCart,
  emptyCart,
}) {
  const handleCartClick = () => {
    toggleCart();
    setCheckout(false);
  };

  const [checkout, setCheckout] = useState(false);
  const [userName, setUserName] = useState("");

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  const handleCheckout = async () => {
    if (!checkout) {
      setCheckout(true);
    } else {
      if (!userName.trim()) {
        alert("Please enter your full name to complete the order.");
        return;
      }

      const orderData = {
        userName,
        total: cartTotal,
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: 1,
          price: item.price,
        })),
      };

      try {
        const response = await axios.post(
          "https://smrc.herokuapp.com/orders",
          orderData
        );
        alert(
          `Checkout completed. Thank you for your order ${userName}! \nOrder Total: £${cartTotal.toFixed(
            2
          )} \nYou Ordered: ${cart.map(
            (item) =>
              `\n${item.name} -- ${item.memory}GB | ${item.feature} | ${item.color} -- ${item.price}`
          )}`
        );
        console.log(response);
        emptyCart();
        toggleCart();
      } catch (err) {
        alert("Error submitting the order.");
      }
    }
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <div className={`shopping-cart-container ${isActive ? "active" : ""}`}>
      <div className="cart-header">
        <div>
          <h1>Shopping Cart</h1>
          <p>You have {cart.length} items in your cart</p>
        </div>
        <CancelIcon className="close-icon" onClick={handleCartClick} />
      </div>
      <hr className="cart-breakline" />
      <div className="cart-content">
        {cart.map((item, index) => (
          <ShoppingCartItem
            key={index}
            name={item.name}
            description={item.description}
            image_url={item.image_url}
            price={item.price}
            memory={item.memory}
            color={item.color}
            feature={item.feature}
            index={index}
            removeItemFromCart={removeItemFromCart}
          />
        ))}
      </div>
      <div className="cart-footer">
        {cart.length > 0 ? (
          <div>
            <hr className="cart-breakline" />
            <div className="cart-total">
              Total <span>£{cartTotal.toFixed(2)}</span>
            </div>
            <div className="cart-checkout">
              <input
                type={"text"}
                title="Full Name"
                placeholder="Full Name"
                value={userName}
                onChange={handleUserNameChange}
              />
              <button onClick={handleCheckout}>
                {!checkout ? "Checkout" : "Complete Order"}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="back-to-shopping-btn">
              <button onClick={handleCartClick}>
                <ArrowCircleLeftIcon /> Back To Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
