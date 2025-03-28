/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./ReviewComponent.module.scss";
import { useTranslation } from "react-i18next";

export default function ReviewComponent({ i, review }) {
  const [t] = useTranslation('profile');
  const navigate = useNavigate();

  return (
    <div
      className={styles.reviewItem}
      onClick={() => navigate(`/app/admin/reviews/${review._id}`)}
    >
      <div className={styles.index}>{i}</div>
      <p>
        <b>{review.user.username} </b> {t("profile_reviews_page.left_a_review_message")} "
        {review?.tour?.name}"
      </p>
    </div>
  );
}
