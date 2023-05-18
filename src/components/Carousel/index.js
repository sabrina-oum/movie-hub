import { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import ContentWrapper from "../ContentWrapper";
import CarouselItem from "../CarouselItem";
import "./style.scss";

const Carousel = ({ data, loading, endPoint, title }) => {
  const carouselContainerRef = useRef();

  const navigation = (dir) => {
    const container = carouselContainerRef.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const ShimmerItem = () => {
    return (
      <div className="shimmer-item">
        <div className="shimmer-item__poster-block shimmer"></div>
        <div className="shimmer-item__text-block">
          <div className="title shimmer"></div>
          <div className="date shimmer"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <h2 className="carousel__title">{title}</h2>}
        <BsFillArrowLeftCircleFill
          className="carousel__arrow carousel__left-nav"
          onClick={navigation.bind(null, "left")}
        />
        <BsFillArrowRightCircleFill
          className="carousel__arrow carousel__right-nav"
          onClick={navigation.bind(null, "right")}
        />
        {!loading && (
          <div className="carousel__items" ref={carouselContainerRef}>
            {data?.map((item) => (
              <CarouselItem key={item.id} item={item} endPoint={endPoint} />
            ))}
          </div>
        )}
        {loading && (
          <div className="loading-shimmer">
            {ShimmerItem()}
            {ShimmerItem()}
            {ShimmerItem()}
            {ShimmerItem()}
            {ShimmerItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
