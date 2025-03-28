import styles from "./DesktopNav.module.scss";
import Logo from "../../assets/simple-logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useGetUser } from "../../hooks/useAuth";
import Spinner from "../../components/Spinner/Spinner";
import { useTranslation } from "react-i18next";
export default function DesktopNav() {
  const { data: user, isLoading } = useGetUser();
  const [t] = useTranslation("main");

  const location = useLocation();

  if (isLoading) return <Spinner />;
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link to="/app/dashboard">
          <img src={Logo} alt="logo" />
        </Link>

        <ul>
          <li>
            <NavLink to="/app/dashboard">{t("main_page_navbar.links.1")}</NavLink>
          </li>
          <li>
            <NavLink to="/app/map">{t("main_page_navbar.links.2")}</NavLink>
          </li>
          <li>
            <NavLink to="/app/shop">{t("main_page_navbar.links.3")}</NavLink>
          </li>
          <li>
            <NavLink to="/app/calendar">{t("main_page_navbar.links.4")}</NavLink>
          </li>
          <li>
            <NavLink to="/app/settings">{t("main_page_navbar.links.5")}</NavLink>
          </li>
          <li
            className={`${styles.operation} ${
              location.pathname === "/app/me" ? styles.whiteBG : ""
            }`}
          >
            <NavLink to="/app/me">
              {user.role ? user.username : t("main_page_navbar.links.login")}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
