import styles from "./TravelDetails.module.scss";
import DateActive from "../../../assets/date-active.png";
import DateInactive from "../../../assets/date-inactive.png";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useTouristDataContext } from "../../../context/TouristDataContext";
import { TypeAnimation } from "react-type-animation";
import { useTranslation } from "react-i18next";

export default function TravelDetails() {
  const {
    selectedVisitPeriod,
    setSelectedVisitPeriod,
    setActivePanel,
    setSuggestPlace,
  } = useTouristDataContext();
  const [t] = useTranslation("welcome");

  return (
    <section className={styles.sectionBody}>
      <div className={styles.panel}>
        <button onClick={() => setActivePanel("explore")}>
          <AiOutlineArrowLeft />
        </button>
        <h2>{t("details_page.h1_text")}</h2>
        <p>
        {t("details_page.p_text")}
        </p>
        <div className={styles.dateWrapper}>
          <span>{t("details_page.time_details.title")}</span>
          <div className={styles.grid}>
            <div
              onClick={() => {
                setSelectedVisitPeriod(1);
                setActivePanel("travelDetailsCount");
              }}
              className={selectedVisitPeriod === 1 ? styles.activeOption : ""}
            >
              <img
                src={selectedVisitPeriod === 1 ? DateActive : DateInactive}
              />
              1
            </div>
            <div
              onClick={() => {
                setSelectedVisitPeriod(2);
              }}
              className={selectedVisitPeriod === 2 ? styles.activeOption : ""}
            >
              <img
                src={selectedVisitPeriod === 2 ? DateActive : DateInactive}
              />
              2
            </div>
            <div
              onClick={() => {
                setSelectedVisitPeriod(3);
              }}
              className={selectedVisitPeriod === 3 ? styles.activeOption : ""}
            >
              <img
                src={selectedVisitPeriod === 3 ? DateActive : DateInactive}
              />
              3+
            </div>
          </div>
          {selectedVisitPeriod >= 2 && (
            <div className={styles.checkboxWrapper}>
              <span>
              {t("details_page.suggest_text")}{" "}
                <TypeAnimation
                  sequence={[
                    // Same substring at the start will only be typed out once, initially
                    "hotels",
                    2000, // wait 1s before replacing "Mice" with "Hamsters"
                    "motels",
                    2000,
                    "guesthouses",
                    2000,
                    "cottages",
                    2000,
                  ]}
                  repeat={Infinity}
                />
              </span>
              <div className={styles.optionWrapper}>
                {" "}
                <button
                  onClick={() => {
                    setSuggestPlace(false);
                    setActivePanel("travelDetailsCount");
                  }}
                >
                  {t("no")}
                </button>
                <button
                  onClick={() => {
                    setSuggestPlace(true);
                    setActivePanel("travelDetailsCount");
                  }}
                >
                  {t("yes")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
