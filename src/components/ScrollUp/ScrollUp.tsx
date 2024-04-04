import React, { useEffect, useState } from "react";
import css from "./ScrollUp.module.css";
import { ReactComponent as ScrollIcon } from "../../images/chevron-down.svg";

export const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 1200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <div className={css.scrollUp} onClick={scrollToTop}>
          <ScrollIcon />
        </div>
      )}
    </div>
  );
};
