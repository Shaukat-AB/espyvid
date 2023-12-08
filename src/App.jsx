import Header from "./components/Header";
import Labels from "./components/Labels";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import ErrorPage from "./pages/ErrorPage";
import PlayVideo from "./pages/PlayVideo";
import "./App.css";
import "./assets/media-queries.css";
import { LabelContext } from "./context/LabelContext";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

function App() {

  const [active, setActive] = useState( { label:"All", nav:{ id:0, title:"Home" } });

  const [query, setQuery] = useState("");
  const vidKey = useLocation().hash.replace('#', '') || '';

  const changeLabelActive = (value) => {
    setActive( () => ({ label: value, nav: { id:0, title:"Home" } }) );
  };

  const changeNavActive = (value) => {
    setActive( () => ({ label: "All", nav: value }) );
  };

  const searchQuery = (value = "") => {
    value && setQuery(() => value);
  };

  return (
    <LabelContext.Provider value={[active.label, changeLabelActive]}>
      <Header
        searchQuery={searchQuery}
        current={[active.nav.title, changeNavActive]}
      ></Header>

      {!vidKey && <Labels></Labels>}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              active={active.nav}
              key={active.nav.title + active.label}
              label={active.label}
            />
          }
        />

        <Route path={"/results"} element={<SearchResults query={query} />} />

        <Route path="playVideo" element={<PlayVideo key={vidKey} />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </LabelContext.Provider>
  );
}

export default App;
