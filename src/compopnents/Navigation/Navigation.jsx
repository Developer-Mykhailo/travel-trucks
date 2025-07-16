import clsx from "clsx";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import Container from "../Container/Container";
import s from "./Navigation.module.scss";

const Navigation = () => {
  return (
    <>
      <header className={s.header}>
        <Container>
          <nav className={s.nav}>
            <Link to="/">
              <img src={logo} alt="Travel Trucks logo" />
            </Link>
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    clsx(s.link, isActive && s.accent)
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/catalog"
                  className={({ isActive }) =>
                    clsx(s.link, isActive && s.accent)
                  }
                >
                  Catalog
                </NavLink>
              </li>
            </ul>
          </nav>
        </Container>
      </header>
    </>
  );
};

export default Navigation;
