import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/ContentWrapper";
import Img from "../../../components/LazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";

const Cast = ({ cast, loading }) => {
  const { url } = useSelector((state) => state.home);

  const shimmer = () => {
    return (
      <div className="shimmer-item">
        <div className="circle shimmer"></div>
        <div className="row shimmer"></div>
        <div className="row2 shimmer"></div>
      </div>
    );
  };
  return (
    <div className="cast">
      <ContentWrapper>
        <div className="section-heading">Top Cast</div>
        {!loading ? (
          <div className="cast__list">
            {cast?.map((item) => {
              let imgUrl = item.profile_path
                ? url.profile + item.profile_path
                : avatar;
              return (
                <div key={item.id} className="cast-item">
                  <div className="cast-item__img">
                    <Img src={imgUrl} />
                  </div>
                  <div className="cast-item__name">{item.name}</div>
                  <div className="cast-item__character">{item.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="cast-shimmer">
            {shimmer()}
            {shimmer()}
            {shimmer()}
            {shimmer()}
            {shimmer()}
            {shimmer()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
