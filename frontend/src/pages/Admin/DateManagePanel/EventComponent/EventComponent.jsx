/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import styles from "./EventComponent.module.scss";
import { useState } from "react";
import Popup from "./Popup";
export default function EventComponent({ tour }) {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <div
        key={tour._id}
        className={styles.tourWrapper}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 126, 95, 0.5), rgba(254, 180, 123, 0.5)), url(/${tour.coverImg})`,
        }}
      >
        <div className={styles.imgWrapper}>
          <div className={styles.operationWrapper}>
            <button
              onClick={() => navigate(`/app/admin/edit-tour/${tour._id}`)}
            >
              <BiEdit />
            </button>

            <button onClick={() => setIsOpenModal(true)}>
              <BsTrash />
            </button>
          </div>
        </div>

        <h3>{tour.name}</h3>
        <p>{tour.description.slice(0, 20)}...</p>
      </div>

      {isOpenModal && <Popup setIsOpenModal={setIsOpenModal} tour={tour} />}
    </>
  );
}
