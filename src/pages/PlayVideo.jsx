import SearchResults from "./SearchResults";
import Labels from "../components/Labels";
import Loading from "../components/Loading";
import SideBarContext from "../context/SideBarContext";
import { useState, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVidUrl, getChnlUrl } from "../utils/urlGetters";
import { useLocation, useNavigate } from "react-router-dom";
import { BiLike, BiDislike, BiShare } from "react-icons/bi";
import { formatCount, formatDate } from "../utils/formatFunctions";

const PlayVideo = () => {
  const id = useLocation().search.replace("?v=", "");
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [navToggle, navToggler] = useContext(SideBarContext);

  const getDetails = async () => {
    const response = await fetch(getVidUrl(id));
    if (!response.ok) throw new Error("Failed to fetch video to play ");
    const data = await response.json();
    if (!data?.items[0]) navigate("*");
    setVideo((video) => data.items[0]);
    return data;
  };

  const getChnlData = async () => {
    const res = await fetch(getChnlUrl(video?.snippet.channelId));
    if (!res.ok) throw new Error("Network response not ok");
    const data = await res.json();
    return data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["playVideo", id],
    queryFn: getDetails,
  });

  const {
    data: chnlData,
    error: chnlErr,
    isLoading: isChnlLoading,
  } = useQuery({
    queryKey: ["chnlData", video?.snippet.channelId],
    queryFn: getChnlData,
  });

  useEffect(() => {
    navToggler(false);
  }, []);

  if (isLoading || isChnlLoading) return <Loading />;

  return (
    <>
      <div className="main">
        <div className="play-contents">
          {!isLoading && !isChnlLoading && (
            <VideoDetails
              id={id}
              vid={video?.snippet}
              details={video?.statistics}
              chnlIcon={chnlData?.items[0]?.snippet?.thumbnails}
            />
          )}

          <div className="vid-suggestions">
            <Labels />
            {!isLoading && !isChnlLoading && (
              <SearchResults query={video?.snippet?.title} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const VideoDetails = ({ id, vid, chnlIcon, details = {} }) => {
  const data = {
    viewCount: formatCount(details?.viewCount),
    likeCount: formatCount(details?.likeCount),
    publishedAt: formatDate(vid?.publishedAt),
    channelTitle: vid?.channelTitle,
    title: vid?.title,
    description: vid?.description,
    chnlIcon: chnlIcon?.default.url,
  };

  return (
    <div className="play-card">
      <div className="video-thumbnail">
        <iframe
          className="vid-iframe"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0`}
          title={data.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;  web-share"
          allowFullScreen
        ></iframe>
      </div>

      <PlayVideoUI vid={data} />
    </div>
  );
};

const PlayVideoUI = ({ vid }) => {
  return (
    <div className="video-thumbnail-details">
      <h2 className="video-title" title={vid.title}>
        {vid.title}
      </h2>

      <div className="ch-container" title={vid.channelTitle}>
        <img src={vid.chnlIcon} className="ch-img" alt={vid.channelTitle} />
        <p className="ch-title">{vid.channelTitle}</p>
        <button className="btn-2 btn-subscribe">Subscribe</button>

        <div className="review">
          <span className="btn-2">
            <BiLike className="icon" /> {vid.likeCount}
            <BiDislike className="icon" />
          </span>
          <span className="btn-2">
            <BiShare className="icon" /> share
          </span>
        </div>
      </div>

      <div className="more-details">
        <p className="views">
          {vid.viewCount + " views"} • {vid.publishedAt}
        </p>
        <p className="more-info-text" title="Video description ">
          {vid.description}
        </p>
      </div>
    </div>
  );
};

export default PlayVideo;
