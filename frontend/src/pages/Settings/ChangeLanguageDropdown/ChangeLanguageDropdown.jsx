import { useTouristDataContext } from "../../../context/TouristDataContext";
// Flags
import BosnianFlag from "../../../assets/bosnian-flag.png";
import USAFlag from "../../../assets/usa-flag.png";
import GermanFlag from "../../../assets/german-flag.png";
import SpanishFlag from "../../../assets/spanish-flag.png";
// SCSS
import styles from './ChangeLanguageDropdown.module.scss';
import { useLanguageContext } from "../../../context/LanguageContext";

export default function ChangeLanguageDropdown({ setLangDropdown }) {
    const { language, setLanguage } = useLanguageContext();

    return (
        <div className={styles.changeLangDropdown}>
            <div className={language === 'bs' ? `${styles.option} ${styles.active}` : styles.option} onClick={(e) => {
                e.stopPropagation()
                setLanguage('bs')
                setLangDropdown(false)
            }}>
                <img src={BosnianFlag} alt="" />
                <span>Bosnian</span>
            </div>
            <div className={language === 'en' ? `${styles.option} ${styles.active}` : styles.option} onClick={(e) => {
                e.stopPropagation()
                setLanguage('en')
                setLangDropdown(false)
            }}>
                <img src={USAFlag} alt="" />
                <span>English</span>
            </div>
            <div className={language === 'de' ? `${styles.option} ${styles.active}` : styles.option} onClick={(e) => {
                e.stopPropagation()
                setLanguage('de')
                setLangDropdown(false)
            }}>
                <img src={GermanFlag} alt="" />
                <span>German</span>
            </div>
            <div className={language === 'es' ? `${styles.option} ${styles.active}` : styles.option} onClick={(e) => {
                e.stopPropagation()
                setLanguage('es')
                setLangDropdown(false)
            }}>
                <img src={SpanishFlag} alt="" />
                <span>Spanish</span>
            </div>
        </div>
    )
}