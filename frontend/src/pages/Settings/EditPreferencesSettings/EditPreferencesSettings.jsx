import { useState } from "react";
import styles from "./EditPreferencesSettings.module.scss";
import Navbar from "../../../components/Navbar/Navbar";
import MobileNav from "../../../components/MobileNav/MobileNav";
import PreferencePanel from "../PreferencePanel/PreferencePanel";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function EditPreferences() {
  const [preferences, setPreferences] = useState(
    JSON.parse(localStorage.getItem("preferences"))
  );
  const [t] = useTranslation('main');

  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <section className={styles.preferenceSectionSettings}>
        <PreferencePanel
          selectedPreferences={preferences}
          setSelectedPreferences={setPreferences}
        />
        <div className={styles.buttonWrapper}>
          <button onClick={() => navigate(-1)}>{t("preferences.cancel_button_text")}</button>
          <button
            onClick={() => {
              if (preferences.length < 1)
                return toast.error("Choose at least 1 category");
              localStorage.setItem("preferences", JSON.stringify(preferences));
              navigate(-1);
            }}
          >
            {t("preferences.save_button_text")}
          </button>
        </div>
      </section>

      <MobileNav />
    </>
  );
}
