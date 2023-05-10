import React from "react";
import "./PageHero.css";

const PageHero = () => {
  return (
    <div className="page-hero">
      <div className="page-hero-text">
        <h1 id="hero-title">
          Broken <span>Phone</span>?
        </h1>
        <p id="hero-subtitle">Buy a new one or get yours fixed today! 😁</p>
        <a
          className="social-facebook-link"
          href="https://www.facebook.com/MephoneSunderland"
          target="_blank"
          rel="noreferrer"
        >
          <img
            alt="facebook icon"
            src={`${process.env.PUBLIC_URL}/images/icons/facebook.png`}
          />
        </a>
      </div>
      <div className="page-hero-image">
        <img
          id="hero-image"
          src={`${process.env.PUBLIC_URL}/images/iPhoneWoodenHand.png`}
          alt=""
        />
      </div>
    </div>
  );
};

export default PageHero;
