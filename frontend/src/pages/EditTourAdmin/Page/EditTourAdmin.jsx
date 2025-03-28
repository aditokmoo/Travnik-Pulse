import { useGetSingleTour } from "../../../hooks/useTours";
import styles from "./EditTourAdmin.module.scss";
import NotFound from "../../NotFound/NotFound";
import EditTourForm from "../EditTourForm/EditTourForm";
import Spinner from "../../../components/Spinner/Spinner";
import ReturnButton from "../../../components/ReturnButton/ReturnButton";

export default function EditTourAdmin() {
  const { data, isLoading } = useGetSingleTour();

  if (isLoading) return <Spinner />;
  if (data === "not-found") return <NotFound />;
  return (
    <section className={styles.editTourSection}>
      <ReturnButton />
      <EditTourForm tour={data} />
    </section>
  );
}
