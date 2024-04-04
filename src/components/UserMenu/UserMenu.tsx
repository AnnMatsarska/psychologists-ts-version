import React from "react";
import { ReactComponent as Avatar } from "../../images/avatar.svg";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";
import css from "./UserMenu.module.css";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/auth/authSlice";
import { resetItems } from "../../redux/favorites/favoriteSlice";

export const UserMenu = () => {
  const { currentUser } = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
        dispatch(resetItems());
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className={css.userMenuWrapper}>
        <div className={css.userWrapper}>
          <Avatar />
          <p className={css.userName}>{currentUser?.name}</p>
        </div>
        <button type="button" onClick={handleLogOut} className={css.logoutBtn}>
          Log Out
        </button>
      </div>
    </>
  );
};
