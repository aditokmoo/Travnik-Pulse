/* eslint-disable react/prop-types */
import { FaCircleUser } from "react-icons/fa6";
import styles from "./ReviewComponent.module.scss";
import { AiFillStar } from "react-icons/ai";
export default function ReviewComponent({ review, tour }) {
  const usersRating = tour.ratings.find(
    (rating) => rating.user === review.user._id
  );

  const starCount = Array.from({ length: usersRating?.value || 1 }, () => 0);

  return (
    <div className={styles.reviewWrapper}>
      <div className={styles.userRateData}>
        <div className={styles.userData}>
          <FaCircleUser />
          <b>{review.user?.username}</b>
        </div>
        {usersRating && (
          <div className={styles.starWrapper}>
            {starCount.map((star, i) => (
              <AiFillStar key={i} />
            ))}
          </div>
        )}
      </div>
      <p className={styles.reviewContent}>{review.review}</p>
      {review.images.length > 0 && (
        <div className={styles.imagesWrapper}>
          {review.images.map((image) => (
            <img src={`/${image}`} key={image} />
          ))}
        </div>
      )}
    </div>
  );
}
