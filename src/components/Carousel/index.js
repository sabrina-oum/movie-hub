import { useRef, useState } from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import ContentWrapper from "../ContentWrapper";
import CarouselItem from "../CarouselItem";
import "./style.scss";

const Carousel = ({ data, loading, endPoint, title }) => {
  const [index, setIndex] = useState(0);
  const [start, setStart] = useState(true);
  const [end, setEnd] = useState(false);
  const carouselContainerRef = useRef();

  const navigation = (dir) => {
    const container = carouselContainerRef.current;

    const totalIndex = Math.round(
      container.scrollWidth / container.offsetWidth
    );

    if (dir === "right") {
      if (index + 1 === totalIndex - 1) {
        setEnd(true);
      }
      setStart(false);
      setIndex((prev) => prev + 1);
    }

    if (dir === "left") {
      if (index - 1 === 0) {
        setStart(true);
      }
      setEnd(false);
      setIndex((prev) => prev - 1);
    }

    if (
      (container.scrollLeft -
        Math.floor(container.scrollLeft / container.offsetWidth) * 20) %
        container.offsetWidth !==
      0
    )
      return;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "instant",
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
        {!start && (
          <div className="carousel__nav carousel__nav-left">
            <FaChevronLeft
              className="carousel__arrow"
              onClick={navigation.bind(null, "left")}
            />
          </div>
        )}
        {!end && (
          <div className="carousel__nav carousel__nav-right">
            <FaChevronRight
              className="carousel__arrow "
              onClick={navigation.bind(null, "right")}
            />
          </div>
        )}
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
