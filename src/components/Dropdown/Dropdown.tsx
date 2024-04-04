import React, {
  FC,
  useState,
  useRef,
  useEffect,
  ReactNode,
  ReactElement,
} from "react";
import { ReactComponent as IconDropdown } from "../../images/chevron-down.svg";
import css from "./Dropdown.module.css";

interface DropdownProps {
  defaultOption: string;
  selectedOption: string;
  onSelect: (option: string) => void;
  children: ReactNode;
}

export const Dropdown: FC<DropdownProps> = ({
  defaultOption,
  selectedOption,
  onSelect,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    setIsOpen(false);
    onSelect(option);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const closeDropdownEsc = ({ code }: KeyboardEvent) => {
      if (code === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", closeDropdownEsc);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", closeDropdownEsc);
    };
  }, []);

  return (
    <div className={css.dropdown} ref={dropdownRef}>
      <button className={css.dropBtn} onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}
        <IconDropdown className={isOpen ? css.rotatedIcon : " "} />
      </button>

      {isOpen && (
        <ul className={css.list}>
          {React.Children.map(children, (child) => (
            <li
              key={(child as ReactElement).props["data-value"]}
              onClick={() =>
                handleOptionClick((child as ReactElement).props["data-value"])
              }
            >
              {child}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
