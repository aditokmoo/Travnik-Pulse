/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import styles from "./EditTourPreferences.module.scss";

export default function EditTourPreferences({
  selectedPreferences,
  setSelectedPreferences,
}) {
  const [t] = useTranslation('profile');
  function addPreference(p) {
    if (selectedPreferences.includes(p))
      return setSelectedPreferences((curr) => curr.filter((e) => e !== p));
    setSelectedPreferences((curr) => [...curr, p]);
  }

  return (
    <div className={styles.preferenceWrapper}>
      <div className={styles.grid}>
        <div
          onClick={() => addPreference("food")}
          className={
            selectedPreferences.includes("food") ? styles.activeOption : ""
          }
        >
          {t("profile_events_page.form_create_edit.preferences.1")}
        </div>
        <div
          onClick={() => addPreference("nightlife")}
          className={
            selectedPreferences.includes("nightlife") ? styles.activeOption : ""
          }
        >
          {t("profile_events_page.form_create_edit.preferences.2")}
        </div>
        <div
          onClick={() => addPreference("art")}
          className={
            selectedPreferences.includes("art") ? styles.activeOption : ""
          }
        >
          {t("profile_events_page.form_create_edit.preferences.3")}
        </div>
        <div
          onClick={() => addPreference("history")}
          className={
            selectedPreferences.includes("history") ? styles.activeOption : ""
          }
        >
          {t("profile_events_page.form_create_edit.preferences.4")}
        </div>
        <div
          onClick={() => addPreference("museums")}
          className={
            selectedPreferences.includes("museums") ? styles.activeOption : ""
          }
        >
          {t("profile_events_page.form_create_edit.preferences.5")}
        </div>
        <div
          onClick={() => addPreference("movies")}
          className={
            selectedPreferences.includes("movies") ? styles.activeOption : ""
          }
        >
          {t("profile_events_page.form_create_edit.preferences.6")}
        </div>
        <div
          onClick={() => addPreference("music")}
          className={
            selectedPreferences.includes("music") ? styles.activeOption : ""
          }
        >
          {t("profile_events_page.form_create_edit.preferences.7")}
        </div>
        <div
          onClick={() => addPreference("culture")}
          className={
            selectedPreferences.includes("culture") ? styles.activeOption : ""
          }
        >
          {t("profile_events_page.form_create_edit.preferences.8")}
        </div>
        <div
          onClick={() => addPreference("parks")}
          className={
            selectedPreferences.includes("parks") ? styles.activeOption : ""
          }
        >
          {t("profile_events_page.form_create_edit.preferences.9")}
        </div>
        <div
          onClick={() => addPreference("science")}
          className={
            selectedPreferences.includes("science") ? styles.activeOption : ""
          }
        >
          {t("profile_events_page.form_create_edit.preferences.10")}
        </div>
        <div
          onClick={() => addPreference("sport")}
          className={
            selectedPreferences.includes("sport") ? styles.activeOption : ""
          }
        >
          {t("profile_events_page.form_create_edit.preferences.11")}
        </div>
      </div>
    </div>
  );
}
