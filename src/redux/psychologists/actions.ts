import { setPsychologists } from "./slice";
import { onValue, ref, Unsubscribe } from "firebase/database";
import { db } from "../../firebase/config";
import { Dispatch } from "redux";
import { IPsychologist } from "../../@types/types";

interface FirebaseData {
  psychologists: {
    [id: string]: IPsychologist;
  };
}

export const fetchPsychologists = () => (dispatch: Dispatch) => {
  const unsubscribe: Unsubscribe = onValue(ref(db), (snapshot) => {
    const data: FirebaseData | null = snapshot.val();
    if (data) {
      const psychologistsArray: IPsychologist[] = Object.values(
        data.psychologists
      ).map((psychologistData) => ({
        ...psychologistData,
        id: psychologistData.name,
      }));
      dispatch(setPsychologists(psychologistsArray));
    } else {
      console.error("No data available");
    }
  });

  return () => {
    unsubscribe();
  };
};
