import styles from "./Spinner.module.scss";
import { createPortal } from "react-dom";
import { SpinnerRoundFilled } from "spinners-react";

export default function Spinner() {
  return createPortal(
    <div className={styles.reactWrapper}>
      <SpinnerRoundFilled color="#f37022" />,
    </div>,
    document.body
  );
}
