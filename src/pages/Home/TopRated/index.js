import { useState } from "react";

import ContentWrapper from "../../../components/ContentWrapper";
import SwitchTabs from "../../../components/SwitchTabs";
import useFetch from "./../../../hooks/useFetch";
import Carousel from "./../../../components/Carousel";

const TopRated = () => {
  const [endPoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endPoint}/top_rated`);

  const switchTabHandler = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carousel-section">
      <ContentWrapper>
        <h2 className="carousel-title">Top Rated</h2>
        <SwitchTabs
          data={["Movies", "TV Shows"]}
          onSwitchTab={switchTabHandler}
        />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
    </div>
  );
};

export default TopRated;
