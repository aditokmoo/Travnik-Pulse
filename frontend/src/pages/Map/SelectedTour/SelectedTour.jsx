import ReactDOM from 'react-dom';
import SelectedTourStyles from './SelectedTour.module.scss';
import { BiSolidChevronDown } from 'react-icons/bi';
import { MdDirections } from 'react-icons/md';
import { FaWalking } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import { GiSandsOfTime } from 'react-icons/gi';
import { TfiMoney } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import { useMapContext } from '../../../context/MapContext';
import { useTranslation } from 'react-i18next';

const SelectedTour = () => {
  const { setShowModal, selectedTour, setSelectedTour, setTourLocation, travelTime } = useMapContext();
  const [t] = useTranslation('main')
  const travelConvertedToSeconds = travelTime * 60;

  return ReactDOM.createPortal(
    <div className={SelectedTourStyles.customModal}>
      <div className={SelectedTourStyles.mainSection}>
        <span
          className={SelectedTourStyles.closeModal}
          onClick={() => {
            setShowModal(false)
            setSelectedTour({})
          }
        }
        >
          <BiSolidChevronDown />
        </span>
        <div className={SelectedTourStyles.content}>
          <h3>{selectedTour.name}</h3>
        </div>
        <div className={SelectedTourStyles.btns}>
          <button
            onClick={() => {
              setShowModal(false);
              setTourLocation(selectedTour.location.coordinates);
            }}
          >
            <MdDirections />
            {t("main_page_map.popup_details.direction_button_text")}
          </button>
          {selectedTour?.type !== 'hotels' && !selectedTour.shopName && (
            <Link to={`/app/tour/${selectedTour._id}`}>{t("main_page_map.popup_details.see_more_button_text")}</Link>
          )}
        </div>
        <img
          src={
            selectedTour?.type !== 'hotels'
              ? `/${selectedTour.coverImg}`
              : selectedTour.pictures[0]
          }
          className={SelectedTourStyles.img}
          alt=""
        />
        <div className={SelectedTourStyles.navigation}>
          <ul>
            <li>{t("main_page_map.popup_details.overview_text")}</li>
          </ul>
        </div>
      </div>
      <div className={SelectedTourStyles.navContent}>
        <ul>
          <li>
            <FaWalking />
            {travelTime
                ? travelTime > 60
                  ? Math.floor(travelTime / 60) + ' h' :
                  travelConvertedToSeconds <= 60 ? Math.floor(travelConvertedToSeconds) + ' s'
                  : travelTime + ' min'
                : t("main_page_map.popup_details.overview_route_calculate")}
          </li>
          {selectedTour.type !== 'hotels' && !selectedTour.shopName && (
            <>
              <li>
                <IoMdTime />
                {selectedTour.time}
              </li>
              <li>
                <GiSandsOfTime />
                {Math.floor(selectedTour.duration / 60)} hours
              </li>
              <li>
                <TfiMoney />
                {selectedTour.price === 'FREE' ? selectedTour.price : selectedTour.price + ' KM'}
              </li>
            </>
          )}
        </ul>
      </div>
    </div>,
    document.body
  );
};

export default SelectedTour;
