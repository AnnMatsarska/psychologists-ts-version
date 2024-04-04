import css from "./FavoritesList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  nextPage,
  selectCurrentPage,
  selectFilter,
  selectItemsPerPage,
} from "../../redux/psychologists/slice";
import { PsychologistItem } from "../PsycologistItem/PsychologistItem";
import { applyFilter } from "../../services/applyFilter";
import { selectFavorites } from "../../redux/favorites/favoriteSlice";
import { Link } from "react-router-dom";

export const FavoritesList = () => {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const itemsPerPage = useSelector(selectItemsPerPage);
  const filter = useSelector(selectFilter);

  const filteredPsychologists = applyFilter(favorites, filter);
  const displayPsychologists = filteredPsychologists.slice(
    0,
    currentPage * itemsPerPage
  );

  const hasFavorites = favorites.length !== 0;
  const hasFilteredPsychologists = filteredPsychologists.length !== 0;
  const hasDisplayedPsychologists = displayPsychologists.length !== 0;
  const shouldDisplayNoMatchesMessage =
    !hasDisplayedPsychologists && hasFavorites && !hasFilteredPsychologists;
  const itemsNeedToBeDisplayed =
    displayPsychologists.length < favorites.length && hasFilteredPsychologists;

  const handleLoadMore = () => {
    dispatch(nextPage());
  };

  return (
    <>
      {shouldDisplayNoMatchesMessage && (
        <div className={css.emptyWrapper}>
          <p>No matches with the current filter.</p>
        </div>
      )}
      {!hasFavorites && (
        <div className={css.emptyWrapper}>
          <p>Your list of favorite psychologists is empty.</p>
          <p>
            <Link to="/psychologists" className={css.link}>
              Explore our psychologists
            </Link>{" "}
            to find someone you'd like to add.
          </p>
        </div>
      )}
      {hasDisplayedPsychologists && (
        <ul className={css.list}>
          {displayPsychologists.map((psychologist) => (
            <PsychologistItem
              key={psychologist.id}
              psychologist={psychologist}
            />
          ))}
        </ul>
      )}
      {itemsNeedToBeDisplayed && (
        <button onClick={handleLoadMore} className={css.loadMoreBtn}>
          Load More
        </button>
      )}
    </>
  );
};
