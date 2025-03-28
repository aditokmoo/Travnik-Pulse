import { Link, Navigate } from "react-router-dom";
import { useGetUser } from "../../hooks/useAuth";
import styles from "./Me.module.scss";
import PrevReviewComponent from "./PrevReviewComponent";
import { RiAdminLine } from "react-icons/ri";
import RatedTour from "./RatedTour";
import MobileNav from "../../components/MobileNav/MobileNav";
import Navbar from "../../components/Navbar/Navbar";
import BookmarkComponent from "./BookmarkComponent/BookmarkComponent";
import DesktopNav from "../../components/DesktopNav/DesktopNav";
import { useTranslation } from "react-i18next";
export default function Me() {
  const [t] = useTranslation('profile');
  const { data: user, isLoading } = useGetUser();
  if (isLoading) return <h1>LOADING</h1>;

  if (!user || user === "Unauthorized" || !user.role)
    return <Navigate to="/app/login" />;

  if (user.role === "admin") return <Navigate to="/app/admin" />;

  return (
    <>
      <DesktopNav />
      <section className={styles.sectionBody}>
        <div className={styles.container}>
          <Navbar />
          <span className={styles.welcomMessage}>
            {t("client_home.hi_text")} <b>{user.username}</b>, {t("client_home.welcome_back_text")}
          </span>

          {user.role === "admin" && (
            <Link to="/app/admin" className={styles.adminLink}>
              <RiAdminLine />
              Admin Panel
            </Link>
          )}

          {user.bookmarkedTours.length > 0 && (
            <div className={styles.bookmarksWrapper}>
              <span className={styles.spanSub}>{t("client_home.bookmarked_text")}</span>
              <div className={styles.bookmarksGrid}>
                {user.bookmarkedTours.map((tour) => (
                  <BookmarkComponent tour={tour} key={tour._id} />
                ))}
              </div>
            </div>
          )}

          {user.reviewedTours.length > 0 && (
            <div className={styles.ReviewPanel}>
              <span className={styles.spanSub}>
              {t("client_home.h1_review_message")}
              </span>
              <div className={styles.reviewsWrapper}>
                {user.reviewedTours.map((review) => {
                  return (
                    <PrevReviewComponent key={review._id} review={review} />
                  );
                })}
              </div>
            </div>
          )}

          <div className={styles.ratedToursPanel}>
            {user.ratedTours.length > 0 && (
              <span className={styles.spanSub}>
                {t("client_home.h1_rated_message")}
              </span>
            )}

            {user.reviewedTours.length > 0 && user.ratedTours.length === 0 && (
              <span className={styles.spanSub}>
                {t("client_home.no_rating")}
              </span>
            )}

            <div className={styles.ratedToursWrapper}>
              {user.ratedTours.map((ratedTour) => (
                <RatedTour ratedTour={ratedTour} key={ratedTour._id} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <MobileNav />

      {user.reviewedTours.length === 0 &&
        user.ratedTours.length === 0 &&
        user.bookmarkedTours.length === 0 && (
          <span className={styles.noReviewsNoRatings}>
            {t("client_home.no_review_rating")}
          </span>
        )}
    </>
  );
}
