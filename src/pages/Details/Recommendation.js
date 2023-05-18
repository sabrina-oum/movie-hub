import Carousel from "./../../components/Carousel";

const Recommendation = ({ data, loading, mediaType }) => {
  return (
    <Carousel
      data={data?.results}
      loading={loading}
      endPoint={mediaType}
      title="Recommendations"
    />
  );
};

export default Recommendation;
