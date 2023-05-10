import React from "react";
import PageHero from "../../components/PageHero/PageHero";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import RepairCentre from "../../components/RepairCentre/RepairCentre";
function HomePage({ addItemToCart }) {
  return (
    <>
      <PageHero />
      <ProductCarousel addItemToCart={addItemToCart} />
      <RepairCentre />
    </>
  );
}

export default HomePage;
