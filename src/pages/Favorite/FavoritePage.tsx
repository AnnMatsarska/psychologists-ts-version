import { FavoritesList } from "../../components/FavouritesList/FavoritesList";
import { Filter } from "../../components/Filter/Filter";

import css from "./FavoritePage.module.css";
import { ScrollUp } from "../../components/ScrollUp/ScrollUp";

const FavoritePage = () => {
  return (
    <section className={css.section}>
      <div className="container">
        <Filter />
        <FavoritesList />
        <ScrollUp />
      </div>
    </section>
  );
};

export default FavoritePage;
