import ReturnButton from "../../components/ReturnButton/ReturnButton";
import { useGetUnapprovedReviews } from "../../hooks/useReview";
import ReviewComponent from "./ReviewComponent";
import styles from "./AdminReviews.module.scss";
import Spinner from "../../components/Spinner/Spinner";
import DesktopNav from "../../components/DesktopNav/DesktopNav";
import MobileNav from "../../components/MobileNav/MobileNav";
import { useTranslation } from "react-i18next";

export default function AdminReviews() {
  const { data: reviews, isLoading } = useGetUnapprovedReviews();
  const [t] = useTranslation('profile');

  if (isLoading) return <Spinner />;

  return (
    <>
      <DesktopNav />

      <ReturnButton />
      <section className={styles.sectionBody}>
        <h2>{t("profile_reviews_page.h1_text")}</h2>
        <p className={styles.sectionParagraph}>
        {t("profile_reviews_page.p_text")}
        </p>

        {reviews.length === 0 && (
          <span className={styles.noReviews}>
            {t("profile_reviews_page.no_reviews")}
          </span>
        )}
        <div className={styles.reviewsWrapper}>
          {reviews.map((review, i) => (
            <ReviewComponent review={review} i={i + 1} key={review._id} />
          ))}
        </div>
      </section>
      <MobileNav />
    </>
  );
}
