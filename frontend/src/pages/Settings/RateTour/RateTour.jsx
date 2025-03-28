import { useEffect, useState } from "react";
import styles from "./RateTour.module.scss";
import { AiFillStar } from "react-icons/ai";
import { useGetSingleTour, useRateTour } from "../../../hooks/useTours";
import Spinner from "../../../components/Spinner/Spinner";
import { useGetUser } from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
export default function RateTour() {
  const { data: tour, isLoading: isLoadingTour } = useGetSingleTour();
  const { data: user, isLoading: isLoadingUser } = useGetUser();
  const { mutate: rateMutation, isLoading: rateIsLoading } = useRateTour();

  const [rating, setRating] = useState(() => {
    const myRating = tour.ratings.find((rating) => rating.user === user._id);
    return myRating ? +myRating.value : 0;
  });
  const [t] = useTranslation('main');
  const hasAlreadyRated = tour.ratings.find(
    (rating) => rating.user === user._id
  )
    ? true
    : false;

  useEffect(() => {
    if (rating === 0 || hasAlreadyRated) return;
    rateMutation(rating);
  }, [rating]);

  if (isLoadingTour || isLoadingUser || rateIsLoading) return <Spinner />;

  return (
    <div className={styles.fillerFlex}>
      <span>{t("main_page_tour_details.rate_tour")}</span>
      <div className={styles.stars}>
        <AiFillStar
          className={
            rating > 0 ? `${styles.star} ${styles.active}` : styles.star
          }
          onClick={() => {
            if (hasAlreadyRated) return;
            setRating(1);
          }}
        />
        <AiFillStar
          className={
            rating > 1 ? `${styles.star} ${styles.active}` : styles.star
          }
          onClick={() => {
            if (hasAlreadyRated) return;
            setRating(2);
          }}
        />
        <AiFillStar
          className={
            rating > 2 ? `${styles.star} ${styles.active}` : styles.star
          }
          onClick={() => {
            if (hasAlreadyRated) return;
            setRating(3);
          }}
        />
        <AiFillStar
          className={
            rating > 3 ? `${styles.star} ${styles.active}` : styles.star
          }
          onClick={() => {
            if (hasAlreadyRated) return;
            setRating(4);
          }}
        />
        <AiFillStar
          className={
            rating > 4 ? `${styles.star} ${styles.active}` : styles.star
          }
          onClick={() => {
            if (hasAlreadyRated) return;
            setRating(5);
          }}
        />
      </div>{" "}
    </div>
  );
}
