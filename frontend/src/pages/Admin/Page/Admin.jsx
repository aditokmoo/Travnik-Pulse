import styles from "./Admin.module.scss";
import { Link } from "react-router-dom";
import { useGetTours } from "../../../hooks/useTours";
import { useGetAllShops } from "../../../hooks/useShops";
import { AiOutlineCalendar, AiOutlineStar } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { useGetUnapprovedReviews } from "../../../hooks/useReview";
import ReturnButton from "../../../components/ReturnButton/ReturnButton";
import Spinner from "../../../components/Spinner/Spinner";
import DesktopNav from "../../../components/DesktopNav/DesktopNav";
import MobileNav from "../../../components/MobileNav/MobileNav";
import { useTranslation } from "react-i18next";

export default function Admin() {
  const { data: tours, isLoading } = useGetTours();
  const { data: shops, isLoading: isLoadingShops } = useGetAllShops();
  const { data: unapprovedReviews, isLoading: isLoadingReviews } =
    useGetUnapprovedReviews();
  const [t] = useTranslation('profile');

  if (isLoading || isLoadingShops || isLoadingReviews) return <Spinner />;

  return (
    <>
      <DesktopNav />
      <MobileNav />
      <ReturnButton app={true} />
      <section className={styles.section}>
        <h2>{t("profile_page_home.h1_text")}</h2>
        <p>
        {t("profile_page_home.p_text")}
        </p>

        <div className={styles.linksWrapper}>
          <Link to="/app/admin/calendar">
            <span>01</span>
            <span className={styles.eventTitle}>{t("profile_page_home.links.main_link_text.1")}</span>
            <span className={styles.itemLength}>
              {tours.length} {t("profile_page_home.links.sub_link_text.1")}
            </span>
            <AiOutlineCalendar />
          </Link>
          <Link to="/app/admin/reviews">
            <span>02</span>
            <span className={styles.eventTitle}>{t("profile_page_home.links.main_link_text.2")}</span>
            <span className={styles.itemLength}>
              {unapprovedReviews.length} {t("profile_page_home.links.sub_link_text.2")}
            </span>
            <AiOutlineStar />
          </Link>
          <Link to="/app/admin/shops">
            <span>03</span>
            <span className={styles.eventTitle}>{t("profile_page_home.links.main_link_text.3")}</span>
            <span className={styles.itemLength}>
              {shops.length} {t("profile_page_home.links.sub_link_text.3")}
            </span>
            <BsCart2 />
          </Link>
        </div>
      </section>
    </>
  );
}
