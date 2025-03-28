/* eslint-disable react/prop-types */
import styles from "./RatedTour.module.scss";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
export default function RatedTour({ ratedTour }) {
  const starsArr = Array.from({ length: ratedTour.value }, () => 0);
  const navigate = useNavigate();
  return (
    <div
      className={styles.ratedTourWrapper}
      onClick={() => navigate(`/app/tour/${ratedTour.tour?._id}`)}
    >
      <div className={styles.imgWrapper}>
        <img src={`/${ratedTour.tour?.coverImg}`} />
        <div className={styles.starWrapper}>
          {starsArr.map((star, i) => (
            <AiFillStar key={i} />
          ))}
        </div>
      </div>
      <span>{ratedTour.tour?.name}</span>
    </div>
  );
}
