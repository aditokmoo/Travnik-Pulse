import MobileNav from "../../components/MobileNav/MobileNav";
import Navbar from "../../components/Navbar/Navbar";
import PreferenceFilter from "./PreferenceFilter/PreferenceFilter";
import Shops from "./Shops/Shops";
import styles from "./Shop.module.scss";
import DesktopNav from "../../components/DesktopNav/DesktopNav";

export default function Shop() {
  return (
    <div className={styles.shopWrapper}>
      <DesktopNav />
      <Navbar />
      <div className={styles.container}>
        <PreferenceFilter />
        <Shops />
      </div>
      <MobileNav />
    </div>
  );
}
