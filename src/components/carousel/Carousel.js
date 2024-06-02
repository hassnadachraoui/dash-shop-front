// carousel.js
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "./data";
import CarouselItem from "./CarouselItem";

const ProductCarousel = ({ products }) => {
  return (
    <div>
      <Carousel
        showDots={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        customTransition="all 500ms ease"
        transitionDuration={1000}
      >
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            url={product.imageurl}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
