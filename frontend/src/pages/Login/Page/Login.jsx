import Navbar from "../../../components/Navbar/Navbar";
import Form from "../Form/Form";
import MobileNav from "../../../components/MobileNav/MobileNav";
import styles from "./Login.module.scss";
import { useGetUser } from "../../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import DesktopNav from "../../../components/DesktopNav/DesktopNav";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { data: user, isLoading } = useGetUser();
  const [t] = useTranslation("main");
  if (isLoading) return <Spinner />;

  if (user !== "Unauthorized" && user.role) return <Navigate to="/app/me" />;
  return (
    <div className={styles.formWrapper}>
      <Navbar />
      <DesktopNav />
      <section className={styles.loginSection}>
        <div className={styles.container}>
          <h2>{t("main_page_login.h1_text")}</h2>
          <p>{t("main_page_login.p_text")}</p>
          <Form styles={styles} />
        </div>
      </section>
      <MobileNav />
    </div>
  );
}
