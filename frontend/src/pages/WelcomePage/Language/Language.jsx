import SimpleLogo from "../../../assets/simple-logo.png";
import styles from "./Language.module.scss";
import BosnianFlag from "../../../assets/bosnian-flag.png";
import GermanyFlag from "../../../assets/german-flag.png";
import SpanishFlag from "../../../assets/spanish-flag.png";
import USAFlag from "../../../assets/usa-flag.png";
import { useTouristDataContext } from "../../../context/TouristDataContext";
import { useTranslation } from "react-i18next";
import { useLanguageContext } from "../../../context/LanguageContext";
export default function Language() {
  const { setLanguage } = useLanguageContext();
  const { setActivePanel } = useTouristDataContext();
  const [t, i18n] = useTranslation("welcome");
  return (
    <section className={styles.languageSection}>
      <div className={styles.interactionPanel}>
        <img src={SimpleLogo} alt="travnikpulse logo" />
        <h1>Select language</h1>
        <h3>Select language of your preference!</h3>
        <div className={styles.languagesWrapper}>
          <div
            onClick={() => {
              i18n.changeLanguage("bs");
              setLanguage("bs");
              setActivePanel("explore");
            }}
          >
            <img src={BosnianFlag} alt="bosnian flag" />
            <span>Bosnian</span>
          </div>
          <div
            onClick={() => {
              i18n.changeLanguage("en");
              setLanguage("en");
              setActivePanel("explore");
            }}
          >
            <img src={USAFlag} alt="USA flag" />
            <span>English</span>
          </div>
          <div
            onClick={() => {
              i18n.changeLanguage("de");
              setLanguage("de");
              setActivePanel("explore");
            }}
          >
            <img src={GermanyFlag} alt="Germany flag" />
            <span>Germany</span>
          </div>
          <div
            onClick={() => {
              i18n.changeLanguage("es");
              setLanguage("es");
              setActivePanel("explore");
            }}
          >
            <img src={SpanishFlag} alt="Spain flag" />
            <span>Spanish</span>
          </div>
        </div>
      </div>
    </section>
  );
}
