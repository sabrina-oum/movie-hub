import { useSelector } from "react-redux";
import dayjs from "dayjs";

import posterFallback from "./../../assets/no-poster.png";
import Img from "./../LazyLoadImage/Img";
import "./style.scss";
import CircleRating from "../CircleRating";
import Genres from "../Genres";
import { useNavigate } from "react-router-dom";

const CarouselItem = ({ item, endPoint }) => {
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const posterUrl = item.poster_path
    ? url.poster + item.poster_path
    : posterFallback;

  return (
    <div
      className="carousel-item"
      onClick={() =>
        navigate(`/${item.media_type || endPoint}/${item.id}
    `)
      }
    >
      <div className="carousel-item__poster-block">
        <Img src={posterUrl} alt="" />
        <CircleRating rating={item.vote_average.toFixed(1)} />
        <Genres data={item.genre_ids} />
      </div>
      <div className="carousel-item__text-block">
        <span className="carousel-item__title">{item.title || item.name}</span>
        <span className="carousel-item__date">
          {dayjs(item.release_date || item.first_air_date).format(
            "MMM D, YYYY"
          )}
        </span>
      </div>
    </div>
  );
};

export default CarouselItem;
