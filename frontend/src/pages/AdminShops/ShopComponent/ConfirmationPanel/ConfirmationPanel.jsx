/* eslint-disable react/prop-types */
import { useDeleteShop } from "../../../../hooks/useShops";
import Spinner from "../../../../components/Spinner/Spinner";
import { createPortal } from "react-dom";
import styles from "./ConfirmationPanel.module.scss";
import { useTranslation } from "react-i18next";
export default function ConfirmationPanel({ shop, onClosePanel }) {
  const { mutate, isLoading } = useDeleteShop();
  const [t] = useTranslation('profile');
  if (isLoading) return <Spinner />;

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <span>{t("profile_shop_page.delete_message.shop")} {shop.shopName}</span>
        <div className={styles.btnWrapper}>
          <button
            disabled={isLoading}
            onClick={() => {
              mutate(shop._id, { onSuccess: () => onClosePanel(false) });
            }}
          >
            {isLoading ? t("profile_shop_page.delete_message.deleting") : t("profile_shop_page.delete_message.yes")}
          </button>
          <button onClick={() => onClosePanel(false)}>{t("profile_shop_page.delete_message.no")}</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
