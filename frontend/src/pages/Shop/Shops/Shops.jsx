import Spinner from "../../../components/Spinner/Spinner";
import { useTouristDataContext } from "../../../context/TouristDataContext";
import { useGetAllShops } from "../../../hooks/useShops";
import ShopItem from "../ShopItem/ShopItem";
import styles from "./Shops.module.scss";

export default function Shops() {
  const { activeShopPreference, setActiveShopPreference } =
    useTouristDataContext();
  const { data, isLoading } = useGetAllShops();

  if (isLoading) return <Spinner />;

  return (
    <section className={styles.shops}>
      {/* Display shops by filter default will be stores */}
      {data
        .filter(({ category }) => category == activeShopPreference)
        .map((shop, index) => (
          <ShopItem data={shop} key={index} />
        ))}
    </section>
  );
}
