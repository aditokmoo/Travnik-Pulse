/* eslint-disable react/prop-types */
import Calendar from "react-calendar";
import { useGetTours } from "../../hooks/useTours";
import styles from "./ClientCalendar.module.scss";
import { formatDate } from "../../services/dateServices";
import Spinner from "../../components/Spinner/Spinner";
import DesktopNav from "../../components/DesktopNav/DesktopNav";
import { useTranslation } from "react-i18next";

export default function EventCalendar({ setActiveDate }) {
  const { data, isLoading } = useGetTours();
  const [t] = useTranslation('main');

  if (isLoading) return <Spinner />;

  return (
    <>
      <DesktopNav />
      <div className={styles.calendarWrapper}>
        <Calendar
          className={styles.calendar}
          tileContent={({ date }) => {
            const toursOnDate = data.filter(
              (tour) => formatDate(tour.date) === formatDate(date)
            );

            return (
              <>
                {toursOnDate.length > 0 && (
                  <>
                    <div className={styles.imgWrapper}>
                      {toursOnDate.slice(0, 3).map((tour) => (
                        <img
                          src={`/${tour.coverImg}`}
                          key={tour._id}
                        />
                      ))}
                    </div>
                    <span>{toursOnDate.length} {t("main_page_calendar.events_text")}</span>
                  </>
                )}
              </>
            );
          }}
          onChange={(e) => {
            setActiveDate(e);
          }}
          tileClassName={({ date }) => {
            const toursOnDate = data.filter(
              (tour) => formatDate(tour.date) === formatDate(date)
            );
            const today = formatDate(new Date()) === formatDate(date);
            if (toursOnDate.length > 0 && !today)
              return `${styles.haveEvent} ${styles.dateBox}`;
            return today ? `${styles.dateBox} ${styles.today}` : styles.dateBox;
          }}
          showNeighboringMonth={false}
        />
      </div>
    </>
  );
}
