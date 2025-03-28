import styles from "./ShopComponent.module.scss";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";

import { useState } from "react";
import ConfirmationPanel from "./ConfirmationPanel/ConfirmationPanel";
import { useNavigate } from "react-router-dom";
export default function ShopComponent(shop) {
  const shopObj = Object.values(shop)?.at(0);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div
        className={styles.shopWrapper}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 126, 95, 0.5), rgba(254, 180, 123, 0.5)), url(/${shopObj.coverImg})`,
        }}
      >
        <h3>{shopObj.shopName}</h3>

        <div className={styles.operationWrapper}>
          <button
            onClick={() => navigate(`/app/admin/edit-shop/${shopObj._id}`)}
          >
            <BiEdit />
          </button>

          <button onClick={() => setIsOpenPanel(true)}>
            <BsTrash />
          </button>
        </div>
      </div>
      {isOpenPanel && (
        <ConfirmationPanel shop={shopObj} onClosePanel={setIsOpenPanel} />
      )}
    </>
  );
}
