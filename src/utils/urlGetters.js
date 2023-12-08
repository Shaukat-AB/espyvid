import { base, apiKey, publishedAfter } from "./constants";

const getChnlUrl = (chnlId) => {
  return base + `/channels?part=snippet&id=${chnlId}&key=${apiKey}`;
};

const getVidUrl = (vidId) => {
  return (
    base +
    `/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${vidId}&key=${apiKey}`
  );
};

const getSearchUrl = (query) => {
  return (
    base +
    `/search?part=snippet&maxResults=15&q=${query}&regionCode=pk&type=video&publishedAfter=${publishedAfter}&key=${apiKey}`
  );
};

const getHomeUrl = (pageParam, catId = 0, label = "All", regionCode = "pk") => {
  if (catId == 0 && label === "All")
    return `${base}/videos?part=snippet&chart=mostPopular&maxResults=9&pageToken=${
      pageParam ?? ""
    }&regionCode=${regionCode}&key=${apiKey}`;
  else if (label && label != "All")
    return `${base}/search?part=snippet&maxResults=9&q=${label}&pageToken=${
      pageParam ?? ""
    }&regionCode=${regionCode}&type=video&publishedAfter=${publishedAfter}&key=${apiKey}`;

  return `${base}/videos?part=snippet&chart=mostPopular&maxResults=9&pageToken=${
    pageParam ?? ""
  }&regionCode=${regionCode}&videoCategoryId=${catId}&key=${apiKey}`;
};

export { getChnlUrl, getVidUrl, getSearchUrl, getHomeUrl };
