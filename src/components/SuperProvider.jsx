import { SettingProvider } from "../context/SettingContext";
import SideBarContext from "../context/SideBarContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import useToggle from "../hooks/useToggle";
import { useLocation } from "react-router-dom";

const SuperProvider = ({ children }) => {
  const playVid = useLocation().pathname.includes("playVideo");
  const [sideBarToggle, sideBarToggler] = useToggle( !playVid && window.innerWidth > 1200);

  useEffect(() => {
    if (window.innerWidth > 1199) {
      let root = document.getElementById("root");
      !playVid && sideBarToggle
        ? root.classList.add("ml")
        : root.classList.remove("ml");
    }
  }, [sideBarToggle, playVid]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 6 * 60 * 60 * 1000, // about 6 hour
        cacheTime: 24 * 60 * 60 * 1000, // about 24 hour
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SettingProvider>
        <SideBarContext.Provider value={[sideBarToggle, sideBarToggler]}>
          {children}
        </SideBarContext.Provider>
      </SettingProvider>
    </QueryClientProvider>
  );
};

export default SuperProvider;
