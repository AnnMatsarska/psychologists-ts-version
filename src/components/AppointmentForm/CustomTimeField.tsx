import React, { useState } from "react";
import css from "./AppointmentForm.module.css";
import { generateTimeOptions } from "../../services/timeOptions";
import { ReactComponent as Clock } from "../../images/clock.svg";
import { useFormikContext } from "formik";

interface CustomTimeFieldProps {
  field: {
    name: string;
  };
}

export const CustomTimeField: React.FC<CustomTimeFieldProps> = ({ field }) => {
  const { setFieldValue } = useFormikContext();
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const timeOptions = generateTimeOptions();

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setFieldValue(field.name, time);
    setShowTimeDropdown(false);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    return { hours, minutes };
  };

  return (
    <>
      <div
        className={css.timeDropdownHeader}
        onClick={() => setShowTimeDropdown(!showTimeDropdown)}
        role="button"
      >
        {selectedTime ? (
          <div>
            <span className={css.time}>{formatTime(selectedTime).hours}</span>:
            <span className={css.time}>{formatTime(selectedTime).minutes}</span>
          </div>
        ) : (
          <span className={css.timeSpan}>00 : 00</span>
        )}
        <Clock />
      </div>
      {showTimeDropdown && (
        <>
          <div className={css.timeDropdown}>
            <p style={{ marginBottom: "16px" }}>Meeting time</p>
            <ul className={css.timeDropdownList}>
              {timeOptions.map((time) => (
                <li
                  key={time}
                  className={css.timeOption}
                  onClick={() => handleTimeSelect(time)}
                >
                  <span className={css.time}>{formatTime(time).hours}</span>:
                  <span className={css.time}>{formatTime(time).minutes}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default CustomTimeField;
