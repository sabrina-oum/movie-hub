import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import Banner from "./Banner";
import Cast from "./Cast";
import VideosSection from "./VideosSection";
import Similar from "./Similar";
import Recommendation from "./Recommendation";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <Banner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast cast={credits?.cast} loading={creditsLoading} />
      <VideosSection videos={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
