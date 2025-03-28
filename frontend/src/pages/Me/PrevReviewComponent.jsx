/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./Me.module.scss";
import { useTranslation } from "react-i18next";

export default function PrevReviewComponent({ review }) {
  const [t] = useTranslation('profile');
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/app/tour/${review.tour._id}`)}>
      <img
        src={`/${review.tour.coverImg}`}
        alt="cover image"
      />
      <span>{review.tour.name}</span>
      <span
        className={`${styles.reviewStatus} ${
          review.approved ? styles.approved : ""
        }`}
      >
        {review.approved ? t("client_home.approved") : t("client_home.under_review")}
      </span>
    </div>
  );
}
