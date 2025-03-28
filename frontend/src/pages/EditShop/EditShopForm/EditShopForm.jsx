/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./EditTourForm.module.scss";
import CategoryPalete from "../../../components/CategoryPalete/CategoryPalete";
import EditTourMap from "../EditShopMap/EditShopMap";
import { useForm } from "react-hook-form";
import { useEditShop } from "../../../hooks/useShops";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useTranslation } from "react-i18next";

export default function EditShopForm({ shop }) {
  const [category, setCategory] = useState(shop.category);
  const [position, setPosition] = useState(shop.location.coordinates);

  const { register, handleSubmit } = useForm();
  const { mutate, isLoading } = useEditShop();
  const [t] = useTranslation("profile");

  async function submitFnc(data) {
    if (data.coverImg.length === 0) delete data.coverImg;
    const formData = new FormData();

    formData.append("location", JSON.stringify({ coordinates: position }));
    formData.append("category", category);
    if (data.coverImg && data.coverImg.length > 0) {
      formData.append("coverImg", data.coverImg[0]);
      delete data.coverImg;
    }
    Object.entries(data).forEach((entry) => {
      formData.append(entry[0], entry[1]);
    });

    await mutate(formData);
  }

  if (isLoading) return <h1>SAVING...</h1>;
  return (
    <form
      onSubmit={handleSubmit((data) => submitFnc(data))}
      className={styles.form}
    >
      <h1>{t("profile_shop_page.form_edit.h1_text")}</h1>
      <div className={styles.inputWrapper}>
        <label htmlFor="name">
          {t("profile_shop_page.form_edit.title_label")}
        </label>
        <input
          type="text"
          name="shopName"
          defaultValue={shop.shopName}
          {...register("shopName", { required: true })}
        />
      </div>{" "}
      <div className={styles.inputWrapper}>
        <label htmlFor="category">
          {t("profile_shop_page.form_edit.add_shop_category")}
        </label>

        <CategoryPalete category={category} setCategory={setCategory} />
      </div>
      <div className={styles.inputWrapper}>
        <span>{t("profile_shop_page.form_edit.cover_image_label")}</span>
        <label htmlFor="coverImg" className={styles.labelImg}>
          {t("profile_shop_page.form_edit.choose_cover_image")}{" "}
          <AiOutlineCloudUpload />
        </label>
        <input
          type="file"
          name="coverImg"
          id="coverImg"
          {...register("coverImg")}
          accept="image/*"
          className={styles.inputImg}
        />
      </div>
      <div>
        <span>{t("profile_shop_page.form_edit.choose_location")}</span>
        <EditTourMap
          shop={shop}
          position={position}
          setPosition={setPosition}
        />
      </div>
      <button type="submit" className={styles.submitBtn}>
        {t("profile_shop_page.form_edit.save_button_text")}
      </button>
    </form>
  );
}
