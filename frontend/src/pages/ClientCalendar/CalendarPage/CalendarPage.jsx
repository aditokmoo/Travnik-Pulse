import { useState } from "react";
import ClientCalendar from "../ClientCalendar";
import styles from "./Page.module.scss";
import DateManagePanel from "../DateManagePanel/DateManagePanel";
import MobileNav from "../../../components/MobileNav/MobileNav";
import Navbar from "../../../components/Navbar/Navbar";

export default function CalendarPage() {
  const [activeDate, setActiveDate] = useState(null);
  return (
    <>
      <section className={styles.sectionBody}>
        <Navbar />
        <ClientCalendar setActiveDate={setActiveDate} />
        {activeDate && (
          <DateManagePanel
            activeDate={activeDate}
            setActiveDate={setActiveDate}
          />
        )}
      </section>
      <MobileNav />
    </>
  );
}
