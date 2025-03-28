import styles from "./EditShop.module.scss";
import NotFound from "../NotFound/NotFound";
import EditShopForm from "./EditShopForm/EditShopForm";
import Spinner from "../../components/Spinner/Spinner";
import ReturnButton from "../../components/ReturnButton/ReturnButton";
import { useGetSingleShop } from "../../hooks/useShops";

export default function EditShop() {
  const { data, isLoading } = useGetSingleShop();
  if (isLoading) return <Spinner />;
  if (data === "not-found") return <NotFound />;
  return (
    <section className={styles.editShopSection}>
      <ReturnButton />
      <EditShopForm shop={data} />
    </section>
  );
}
