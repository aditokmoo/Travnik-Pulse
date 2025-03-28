import DesktopNav from "../../components/DesktopNav/DesktopNav";
import { useAdminContext } from "../../context/AdminContext";
import DateManagePanel from "../Admin/DateManagePanel/DateManagePanel";
import EventCalendar from "../Admin/EventCalendar/EventCalendar";
import styles from "./AdminCalendar.module.scss";

export default function AdminCalendar() {
  const { activeDate } = useAdminContext();
  return (
    <>
      <DesktopNav />
      <section className={styles.section}>
        <EventCalendar />
        {activeDate && <DateManagePanel />}
      </section>
    </>
  );
}
