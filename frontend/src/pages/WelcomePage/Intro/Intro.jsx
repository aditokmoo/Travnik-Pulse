import styles from "./Intro.module.scss";
import Logo from "../../../assets/main-logo.png";

export default function Intro() {
  return (
    <div className={styles.introWrapper}>
      <img src={Logo} />
    </div>
  );
}
