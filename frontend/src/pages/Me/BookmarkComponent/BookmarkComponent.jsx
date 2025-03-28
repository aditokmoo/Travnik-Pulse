/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./BookmarkComponent.module.scss";
import { ImBookmark } from "react-icons/im";
export default function BookmarkComponent({ tour }) {
  const navigate = useNavigate();
  return (
    <div className={styles.bookmarkWrapper}>
      <div
        className={styles.relativeWrapper}
        onClick={() => navigate(`/app/tour/${tour._id}`)}
      >
        <img src={`/${tour.coverImg}`} alt="cover image " />
        <ImBookmark />
      </div>
      <span>{tour.name}</span>
    </div>
  );
}
