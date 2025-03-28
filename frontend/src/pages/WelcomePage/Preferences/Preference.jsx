import { AiOutlineArrowLeft } from "react-icons/ai";
import { useTouristDataContext } from "../../../context/TouristDataContext";
import PreferenceOptions from "../../../components/PreferenceOptions/PreferenceOptions";
import styles from "./Preference.module.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Preference() {
  const {
    selectedVisitPeriod,
    visitCount,
    position,
    preferences,
    setActivePanel,
    language,
    suggestPlace,
  } = useTouristDataContext();
  const [t] = useTranslation("welcome");

  const navigate = useNavigate();

  function handleClick() {
    console.log(language);
    localStorage.setItem("selectedVisitPeriod", selectedVisitPeriod);
    localStorage.setItem("visitCount", visitCount);
    localStorage.setItem("position", JSON.stringify(position));
    localStorage.setItem("preferences", JSON.stringify(preferences));
    // localStorage.setItem("language", JSON.stringify(language));
    localStorage.setItem("suggestPlace", JSON.stringify(suggestPlace));

    navigate("/app");
  }

  return (
    <section className={styles.preferenceSection}>
      <div className={styles.panel}>
        <button onClick={() => setActivePanel("locationDetails")}>
          <AiOutlineArrowLeft />
        </button>
        <h2>{t("location_page.h1_text")}</h2>
        <p>{t("location_page.p_text")}</p>

        <PreferenceOptions />

        <button
          onClick={() => {
            if (preferences.length === 0) return;
            setActivePanel("proceed");
            handleClick();
          }}
        >
          {t("location_page.button_text")}
        </button>
      </div>
    </section>
  );
}
