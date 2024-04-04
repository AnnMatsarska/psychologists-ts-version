import { NavLink, useLocation } from "react-router-dom";
import css from "./Navigation.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";

export const Navigation = () => {
  const user = useSelector(selectUser);
  const listClass = user.currentUser ? css.listLoggedIn : css.list;
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <ul className={listClass}>
      <li>
        <NavLink to="/" className={isActive("/") ? css.active : css.linkItem}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/psychologists"
          className={isActive("/psychologists") ? css.active : css.linkItem}
        >
          Psychologists
        </NavLink>
      </li>
      {user.currentUser && (
        <li>
          <NavLink
            to="/favorites"
            className={isActive("/favorites") ? css.active : css.linkItem}
          >
            Favorites
          </NavLink>
        </li>
      )}
    </ul>
  );
};
