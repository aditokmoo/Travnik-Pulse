import { useTranslation } from "react-i18next";
import styles from "./CategoryPalete.module.scss";
export default function CategoryPalete({ category, setCategory }) {
  const [t] = useTranslation('profile')
  return (
    <div className={styles.categoryGridWrapper}>
      <div
        className={category === "clothing" ? styles.activeOption : ""}
        onClick={() => setCategory("clothing")}
      >
        {t("profile_shop_page.form_create.preferences.1")}
      </div>
      <div
        className={category === "souvenir shops" ? styles.activeOption : ""}
        onClick={() => setCategory("souvenir shops")}
      >
        {t("profile_shop_page.form_create.preferences.2")}
      </div>
      <div
        className={category === "art" ? styles.activeOption : ""}
        onClick={() => setCategory("art")}
      >
        {t("profile_shop_page.form_create.preferences.3")}
      </div>
      <div
        className={category === "bookstores" ? styles.activeOption : ""}
        onClick={() => setCategory("bookstores")}
      >
        {t("profile_shop_page.form_create.preferences.4")}
      </div>
      <div
        className={category === "jewelry" ? styles.activeOption : ""}
        onClick={() => setCategory("jewelry")}
      >
        {" "}
        {t("profile_shop_page.form_create.preferences.5")}
      </div>
      <div
        className={category === "home decor" ? styles.activeOption : ""}
        onClick={() => setCategory("home decor")}
      >
        {t("profile_shop_page.form_create.preferences.6")}
      </div>
      <div
        className={category === "electronics" ? styles.activeOption : ""}
        onClick={() => setCategory("electronics")}
      >
        {t("profile_shop_page.form_create.preferences.7")}
      </div>
      <div
        className={category === "food" ? styles.activeOption : ""}
        onClick={() => setCategory("food")}
      >
        {t("profile_shop_page.form_create.preferences.8")}
      </div>
      <div
        className={category === "grocery" ? styles.activeOption : ""}
        onClick={() => setCategory("grocery")}
      >
        {t("profile_shop_page.form_create.preferences.9")}
      </div>
      <div
        className={category === "music store" ? styles.activeOption : ""}
        onClick={() => setCategory("music store")}
      >
        {t("profile_shop_page.form_create.preferences.10")}
      </div>
      <div
        className={
          category === "beauty and cosmetics" ? styles.activeOption : ""
        }
        onClick={() => setCategory("beauty and cosmetics")}
      >
        {t("profile_shop_page.form_create.preferences.11")}
      </div>
      <div
        className={category === "toys and games" ? styles.activeOption : ""}
        onClick={() => setCategory("toys and games")}
      >
        {t("profile_shop_page.form_create.preferences.12")}
      </div>
      <div
        className={category === "sports and fitness" ? styles.activeOption : ""}
        onClick={() => setCategory("sports and fitness")}
      >
        {t("profile_shop_page.form_create.preferences.13")}
      </div>
      <div
        className={category === "pet shops" ? styles.activeOption : ""}
        onClick={() => setCategory("pet shops")}
      >
        {t("profile_shop_page.form_create.preferences.14")}
      </div>
      <div
        className={category === "tech and gadgets" ? styles.activeOption : ""}
        onClick={() => setCategory("tech and gadgets")}
      >
        {t("profile_shop_page.form_create.preferences.15")}
      </div>
      <div
        className={category === "shoe stores" ? styles.activeOption : ""}
        onClick={() => setCategory("shoe stores")}
      >
        {t("profile_shop_page.form_create.preferences.16")}
      </div>
      <div
        className={
          category === "health and wellness" ? styles.activeOption : ""
        }
        onClick={() => setCategory("health and wellness")}
      >
        {t("profile_shop_page.form_create.preferences.17")}
      </div>
      <div
        className={category === "florists" ? styles.activeOption : ""}
        onClick={() => setCategory("florists")}
      >
        {t("profile_shop_page.form_create.preferences.18")}
      </div>
    </div>
  );
}
