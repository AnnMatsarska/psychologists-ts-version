import { IPsychologist } from "../@types/types";

export const applyFilter = (
  psychologists: IPsychologist[],
  filter: string
): IPsychologist[] => {
  switch (filter) {
    case "A to Z":
      return psychologists.slice().sort((a, b) => a.name.localeCompare(b.name));
    case "Z to A":
      return psychologists.slice().sort((a, b) => b.name.localeCompare(a.name));
    case "Less than 10$":
      return psychologists.filter(
        (psychologist) => psychologist.price_per_hour < 10
      );
    case "Greater than 10$":
      return psychologists.filter(
        (psychologist) => psychologist.price_per_hour > 10
      );
    case "Popular":
      return psychologists.slice().sort((a, b) => b.rating - a.rating);
    case "Not popular":
      return psychologists.slice().sort((a, b) => a.rating - b.rating);
    default:
      return psychologists;
  }
};
