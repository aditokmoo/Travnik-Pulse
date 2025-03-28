/* eslint-disable react/prop-types */
import { useGetTours } from "../../../hooks/useTours";
import { formatDate, weekdays } from "../../../services/dateServices";
import styles from "./DateManagePanel.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import EventComponent from "../EventComponent/EventComponent";
import Spinner from "../../../components/Spinner/Spinner";

export default function DateManagePanel({ activeDate, setActiveDate }) {
  const { data, isLoading } = useGetTours();
  if (isLoading) return <Spinner />;

  const matchingDateTours = data.filter(
    (tour) => formatDate(tour.date) === formatDate(activeDate)
  );

  const dayFormated = `${new Date(activeDate).getDate()} ${
    weekdays[new Date(activeDate).getDay()]
  }`;

  if (matchingDateTours.length === 0)
    return (
      <div className={styles.panel}>
        <button
          onClick={() => setActiveDate(null)}
          className={styles.closePanel}
        >
          <AiOutlineClose />
        </button>
        <span className={styles.selectedWeekDay}>{dayFormated}</span>
        <p className={styles.noActivitiesMsg}>No activities for this day 😢</p>
      </div>
    );
  return (
    <div className={styles.panel}>
      <span className={styles.panelDate}>{dayFormated}</span>
      <button onClick={() => setActiveDate(null)} className={styles.closePanel}>
        <AiOutlineClose />
      </button>
      <div className={styles.toursWrapper}>
        {matchingDateTours.map((tour) => (
          <EventComponent tour={tour} key={tour._id} />
        ))}
      </div>
    </div>
  );
}
