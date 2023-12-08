import VideoContents from "../components/VideoContents";
import Loading from "../components/Loading";
import { SettingContext } from "../context/SettingContext";
import SideBarContext from "../context/SideBarContext";
import { useContext, useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getHomeUrl } from "../utils/urlGetters";

const Home = ({ active = "", label = "" }) => {
  const [settings] = useContext(SettingContext);
  const [navToggle, navToggler] = useContext(SideBarContext);
  const homeRef = useRef(null);
  const regionCode = settings["region-code"] || "pk";
  const catId = isNaN(active.id) ? 0 : active.id || 0;

  const getItems = async (nextPageToken) => {
    let response = await fetch(
      getHomeUrl(nextPageToken, catId, label, regionCode)
    );
    if (!response.ok) throw new Error("Failed to fetch videos at homePage");
    const data = await response.json();
    return data;
  };

  const qId = catId + label + regionCode;

  const {
    data,
    error,
    isLoading,
    isFetching,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["Items", qId],
    queryFn: ({ pageParam = null }) => getItems(pageParam),
    getNextPageParam: (lastPage, allPages) => lastPage?.nextPageToken,
  });

  useEffect(() => {
    window.innerWidth > 699 && navToggler(true);
  }, []);

  if (isLoading) return <Loading />;

  const scrollHandler = () => {
    if (homeRef?.current && !isFetching) {
      let root = homeRef.current;
      const isScrollEnd =
        window.scrollY >= root.scrollHeight - window.innerHeight;
      isScrollEnd && fetchNextPage();
    }
  };

  let scrolling = false;
  window.onscroll = () => (scrolling = true);

  setInterval(() => {
    if (scrolling) {
      scrolling = false;
      scrollHandler();
    }
  }, 500);

  return (
    <main id="home" className="main" ref={homeRef}>
      {isSuccess &&
        data?.pages.map((page, index) => {
          return (
            <VideoContents
              key={qId + "page" + index}
              id={qId + "page" + index}
              items={page?.items}
            >
            </VideoContents>
          );
        })}
    </main>
  );
};

export default Home;
