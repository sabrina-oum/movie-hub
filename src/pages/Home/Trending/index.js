import { useState } from "react";

import ContentWrapper from "../../../components/ContentWrapper";
import SwitchTabs from "../../../components/SwitchTabs";
import useFetch from "./../../../hooks/useFetch";
import Carousel from "./../../../components/Carousel";

const Trending = () => {
  const [endPoint, setEndpoint] = useState("day");

  const { data, loading } = useFetch(`/trending/all/${endPoint}`);

  const switchTabHandler = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };

  return (
    <div className="carousel-section">
      <ContentWrapper>
        <h2 className="carousel-title">Trending</h2>
        <SwitchTabs data={["Day", "Week"]} onSwitchTab={switchTabHandler} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
