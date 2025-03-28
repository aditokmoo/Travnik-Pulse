import { useTranslation } from "react-i18next";
import { useTouristDataContext } from "../../context/TouristDataContext";
import styles from "./PreferenceOptions.module.scss";

export default function PreferenceOptions() {
  const { preferences, setPreferences } = useTouristDataContext();
  const [t] = useTranslation("welcome");

  function addPreference(p) {
    if (preferences.includes(p))
      return setPreferences((curr) => curr.filter((e) => e !== p));
    setPreferences((curr) => [...curr, p]);
  }

  return (
    <div className={styles.preferenceWrapper}>
      <div className={styles.grid}>
        <div
          onClick={() => addPreference("food")}
          className={preferences.includes("food") ? styles.activeOption : ""}
        >
          {t("preferences_page.preferences.1")}
        </div>
        <div
          onClick={() => addPreference("nightlife")}
          className={
            preferences.includes("nightlife") ? styles.activeOption : ""
          }
        >
          {t("preferences_page.preferences.2")}
        </div>
        <div
          onClick={() => addPreference("art")}
          className={preferences.includes("art") ? styles.activeOption : ""}
        >
          {t("preferences_page.preferences.3")}
        </div>
        <div
          onClick={() => addPreference("history")}
          className={preferences.includes("history") ? styles.activeOption : ""}
        >
          {t("preferences_page.preferences.4")}
        </div>
        <div
          onClick={() => addPreference("museums")}
          className={preferences.includes("museums") ? styles.activeOption : ""}
        >
          {t("preferences_page.preferences.5")}
        </div>
        <div
          onClick={() => addPreference("movies")}
          className={preferences.includes("movies") ? styles.activeOption : ""}
        >
          {t("preferences_page.preferences.6")}
        </div>
        <div
          onClick={() => addPreference("music")}
          className={preferences.includes("music") ? styles.activeOption : ""}
        >
          {t("preferences_page.preferences.7")}
        </div>
        <div
          onClick={() => addPreference("culture")}
          className={preferences.includes("culture") ? styles.activeOption : ""}
        >
          {t("preferences_page.preferences.8")}
        </div>
        <div
          onClick={() => addPreference("parks")}
          className={preferences.includes("parks") ? styles.activeOption : ""}
        >
          {t("preferences_page.preferences.9")}
        </div>
        <div
          onClick={() => addPreference("science")}
          className={preferences.includes("science") ? styles.activeOption : ""}
        >
          {t("preferences_page.preferences.10")}
        </div>
        <div
          onClick={() => addPreference("sport")}
          className={preferences.includes("sport") ? styles.activeOption : ""}
        >
          {t("preferences_page.preferences.11")}
        </div>
      </div>
    </div>
  );
}
