import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/LazyLoadImage/Img";
import ContentWrapper from "../../../components/ContentWrapper";
import "./style.scss";

const Hero = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data, url]);

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="hero-banner">
      {!loading && (
        <div className="hero-banner__backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="hero-banner__overlay"></div>
      <ContentWrapper>
        <div className="hero-banner__wrapper">
          <div className="hero-banner__content">
            <span className="hero-banner__title">Welcome.</span>
            <span className="hero-banner__subtitle">
              Millions of movies, TV shows and people to discover. Explore now.
            </span>
            <div className="search-input">
              <input
                type="text"
                placeholder="Search for a movie or tv show..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <button>Search...</button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Hero;
