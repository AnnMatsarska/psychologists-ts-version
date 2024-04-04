import css from "./PsychologistItem.module.css";
import { ItemMoreInfo } from "./ItemMoreInfo/ItemMoreInfo";
import { ReactComponent as Star } from "../../images/star.svg";
import { ReactComponent as NormalHeart } from "../../images/normal-heart.svg";
import { ReactComponent as ActiveHeart } from "../../images/hover-heart.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  deleteItem,
  selectFavorites,
} from "../../redux/favorites/favoriteSlice";
import { useEffect, useState } from "react";
import { selectUser } from "../../redux/auth/authSlice";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PsychologistItem = ({ psychologist }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const favorites = useSelector(selectFavorites);
  const user = useSelector(selectUser);
  const { id } = psychologist;

  const isAlreadyFavorite = favorites.find((fav) => fav.id === id);

  useEffect(() => {
    if (isAlreadyFavorite) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [dispatch, isAlreadyFavorite]);

  const handleFavClick = () => {
    if (!user.currentUser) {
      toast.warning("You must be registered to add to favorites!");
      return;
    }
    dispatch(isAlreadyFavorite ? deleteItem(id) : addItem(psychologist));
  };

  const handleReadMoreClick = () => {
    setShowAdditionalInfo(!showAdditionalInfo);
  };

  return (
    <li className={css.item}>
      <div className={css.imgBorder}>
        <img
          className={css.itemImage}
          src={psychologist.avatar_url}
          alt={psychologist.name}
        />
      </div>
      <div style={{ width: "100%" }}>
        <div className={css.headWrapper}>
          <p className={css.itemTitle}>Psychologist</p>
          <ul className={css.listStatWrapper}>
            <li className={css.itemData}>
              <Star />
              Rating: {psychologist.rating}
            </li>
            <li className={css.itemData}>
              Price / 1 hour:
              <span className={css.priceSpan}>
                {" "}
                {psychologist.price_per_hour}$
              </span>
            </li>
            <li className={css.itemData}>
              <button
                className={css.btnHeart}
                type="button"
                onClick={handleFavClick}
              >
                {isFavorite ? (
                  <ActiveHeart className={css.heartIcon} />
                ) : (
                  <NormalHeart className={css.heartIcon} />
                )}
              </button>
            </li>
          </ul>
        </div>
        <h2 className={css.itemName}>{psychologist.name}</h2>
        <div className={css.infoWrapper}>
          <p className={css.itemMainData}>
            <span className={css.spanItem}>Experience: </span>
            {psychologist.experience}
          </p>
          <p className={css.itemMainData}>
            <span className={css.spanItem}>License: </span>
            {psychologist.license}
          </p>
          <p className={css.itemMainData}>
            <span className={css.spanItem}>Specialization: </span>
            {psychologist.specialization}
          </p>
          <p className={css.itemMainData}>
            <span className={css.spanItem}>Initial_consultation: </span>
            {psychologist.initial_consultation}
          </p>
        </div>
        <p className={css.itemAbout}>{psychologist.about}</p>
        {!showAdditionalInfo && (
          <button className={css.readMoreBtn} onClick={handleReadMoreClick}>
            Read More
          </button>
        )}
        {showAdditionalInfo && <ItemMoreInfo psychologist={psychologist} />}
        {showAdditionalInfo && (
          <button className={css.readMoreBtn} onClick={handleReadMoreClick}>
            Read Less
          </button>
        )}
      </div>
    </li>
  );
};
