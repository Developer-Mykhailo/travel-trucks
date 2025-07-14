// import React from 'react'

import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <nav>
        <Link to="/">Logo</Link>

        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/catalog">Catalog</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
