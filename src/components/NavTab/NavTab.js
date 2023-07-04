// import React from "react";
// function NavTab() {
//   return <section></section>;
// }
// export default NavTab;
import "./NavTab.css";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function NavTab() {
  const { pathname } = useLocation();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleMenuOpening = () => setIsMenuOpened(true);
  const handleMenuClosing = () => setIsMenuOpened(false);

  return (
    <>
      <div className="navtab">
        <div className="navtab__hamburger-overlay" onClick={handleMenuOpening}>
          <div className={"navtab__hamburger"} />
        </div>

        <section className="navtab__menu">
          <ul className="navtab__menu-list">
            <li className="navtab__menu-list-item">
              <NavLink
                className={`navtab__menu-link  ${
                  pathname === "/movies" && "navtab__menu-link_active"
                }`}
                activeclassname="navtab__menu-link_active"
                onClick={handleMenuClosing}
                to="/movies"
              >
                Фильмы
              </NavLink>
            </li>
            <li className="navtab__menu-list-item">
              <NavLink
                className={`navtab__menu-link  ${
                  pathname === "/saved-movies" && "navtab__menu-link_active"
                }`}
                activeclassname="navtab__menu-link_active"
                onClick={handleMenuClosing}
                to="/saved-movies"
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <div className="navtab__menu-account">
            <NavLink
              className={`navtab__menu-account-link  ${
                pathname === "/profile" && "navtab__menu-account-link_active"
              }`}
              activeclassname="navtab__menu-account-link_active"
              onClick={handleMenuClosing}
              to="/profile"
            >
              Аккаунт
            </NavLink>
          </div>
        </section>
      </div>

      {isMenuOpened && (
        <section className="drop-down-menu">
          <div className="drop-down-menu__container">
            <button
              className="drop-down-menu-close-btn"
              type="button"
              onClick={handleMenuClosing}
            ></button>
            <ul className="navtab__menu-list">
              <li className="navtab__menu-list-item">
                <NavLink
                  className={`navtab__menu-link ${
                    pathname === "/" && "navtab__menu-link_active"
                  }`}
                  activeclassname="navtab__menu-link_active"
                  onClick={handleMenuClosing}
                  to="/"
                >
                  Главная
                </NavLink>
              </li>
              <li className="navtab__menu-list-item">
                <NavLink
                  className={`navtab__menu-link ${
                    pathname === "/movies" && "navtab__menu-link_active"
                  }`}
                  activeclassname="navtab__menu-link_active"
                  onClick={handleMenuClosing}
                  to="/movies"
                >
                  Фильмы
                </NavLink>
              </li>
              <li className="navtab__menu-list-item">
                <NavLink
                  className={`navtab__menu-link ${
                    pathname === "/saved-movies" && "navtab__menu-link_active"
                  }`}
                  activeclassname="navtab__menu-link_active"
                  onClick={handleMenuClosing}
                  to="/saved-movies"
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
            </ul>
            <div className="navtab__menu-account">
              <NavLink
                className={`navtab__menu-account-link ${
                  pathname === "/profile" && "navtab__menu-account-link_active"
                }`}
                activeclassname="navtab__menu-account-link_active"
                onClick={handleMenuClosing}
                to="/profile"
              >
                Аккаунт
              </NavLink>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default NavTab;
