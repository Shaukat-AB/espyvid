import { SettingContext } from "../context/SettingContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {formatCount, formatDate, formatDuration,} from "../utils/formatFunctions";

const VideoCard = ({
  vid,
  chnlIcon,
  details = {},
  styleClass = "",
  id = "",
}) => {
  const [settings, changeSettings] = useContext(SettingContext);

  const thumbnail =
    vid?.thumbnails[settings.thumbnail]?.url || vid?.thumbnails.default.url;

  const data = {
    thumbnail: thumbnail,
    viewCount: formatCount(details?.statistics?.viewCount),
    publishedAt: formatDate(vid?.publishedAt),
    channelTitle: vid.channelTitle,
    title: vid.title,
    description: vid.description,
    chnlIcon: chnlIcon?.default.url,
    duration: formatDuration(details?.contentDetails?.duration || "00:00"),
  };

  const navigate = useNavigate();

  const OnVideoClick = () => {
    navigate("/playVideo?vId#" + id);
  };

  return (
    <div className={styleClass ? styleClass : "video-card"}>
      <div
        className="video-thumbnail"
        onClick={OnVideoClick}
        title={data.title}
      >
        {styleClass !== "play-card" && (
          <img src={data.thumbnail} className="vid-img" alt={data.title} />
        )}
        <span className="duration">{data.duration}</span>
      </div>

      {styleClass ? <VideoSearchUI vid={data} /> : <VideoHomeUI vid={data} />}
    </div>
  );
};

const VideoSearchUI = ({ vid }) => {
  const slicedTitle =
    vid.title.length > 50 ? vid.title.slice(0, 50) + " ..." : vid.title;

  return (
    <div className="video-thumbnail-details">
      <div>
        <h2 className="video-title" title={vid.title}>
          {slicedTitle}
        </h2>
        <p className="views small-text">
          {vid.viewCount + " views"} • {vid.publishedAt}
        </p>
      </div>

      <div className="ch-container" title={vid.channelTitle}>
        <img src={vid.chnlIcon} className="ch-img" alt={vid.channelTitle} />
        <p className="ch-title">{vid.channelTitle}</p>
      </div>

      <div className="more-details small-text">
        <p className="more-info-text" title="Video description ">
          {vid.description}
        </p>
      </div>
    </div>
  );
};

const VideoHomeUI = ({ vid }) => {
  const slicedTitle =
    vid.title.length > 50 ? vid.title.slice(0, 50) + " ..." : vid.title;

  return (
    <div className="video-thumbnail-details">
      <div className="ch-container" title={vid.channelTitle}>
        <img src={vid.chnlIcon} className="ch-img" alt={vid.channelTitle} />
      </div>

      <div className="details-col">
        <h2 className="video-title" title={vid.title}>
          {slicedTitle}
        </h2>
        <p className="ch-title small-text">{vid.channelTitle}</p>
        <p className="views small-text">
          {vid.viewCount + " views"} • {vid.publishedAt}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
