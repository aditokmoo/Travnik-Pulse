import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import styles from "./Modal.module.scss";
export default function Modal({ resetSettings, setIsOpenModal }) {
  const [t] = useTranslation("main");
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <span>
          {t("main_page_settings.reset_modal.text")}
        </span>

        <div className={styles.btnWrapper}>
          <button onClick={() => resetSettings()}>{t("main_page_settings.reset_modal.yes")}</button>
          <button onClick={() => setIsOpenModal(false)}>{t("main_page_settings.reset_modal.no")}</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
