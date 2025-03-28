/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import styles from "./PreferencePanel.module.scss";

export default function PreferencePanel({
  selectedPreferences,
  setSelectedPreferences,
}) {
  const [t] = useTranslation('main');
  function addPreference(p) {
    if (selectedPreferences.includes(p))
      return setSelectedPreferences((curr) => curr.filter((e) => e !== p));
    setSelectedPreferences((curr) => [...curr, p]);
  }

  return (
    <div className={styles.preferenceWrapper}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div
            onClick={() => addPreference("food")}
            className={
              selectedPreferences.includes("food") ? styles.activeOption : ""
            }
          >
            {t("preferences.links.2")}
          </div>
          <div
            onClick={() => addPreference("nightlife")}
            className={
              selectedPreferences.includes("nightlife")
                ? styles.activeOption
                : ""
            }
          >
            {t("preferences.links.1")}
          </div>
          <div
            onClick={() => addPreference("art")}
            className={
              selectedPreferences.includes("art") ? styles.activeOption : ""
            }
          >
            {t("preferences.links.3")}
          </div>
          <div
            onClick={() => addPreference("history")}
            className={
              selectedPreferences.includes("history") ? styles.activeOption : ""
            }
          >
            {t("preferences.links.4")}
          </div>
          <div
            onClick={() => addPreference("museums")}
            className={
              selectedPreferences.includes("museums") ? styles.activeOption : ""
            }
          >
            {t("preferences.links.5")}
          </div>
          <div
            onClick={() => addPreference("movies")}
            className={
              selectedPreferences.includes("movies") ? styles.activeOption : ""
            }
          >
            {t("preferences.links.6")}
          </div>
          <div
            onClick={() => addPreference("music")}
            className={
              selectedPreferences.includes("music") ? styles.activeOption : ""
            }
          >
            {t("preferences.links.7")}
          </div>
          <div
            onClick={() => addPreference("culture")}
            className={
              selectedPreferences.includes("culture") ? styles.activeOption : ""
            }
          >
            {t("preferences.links.8")}
          </div>
          <div
            onClick={() => addPreference("parks")}
            className={
              selectedPreferences.includes("parks") ? styles.activeOption : ""
            }
          >
            {t("preferences.links.9")}
          </div>
          <div
            onClick={() => addPreference("science")}
            className={
              selectedPreferences.includes("science") ? styles.activeOption : ""
            }
          >
            {t("preferences.links.10")}
          </div>
          <div
            onClick={() => addPreference("sport")}
            className={
              selectedPreferences.includes("sport") ? styles.activeOption : ""
            }
          >
            {t("preferences.links.11")}
          </div>
        </div>
      </div>
    </div>
  );
}
