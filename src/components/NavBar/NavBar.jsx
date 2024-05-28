import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';
import {
    MdMovie, MdBookmarks, MdTv, MdSearch, MdHome,
} from 'react-icons/md';

function NavBar() {
  return (
    <nav className="sidebar">
      <div className="logo">
        <p>Movies</p>
      </div>
      <div className="linkcontainer">
        <NavLink exact to="/" activeClassName="active">
          <span className="link_icon"><MdHome /></span>
          <span className="link_text">Home</span>
        </NavLink>
        <NavLink to="/movies" activeClassName="active">
          <span className="link_icon"><MdMovie /></span>
          <span className="link_text">Movies</span>
        </NavLink>
        <NavLink to="/search" activeClassName="active">
          <span className="link_icon"><MdSearch /></span>
          <span className="link_text">Search</span>
        </NavLink>
        <NavLink to="/tvseries" activeClassName="active">
          <span className="link_icon"><MdTv /></span>
          <span className="link_text">TV Series</span>
        </NavLink>
        
        <NavLink to="/bookmark" activeClassName="active">
          <span className="link_icon"><MdBookmarks /></span>
          <span className="link_text">Bookmarks</span>
        </NavLink>
        </div>
    </nav>
  );
}

export default NavBar;
