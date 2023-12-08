import VideoCard from "./VideoCard";
import { useQuery } from "@tanstack/react-query";
import { getChnlUrl, getVidUrl } from "../utils/urlGetters";
import { useState } from "react";

const VideoContents = ({ items = [], styleClass = "", id = 0 }) => {
  const [stat, setStat] = useState(null);
  const [chnlItems, setChnlItems] = useState(null);
  const vidIds = items.map((item) => item.id.videoId || item.id).join("%2C");
  const chnlIds = items.map((item) => item.snippet.channelId).join("%2C");

  const getVidData = async () => {
    const res = await fetch(getVidUrl(vidIds));
    if (!res.ok) throw new Error("Network response not ok");
    const data = await res.json();
    setStat((stat) => data.items);
    return data;
  };

  const getChnlData = async () => {
    const res = await fetch(getChnlUrl(chnlIds));
    if (!res.ok) throw new Error("Network response not ok");
    const data = await res.json();
    setChnlItems((chnlItems) => data.items);
    return data;
  };

  const {
    data: vidData,
    error: vidErr,
    isLoading: isVidLoading,
  } = useQuery({ queryKey: ["VidData", id], queryFn: getVidData });

  const {
    data: chnlData,
    error: chnlErr,
    isLoading: isChnlLoading,
  } = useQuery({ queryKey: ["ChnlData", id], queryFn: getChnlData });

  const vidRow =
    stat &&
    chnlItems &&
    items.map((item) => {
      let id = item.id.videoId || item.id;
      let chnlId = item.snippet.channelId;
      let details = stat.filter((e) => e.id === id)[0];
      let chnlIcon = chnlItems.filter((e) => e.id === chnlId)[0]?.snippet.thumbnails;

      return (
        <VideoCard
          key={item.id.videoId || item.id}
          vid={item.snippet}
          styleClass={styleClass}
          chnlIcon={chnlIcon}
          details={details}
          id={id}
        ></VideoCard>
      );
    });

  return <div className="video-contents">{vidRow}</div>;
};

export default VideoContents;
