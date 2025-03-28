/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./CreateTourAdmin.module.scss";
import EditTourPreferences from "../EditTourAdmin/EditTourPreferences/EditTourPreferences";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import EditTourMap from "../EditTourAdmin/EditTourMap/EditTourMap";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useCreateTour } from "../../hooks/useTours";
import { useAdminContext } from "../../context/AdminContext";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function CreateTourForm() {
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [t] = useTranslation('profile');
  const [time, setTime] = useState(null);
  const [price, setPrice] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [position, setPosition] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate, isLoading } = useCreateTour();
  const { activeDate } = useAdminContext();

  if (!activeDate) return <Navigate to="/app/admin" />;

  async function submitFnc(data) {
    if (!time) return toast.error("Assign event time!");
    if (!isFree && !price)
      return toast.error("Assign price of event or mark it as FREE!");
    if (position.length === 0)
      return toast.error("Assign event location on map");

    if (selectedPreferences.length === 0)
      return toast.error("Select categories of your event");

    const formData = new FormData();
    formData.append("time", time);
    formData.append("price", isFree ? "FREE" : price);
    formData.append("location", JSON.stringify({ coordinates: position }));
    formData.append("categories", selectedPreferences);
    formData.append("coverImg", data.coverImg[0]);
    formData.append("date", activeDate);
    delete data.coverImg;

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
      <h1>{t("profile_events_page.form_create_edit.h1_text_create")}</h1>
      <div className={styles.inputWrapper}>
        <label htmlFor="name">{t("profile_events_page.form_create_edit.title_label_text")}</label>
        <input
          type="text"
          name="name"
          placeholder={t("profile_events_page.form_create_edit.title_placeholder_text")}
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className={styles.errorMsg}>
            {t("profile_events_page.form_create_edit.title_error_text")}
          </span>
        )}
      </div>
      <div className={styles.inputWrapper}>
        <span>{t("profile_events_page.form_create_edit.categories_label_text")}</span>
        <EditTourPreferences
          selectedPreferences={selectedPreferences}
          setSelectedPreferences={setSelectedPreferences}
        />
      </div>
      <div className={styles.inputWrapper}>
        <span>{t("profile_events_page.form_create_edit.select_time_label_text")}</span>
        <TimePicker
          showTimeSelect
          timeFormat="p"
          dateFormat=""
          value={time}
          onChange={setTime}
          disableClock={true}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="duration">{t("profile_events_page.form_create_edit.duration_label_text")}</label>
        <input
          type="number"
          placeholder="120 Minutes"
          name="duration"
          {...register("duration", { required: true })}
        />
        {errors.duration && (
          <span className={styles.errorMsg}>
            {t("profile_events_page.form_create_edit.duration_error_text")}
          </span>
        )}
      </div>
      <div className={styles.inputWrapper}>
        <span>{t("profile_events_page.form_create_edit.price_label_text")}</span>
        <div className={styles.pricingWrapper}>
          <span
            className={isFree ? styles.isFree : styles.freeBtn}
            onClick={() => setIsFree((curr) => !curr)}
          >
            FREE
          </span>
          <input
            type="number"
            placeholder="25KM"
            disabled={isFree}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.inputWrapper}>
        <span>{t("profile_events_page.form_create_edit.description_label_text")}</span>
        <textarea
          placeholder={t("profile_events_page.form_create_edit.description_label_text")}
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && (
          <span className={styles.errorMsg}>
            {t("profile_events_page.form_create_edit.description_error_text")}
          </span>
        )}
      </div>
      <div className={styles.inputWrapper}>
        <span>{t("profile_events_page.form_create_edit.cover_image_label")}</span>
        <label htmlFor="coverImg" className={styles.labelImg}>
        {t("profile_events_page.form_create_edit.choose_cover_image")} <AiOutlineCloudUpload />
        </label>
        <input
          type="file"
          name="coverImg"
          id="coverImg"
          {...register("coverImg", { required: true })}
          accept="image/*"
          className={styles.inputImg}
        />
        {errors.coverImg && (
          <span className={styles.errorMsg}>
            {t("profile_events_page.form_create_edit.choose_cover_error_text")}
          </span>
        )}
      </div>

      <div>
        <span>{t("profile_events_page.form_create_edit.choose_activity_location")}</span>
        <EditTourMap position={position} setPosition={setPosition} />
      </div>
      <button type="submit" className={styles.submitBtn}>
        {t("profile_events_page.form_create_edit.submit_button_text")}
      </button>
    </form>
  );
}
