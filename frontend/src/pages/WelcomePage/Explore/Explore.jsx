import TravnikExplorImg from "../../../assets/travnik-explore-img.png";
import { useTouristDataContext } from "../../../context/TouristDataContext";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useTranslation } from "react-i18next";
// SCSS
import styles from "./Explore.module.scss";
export default function Explore() {
  const { setActivePanel } = useTouristDataContext();
  const [t] = useTranslation("welcome");
  return (
    <section className={styles.exploreSection}>
      <div className={styles.interactionWrapper}>
        <button onClick={() => setActivePanel("language")}>
          <AiOutlineArrowLeft />
        </button>
        <img src={TravnikExplorImg} alt="travnik image" />
        <h2>{t("welcome_page.h1_text")}</h2>
        <p>
          {t("welcome_page.p_text")}
        </p>
        <button onClick={() => setActivePanel("travelDetailsDuration")}>
          {t("welcome_page.button_text")}
        </button>
      </div>
    </section>
  );
}
