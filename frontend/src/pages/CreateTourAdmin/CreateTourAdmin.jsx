import ReturnButton from "../../components/ReturnButton/ReturnButton";
import CreateTourForm from "./CreateTourForm";
import styles from "./CreateTourAdmin.module.scss";

export default function CreateTourAdmin() {
  return (
    <section className={styles.sectionBody}>
      <ReturnButton />
      <CreateTourForm />
    </section>
  );
}
