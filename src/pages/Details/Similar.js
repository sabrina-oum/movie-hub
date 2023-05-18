import Carousel from "./../../components/Carousel";

const Similar = ({ data, loading, mediaType }) => {
  const title = mediaType === "movie" ? "Similar Movies" : "Similar TV Shows";

  return (
    <Carousel
      data={data?.results}
      loading={loading}
      endPoint={mediaType}
      title={title}
    />
  );
};

export default Similar;
