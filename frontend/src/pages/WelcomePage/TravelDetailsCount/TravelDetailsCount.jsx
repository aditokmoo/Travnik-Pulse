import styles from "./TravelDetailsCount.module.scss";
import UserActive from "../../../assets/user-active.png";
import UserInactive from "../../../assets/user-inactive.png";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useTouristDataContext } from "../../../context/TouristDataContext";
import { useTranslation } from "react-i18next";

export default function TravelDetailsCount() {
  const { visitCount, setVisitCount, setActivePanel } = useTouristDataContext();
  const [t] = useTranslation("welcome");

  return (
    <section className={styles.sectionBody}>
      <div className={styles.panel}>
        <button onClick={() => setActivePanel("travelDetailsDuration")}>
          <AiOutlineArrowLeft />
        </button>
        <h2>{t("details_page.h1_text")}</h2>
        <p>
        {t("details_page.p_text")}
        </p>

        <div className={styles.touristCountWrapper}>
          <span>{t("details_page.people_details.title")}</span>
          <div className={styles.grid}>
            <div
              onClick={() => {
                setVisitCount(1);
                setActivePanel("locationDetails");
              }}
              className={visitCount === 1 ? styles.activeOption : ""}
            >
              <img src={visitCount === 1 ? UserActive : UserInactive} />
            </div>
            <div
              onClick={() => {
                setVisitCount(2);
                setActivePanel("locationDetails");
              }}
              className={visitCount === 2 ? styles.activeOption : ""}
            >
              <img src={visitCount === 2 ? UserActive : UserInactive} />
              <img src={visitCount === 2 ? UserActive : UserInactive} />
            </div>
            <div
              onClick={() => {
                setVisitCount(3);
                setActivePanel("locationDetails");
              }}
              className={visitCount === 3 ? styles.activeOption : ""}
            >
              <img src={visitCount === 3 ? UserActive : UserInactive} />
              <img src={visitCount === 3 ? UserActive : UserInactive} />
              <img src={visitCount === 3 ? UserActive : UserInactive} />
              <span>+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
