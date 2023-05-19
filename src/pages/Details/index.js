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
  const { data: similar, loading: similarLoading } = useFetch(
    `/${mediaType}/${id}/similar`
  );
  const { data: recommendations, loading: recommendationsLoading } = useFetch(
    `/${mediaType}/${id}/recommendations`
  );

  return (
    <div>
      <Banner video={data?.results?.[0]} crew={credits?.crew} />
      {credits?.cast?.length > 0 && (
        <Cast cast={credits?.cast} loading={creditsLoading} />
      )}

      {data?.results?.length > 0 && (
        <VideosSection videos={data} loading={loading} />
      )}
      {similar?.results?.length > 0 && (
        <Similar
          data={similar}
          loading={similarLoading}
          mediaType={mediaType}
        />
      )}
      {recommendations?.results?.length > 0 && (
        <Recommendation
          data={recommendations}
          loading={recommendationsLoading}
          mediaType={mediaType}
        />
      )}
    </div>
  );
};

export default Details;
