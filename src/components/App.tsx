import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { SharedLayout } from "./SharedLayout/SharedLayout";
import { PrivateRoute } from "../pages/PrivateRoute";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/auth/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

const HomePage = lazy(() => import("../pages/Home/HomePage"));
const PsychologistPage = lazy(
  () => import("../pages/Psychologist/PsychologistPage")
);
const FavoritePage = lazy(() => import("../pages/Favorite/FavoritePage"));

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            id: user.uid,
            email: user.email ?? "",
            name: user.displayName ?? "",
          })
        );
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="psychologists" element={<PsychologistPage />} />
        <Route
          path="favorites"
          element={
            <PrivateRoute>
              <FavoritePage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
};
