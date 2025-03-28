/* eslint-disable react/prop-types */

import { createPortal } from "react-dom";
import styles from "./Popup.module.scss";
import { deleteTour } from "../../../../services/tourServices";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export default function Popup({ tour, setIsOpenModal }) {
  const [t] = useTranslation('profile');
  const queryClient = useQueryClient();
  async function handleDelete() {
    await deleteTour(tour._id);
    queryClient.invalidateQueries(["tours"]);
    setIsOpenModal(false);
  }
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <h3>{t("profile_shop_page.delete_message.tour")} {tour.name}</h3>
        <div className={styles.btnWrapper}>
          <button onClick={() => handleDelete()}>{t("profile_shop_page.delete_message.yes")}</button>
          <button onClick={() => setIsOpenModal(false)}>{t("profile_shop_page.delete_message.no")}</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
