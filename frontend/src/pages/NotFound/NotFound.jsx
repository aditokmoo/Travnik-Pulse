import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.scss";
import ReturnButton from "../../components/ReturnButton/ReturnButton";
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.notFoundPage}>
      <ReturnButton />
      <span>Tour not found 😢</span>
    </div>
  );
}
