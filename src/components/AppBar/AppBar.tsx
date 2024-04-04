import { Navigation } from "../Navigation/Navigation";
import css from "./AppBar.module.css";
import { UserAuth } from "../UserAuth/UserAuth";
import { NavLink } from "react-router-dom";
import { UserMenu } from "../UserMenu/UserMenu";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";

export const AppBar = () => {
  const user = useSelector(selectUser);

  return (
    <header className={css.header}>
      <div className="container">
        <nav className={css.navWrapper}>
          <NavLink to="/" className={css.logoLink}>
            <p>
              <span className={css.logoSpan}>psychologists.</span>services
            </p>
          </NavLink>
          <Navigation />

          {user.currentUser !== null ? <UserMenu /> : <UserAuth />}
        </nav>
      </div>
    </header>
  );
};
