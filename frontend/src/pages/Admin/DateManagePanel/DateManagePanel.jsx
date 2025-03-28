import { useAdminContext } from "../../../context/AdminContext";
import { useGetTours } from "../../../hooks/useTours";
import { formatDate, weekdays } from "../../../services/dateServices";
import styles from "./DateManagePanel.module.scss";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import EventComponent from "./EventComponent/EventComponent";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import { useTranslation } from "react-i18next";

export default function DateManagePanel() {
  const { data, isLoading } = useGetTours();
  const { activeDate, setActiveDate } = useAdminContext();
  const navigate = useNavigate();
  const [t] = useTranslation('profile');

  if (isLoading) return <Spinner />;

  const matchingDateTours = data.filter(
    (tour) => formatDate(tour.date) === formatDate(activeDate)
  );

  const dayFormated = `${new Date(activeDate).getDate()} ${
    weekdays[new Date(activeDate).getDay()]
  }`;
  return (
    <div className={styles.panel}>
      <span className={styles.panelDate}>{dayFormated}</span>

      <div
        className={styles.plusDiv}
        onClick={() => navigate("/app/admin/create-tour")}
      >
        <AiOutlinePlus />
      </div>
      <button onClick={() => setActiveDate(null)} className={styles.closePanel}>
        <AiOutlineClose />
      </button>
      <div className={styles.toursWrapper}>
        {matchingDateTours.map((tour) => (
          <EventComponent tour={tour} key={tour._id} />
        ))}

        {matchingDateTours.length === 0 && (
          <span className={styles.absPosition}>
            {t("profile_events_page.no_events")}
          </span>
        )}
      </div>
    </div>
  );
}
