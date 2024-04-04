import React, { useState } from 'react';
import css from './ItemMoreInfo.module.css';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as Star } from '../../../images/star.svg';
import Modal from '../../Modal/Modal';
import { AppointmentForm } from '../../AppointmentForm/AppointmentForm';

export const ItemMoreInfo = ({ psychologist }) => {
  const { reviews } = psychologist;
  const [isOpen, setTeamModalOpen] = useState(false);

  const openModal = () => {
    setTeamModalOpen(true);
    document.body.classList.add('body-scroll-lock');
  };

  const closeModal = () => {
    setTeamModalOpen(false);
    document.body.classList.remove('body-scroll-lock');
  };

  return (
    <div>
      <ul className={css.list}>
        {reviews.map(review => (
          <li key={uuidv4()}>
            <div className={css.reviewBox}>
              <p className={css.reviewerLetterName}>{review.reviewer[0]}</p>
              <div className={css.reviewNameRateBox}>
                <p className={css.reviewer}>{review.reviewer}</p>
                <div className={css.reviewRate}>
                  <Star />
                  <p className={css.rating}>{review.rating.toFixed(1)}</p>
                </div>
              </div>
            </div>
            <p className={css.comment}>{review.comment}</p>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={css.appointmentButton}
        onClick={openModal}
      >
        Make an appointment
      </button>
      {isOpen && (
        <Modal onClose={closeModal}>
          <AppointmentForm psychologist={psychologist} onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};
