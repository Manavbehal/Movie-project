import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/home/Home';
import Bookmark from './pages/bookmark/Bookmark';
import Movies from './pages/movies/Movies';
import Search from './pages/search/Search';
import Tvseries from './pages/tvseries/Tvseries';
import './App.scss';
import NavBar from './components/NavBar/NavBar';

const App = () => {
  return (
    <>
      <Router>
        <div className="app">
          <NavBar />
          <div className="content">
            <Routes>
              <Route path="/"   element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/search" element={<Search />} />
              <Route path="/tvseries" element={<Tvseries />} />
              <Route path="/bookmark" element={<Bookmark />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;