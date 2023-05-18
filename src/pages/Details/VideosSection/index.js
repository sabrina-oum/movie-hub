import React, { useState } from "react";

import "./style.scss";

import ContentWrapper from "../../../components/ContentWrapper";
import VideoPopup from "../../../components/VideoPopup";
import Img from "../../../components/LazyLoadImage/Img";
import { PlayButton } from "../PlayButton";

const VideosSection = ({ videos, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingShimmer = () => {
    return (
      <div className="shimmer-item">
        <div className="thumb shimmer"></div>
        <div className="row shimmer"></div>
        <div className="row2 shimmer"></div>
      </div>
    );
  };

  return (
    <div className="videos-section">
      <ContentWrapper>
        <div className="section-heading">Official Videos</div>
        {!loading ? (
          <div className="videos">
            {videos?.results?.map((video) => (
              <div
                key={video.id}
                className="video-item"
                onClick={() => {
                  setVideoId(video.key);
                  setShow(true);
                }}
              >
                <div className="video-item__thumb">
                  <Img
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  />
                  <PlayButton />
                </div>
                <div className="video-item__title">{video.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="video-item-shimmer">
            {loadingShimmer()}
            {loadingShimmer()}
            {loadingShimmer()}
            {loadingShimmer()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;
