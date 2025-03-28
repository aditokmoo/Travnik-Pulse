import { useRef, useState } from "react";
import { useMapContext } from "../../../context/MapContext";
import { FaTimes } from "react-icons/fa";
import styles from "./MapFilter.module.scss";
import { useQueryClient } from "@tanstack/react-query";
import { FaRegDotCircle } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { MdEvent } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { useTranslation } from 'react-i18next';

export default function MapFilter() {
  const [radiusModal, setRadiusModal] = useState(false);
  const { setActiveFilter, activeFilter, tourLocation, setRadius } =
    useMapContext();
  const radiusInputRef = useRef(null);
  const [t] = useTranslation('main')
  const queryClient = useQueryClient();
  return (
    tourLocation === null && (
      <>
        <section className={styles.mapFilter}>
          <div
            className={
              activeFilter === "all"
                ? `${styles.filter} : ${styles.active}`
                : styles.filter
            }
            onClick={() => {
              setRadiusModal(false);
              setActiveFilter("all");
            }}
          >
            {t("main_page_map.nav_links.1")}
          </div>
          <div
            className={
              activeFilter === "radius"
                ? `${styles.filter} : ${styles.active}`
                : styles.filter
            }
            onClick={() => {
              setActiveFilter("radius");
              setRadiusModal(true);
            }}
          >
            <FaRegDotCircle /> {t("main_page_map.nav_links.2")}
          </div>
          <div
            className={
              activeFilter === "tours"
                ? `${styles.filter} : ${styles.active}`
                : styles.filter
            }
            onClick={() => {
              setRadiusModal(false);
              setActiveFilter("tours");
            }}
          >
            <MdEvent />
            {t("main_page_map.nav_links.3")}
          </div>
          <div
            className={
              activeFilter === "hotels"
                ? `${styles.filter} : ${styles.active}`
                : styles.filter
            }
            onClick={() => {
              setRadiusModal(false);
              setActiveFilter("hotels");
            }}
          >
            <IoBedOutline />
            {t("main_page_map.nav_links.4")}
          </div>
          <div
            className={
              activeFilter === "shops"
                ? `${styles.filter} : ${styles.active}`
                : styles.filter
            }
            onClick={() => {
              setRadiusModal(false);
              setActiveFilter("shops");
            }}
          >
            <FiShoppingBag />
            {t("main_page_map.nav_links.5")}
          </div>
        </section>
        {radiusModal && (
          <div className={styles.radiusModal}>
            <input
              type="number"
              ref={radiusInputRef}
              placeholder={t("main_page_map.radius_placeholder")}
            />
            <FaTimes
              onClick={() => {
                setActiveFilter("all");
                setRadiusModal(false);
              }}
            />
            <button
              onClick={() => {
                setRadius(radiusInputRef.current.value);
                setRadiusModal(false);
                // Set radius in localstorage
                localStorage.setItem(
                  "radius",
                  JSON.parse(radiusInputRef.current.value)
                );
                queryClient.invalidateQueries(["RadiusTours", "RadiusShops"]);
              }}
            >
              {t("main_page_map.set_button_text")}
            </button>
          </div>
        )}
      </>
    )
  );
}
