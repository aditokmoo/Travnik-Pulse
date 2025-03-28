import styles from "./DesktopBar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useGetTours } from "../../../hooks/useTours";
import Spinner from "../../../components/Spinner/Spinner";
import { useTranslation } from 'react-i18next';

export default function DesktopBar() {
  const { data: tours, isLoading } = useGetTours();
  const [t] = useTranslation('main')
  const navigate = useNavigate();
  if (isLoading) return <Spinner />;

  const choiceTour = tours.at(tours.length - 1);
  return (
    <div className={styles.desktopBar}>
      <div className={styles.leftWrapper}>
        <h2>{t("main_page_desktop_text.h1_text")}</h2>
        <p>
        {t("main_page_desktop_text.h2_text")}
        </p>

        <Link to="/app/map">{t("main_page_desktop_text.button_text")}</Link>
      </div>

      {tours.length > 0 && (
        <div className={styles.rightWrapper}>
          <span className={styles.choiceSub}>🔥 {t("main_page_desktop_text.event_of_choice")}</span>
          <div
            className={styles.eventWrapper}
            style={{
              backgroundImage: `url(/${choiceTour.coverImg}) `,
            }}
            onClick={() => navigate(`/app/tour/${choiceTour._id}`)}
          >
            <span>{choiceTour.name}</span>
            <div className={styles.overlay}></div>
          </div>
        </div>
      )}
    </div>
  );
}
