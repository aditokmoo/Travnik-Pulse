import { useState } from "react";
import EditTourMap from "../../EditTourAdmin/EditTourMap/EditTourMap";
import styles from "./CreateShopForm.module.scss";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useCreateShop } from "../../../hooks/useShops";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner/Spinner";
import CategoryPalete from "../../../components/CategoryPalete/CategoryPalete";
import { useTranslation } from "react-i18next";
export default function CreateShopFrom() {
  const [position, setPosition] = useState([]);
  const [shopName, setShopName] = useState("");
  const [category, setCategory] = useState("");
  const [coverImg, setCoverImg] = useState(null);
  const [t] = useTranslation('profile');

  const { mutate, isLoading } = useCreateShop();

  function handleSubmit(e) {
    e.preventDefault();

    if (position.length == 0 || !shopName || !category || !coverImg)
      return toast.error("Fill out all required fields!");

    const formData = new FormData();
    formData.append("shopName", shopName);
    formData.append("category", category);
    formData.append("location", JSON.stringify({ coordinates: position }));
    formData.append("coverImg", coverImg);
    mutate(formData);
  }

  if (isLoading) return <Spinner />;
  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.inputWrapper}>
        <label htmlFor="shopName">{t("profile_shop_page.form_create.shop_name_label")}</label>
        <input
          type="text"
          name="shopName"
          id="shopName"
          placeholder="ex. Pekara Kabil"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="category">{t("profile_shop_page.form_create.shop_category_label")}</label>
        <CategoryPalete setCategory={setCategory} category={category} />
      </div>
      <div className={styles.inputWrapper}>
        <span>{t("profile_shop_page.form_create.cover_image_label")}</span>
        <label htmlFor="coverImg" className={styles.labelImg}>
          {" "}
          {t("profile_shop_page.form_create.attach_image_label")} <AiOutlineCloudUpload />
        </label>
        <input
          type="file"
          name="coverImg"
          id="coverImg"
          className={styles.inputImg}
          onChange={(e) => setCoverImg(e.target.files[0])}
        />
      </div>
      <div className={styles.inputWrapper}>
        <span>{t("profile_shop_page.form_create.shop_location_label")}</span>
        <EditTourMap position={position} setPosition={setPosition} />
      </div>
      <button className={styles.submitBtn}>{t("profile_shop_page.form_create.create_shop_button_text")}</button>
    </form>
  );
}
