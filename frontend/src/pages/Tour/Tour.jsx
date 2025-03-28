import { useState } from "react";
import { useGetSingleTour } from "../../hooks/useTours";
import { useGetUser } from "../../hooks/useAuth";
// Components
import Navbar from "../../components/Navbar/Navbar";
import AboutTour from "./AboutTour/AboutTour";
import ReviewTour from "./ReviewTour/ReviewTour";
// CSS
import styles from "./Tour.module.scss";
import MobileNav from "../../components/MobileNav/MobileNav";
import NotFound from "../../pages/NotFound/NotFound.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx";
import DesktopNav from "../../components/DesktopNav/DesktopNav.jsx";

export default function Tour() {
  const [showReview, setShowReview] = useState(false);
  const { data, isLoading } = useGetSingleTour();
  const { data: user, isLoading: loadingUser } = useGetUser();

  
  if (isLoading || loadingUser) return <Spinner />;
  
  if (data === "not-found") return <NotFound />;
  console.log(data.coverImg)
  return (
    <>
      <DesktopNav />
      <Navbar />
      <section className={styles.sectionBody}>
        <div className={styles.container}>
          <div className={styles.tour}>
            <div
              className={styles.image}
              style={{
                backgroundImage: `url(/${data.coverImg})`,
              }}
            >
              <div className={styles.imageOverlay} />
              <div className={styles.imageContent}></div>
            </div>

            {!showReview ? (
              <AboutTour
                setShowReview={setShowReview}
                data={data}
                user={user}
              />
            ) : (
              <ReviewTour setShowReview={setShowReview} />
            )}
          </div>
        </div>
        <MobileNav />
      </section>
    </>
  );
}
