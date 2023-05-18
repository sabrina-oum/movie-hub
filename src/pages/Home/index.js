import Hero from "./Hero";
import Popular from "./Popular";
import TopRated from "./TopRated";
import Trending from "./Trending";
import "./style.scss";

const Home = () => {
  return (
    <div className="homePage">
      <Hero />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
