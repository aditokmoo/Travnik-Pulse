/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./EventComponent.module.scss";
export default function EventComponent({ tour }) {
  const navigate = useNavigate();
  return (
    <div
      key={tour._id}
      className={styles.tourWrapper}
      onClick={() => navigate(`/app/tour/${tour._id}`)}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 126, 95, 0.5), rgba(254, 180, 123, 0.5)), url(/${tour.coverImg})`,
      }}
    >
      <div className={styles.overlay}>
        <h3>{tour.name}</h3>
        <p>{tour.description.slice(0, 20)}...</p>
      </div>
    </div>
  );
}
