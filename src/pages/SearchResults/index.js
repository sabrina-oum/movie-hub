import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";
import { fetchDataFromApi } from "./../../utils/api";
import Spinner from "../../components/Spinner";
import ContentWrapper from "./../../components/ContentWrapper";
import MovieCard from "./../../components/MovieCard";

const SearchResults = () => {
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [data, setData] = useState(null);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prevState) => prevState + 1);
        setLoading(false);
      }
    );
  };

  const fetchNexPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prevState) => prevState + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="search-results">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="page-title">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="search-results__content"
                dataLength={data?.results?.length || []}
                next={fetchNexPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item) => {
                  if (item.media_type === "person") return null;

                  return (
                    <MovieCard key={item.id} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="results-not-found">Sorry, results not found</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResults;
