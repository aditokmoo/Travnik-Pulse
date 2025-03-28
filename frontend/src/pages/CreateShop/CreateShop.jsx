import ReturnButton from "../../components/ReturnButton/ReturnButton";
import CreateShopFrom from "./CreateShopForm/CreateShopForm";
import styles from "./CreateShop.module.scss";
import { useTranslation } from "react-i18next";

export default function CreateShop() {
  const [t] = useTranslation('profile');
  return (
    <>
      <ReturnButton />
      <section className={styles.sectionBody}>
        <div className={styles.container}>
          <h1>{t("profile_shop_page.form_create.h1_text")}</h1>
          <CreateShopFrom />
        </div>
      </section>
    </>
  );
}
