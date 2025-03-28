/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./ReturnButton.module.scss";
import { AiOutlineLeft } from "react-icons/ai";

export default function ReturnButton({ app }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(app ? "/app" : -1)}
      className={styles.returnBtn}
    >
      <AiOutlineLeft />
    </button>
  );
}
