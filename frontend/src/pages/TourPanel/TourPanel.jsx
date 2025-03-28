import { useTouristDataContext } from "../../context/TouristDataContext";
// Components
import Navbar from "../../components/Navbar/Navbar";
import Weather from "./Weather/Weather";
import Hotels from "./Hotels/Hotels";
import PreferenceFilter from "./PreferenceFilter/PreferenceFilter";
import Activities from "./Activities/Activities";
import MobileNav from "../../components/MobileNav/MobileNav";
// SCSS
import styles from "./TourPanel.module.scss";
import DesktopNav from "../../components/DesktopNav/DesktopNav";
import DesktopBar from "./DesktopBar/DesktopBar";

export default function TourPanel() {
  const { suggestPlace } = useTouristDataContext();

  return (
    <>
      <DesktopNav />
      <section className={styles.mainApp}>
        <div className={styles.container}>
          <Navbar />
          <Weather />
          <DesktopBar />
          {suggestPlace && <Hotels />}
          <PreferenceFilter />
          <Activities />
          <MobileNav />
        </div>
      </section>
    </>
  );
}
