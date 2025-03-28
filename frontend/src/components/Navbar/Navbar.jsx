import { Link, NavLink, useLocation } from "react-router-dom";
import TravnikPulseLogo from "../../assets/simple-logo.png";
import { BiUserCircle } from "react-icons/bi";
import styles from "./Navbar.module.scss";
import { useGetUser } from "../../hooks/useAuth";
import { BiSolidUserCircle, BiLogInCircle } from "react-icons/bi";
import Spinner from "../Spinner/Spinner";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { data: user, isLoading } = useGetUser();
  const [t] = useTranslation("main");

  const location = useLocation();

  if (isLoading) return <Spinner />;
  return (
    <>
      <nav className={styles.nav}>
        <img
          src={TravnikPulseLogo}
          alt="TravnikPulse"
          className={styles.text}
        />
        {user.role && (
          <NavLink to="/app/me" className={styles.calendar}>
            {location.pathname === "/app/me" ? (
              <BiSolidUserCircle />
            ) : (
              <BiUserCircle />
            )}
          </NavLink>
        )}

        {!user.role && location.pathname !== "/app/login" && (
          <Link className={styles.loginBtn} to="/app/login">
            {t("main_page_navbar.links.login")} <BiLogInCircle />
          </Link>
        )}
      </nav>
    </>
  );
}
