import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SharedLayout from "./Componets/SharedLayout/SharedLayout";
import Home from "./Pages/Home/Home";
import Search from "./Pages/Search/Search";
import TVShows from "./Pages/TVShows/TVShows";
import Movies from "./Pages/Movies/Movies";
import Latest from "./Pages/Latest/Latest";
import MyList from "./Pages/MyList/MyList";
import BrowseLanguages from "./Pages/BrowseLanguages/BrowseLanguages";
import NotFound from "./Pages/NotFound/NotFound"; // optional 404 page
import "@fontsource/bebas-neue";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="tv-shows" element={<TVShows />} />
        <Route path="movies" element={<Movies />} />
        <Route path="latest" element={<Latest />} />
        <Route path="my-list" element={<MyList />} />
        <Route path="browse-languages" element={<BrowseLanguages />} />
        <Route path="*" element={<NotFound />} /> {/* 404 page */}
      </Route>
    </Routes>
  );
}

export default App;
