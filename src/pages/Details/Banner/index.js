import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/Genres";
import CircleRating from "../../../components/CircleRating";
import Img from "../../../components/LazyLoadImage/Img";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayButton } from "../PlayButton";
import VideoPopup from "../../../components/VideoPopup";
import { useState } from "react";

const Banner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((genre) => genre.id);

  const directors = crew?.filter((f) => f.job === "Director");
  const writers = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="banner">
      {loading === false ? (
        <div>
          <div className="banner__backdrop-img">
            <Img src={`${url.backdrop}/${data?.backdrop_path}`} />
          </div>
          <div className="banner__overlay"></div>
          <ContentWrapper>
            <div className="banner__content">
              <div className="banner__left-content">
                {data.poster_path ? (
                  <Img
                    className="posterImg"
                    src={url.backdrop + data.poster_path}
                  />
                ) : (
                  <Img className="posterImg" src={PosterFallback} />
                )}
              </div>
              <div className="banner__right-content">
                <div className="banner__title">
                  {`${data.name || data.title} (${dayjs(
                    data?.release_date
                  ).format("YYYY")})`}
                </div>
                <div className="banner__subtitle">{data.tagline}</div>

                <Genres data={_genres} />

                <div className="row">
                  <CircleRating rating={data.vote_average.toFixed(1)} />
                  <div
                    className="playbtn"
                    onClick={() => {
                      setShow(true);
                      setVideoId(video.key);
                    }}
                  >
                    <PlayButton />
                    <span className="text">Watch Trailer</span>
                  </div>
                </div>

                <div className="banner__overview">
                  <div className="heading">Overview</div>
                  <div className="description">{data.overview}</div>
                </div>

                <div className="info">
                  {data.status && (
                    <div className="infoItem">
                      <span className="text bold">Status: </span>
                      <span className="text">{data.status}</span>
                    </div>
                  )}
                  {data.release_date && (
                    <div className="infoItem">
                      <span className="text bold">Release Date: </span>
                      <span className="text">
                        {dayjs(data.release_date).format("MMM D, YYYY")}
                      </span>
                    </div>
                  )}
                  {data.runtime && (
                    <div className="infoItem">
                      <span className="text bold">Runtime: </span>
                      <span className="text">
                        {toHoursAndMinutes(data.runtime)}
                      </span>
                    </div>
                  )}
                </div>

                {directors?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Director: </span>
                    <span className="text">
                      {directors?.map((d, i) => (
                        <span key={i}>
                          {d.name}
                          {directors.length - 1 !== i && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}

                {writers?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Writer: </span>
                    <span className="text">
                      {writers?.map((d, i) => (
                        <span key={i}>
                          {d.name}
                          {writers.length - 1 !== i && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}

                {data?.created_by?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Creator: </span>
                    <span className="text">
                      {data?.created_by?.map((d, i) => (
                        <span key={i}>
                          {d.name}
                          {data?.created_by.length - 1 !== i && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <VideoPopup
              show={show}
              setShow={setShow}
              videoId={videoId}
              setVideoId={setVideoId}
            />
          </ContentWrapper>
        </div>
      ) : (
        <div className="banner-shimmer">
          <ContentWrapper>
            <div className="left shimmer"></div>
            <div className="right">
              <div className="row shimmer"></div>
              <div className="row shimmer"></div>
              <div className="row shimmer"></div>
              <div className="row shimmer"></div>
              <div className="row shimmer"></div>
              <div className="row shimmer"></div>
              <div className="row shimmer"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default Banner;
