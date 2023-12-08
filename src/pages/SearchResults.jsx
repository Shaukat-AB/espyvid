import VideoContents from "../components/VideoContents";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { getSearchUrl } from "../utils/urlGetters";
import { useSearchParams, useLocation } from "react-router-dom";

const SearchResults = ({ query = "" }) => {
  const noParam = useLocation().pathname.includes("playVideo");
  const [param, setParam] = useSearchParams();

  const getResults = async () => {
    let keyWord = query ? query : param.get("value");
    let response = await fetch(getSearchUrl(keyWord));
    if (!response.ok) throw new Error("Network response not ok");
    const data = await response.json();
    !noParam && query && setParam({ value: query });
    return data;
  };

  const {
    data: video,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["Results", query || param.get("value")],
    queryFn: getResults,
  });

  if (isLoading) return <Loading />;

  return (
    <div className="main">
      {!isLoading && (
        <VideoContents
          items={
            noParam ? video?.items.slice(1, video?.items.length) : video?.items
          }
          styleClass="video-card-search"
        ></VideoContents>
      )}
    </div>
  );
};

export default SearchResults;
