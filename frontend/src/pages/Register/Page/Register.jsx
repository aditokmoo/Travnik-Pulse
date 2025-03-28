import Navbar from "../../../components/Navbar/Navbar";
import Form from "../Form/Form";
import MobileNav from "../../../components/MobileNav/MobileNav";
import styles from "./Register.module.scss";
import DesktopNav from "../../../components/DesktopNav/DesktopNav";
import { useTranslation } from "react-i18next";

export default function Register() {
  const [t] = useTranslation('main');
  return (
    <div className={styles.formWrapper}>
      <DesktopNav />
      <Navbar />

      <section className={styles.registerSection}>
        <div className={styles.container}>
          <h2>{t("main_page_register.h1_text")}</h2>
          <p>
          {t("main_page_register.p_text")}
          </p>
          <Form styles={styles} />
        </div>
      </section>
      <MobileNav />
    </div>
  );
}
