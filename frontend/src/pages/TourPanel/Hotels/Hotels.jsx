import allHotels from '../../../utils/hotels/hotel.json';
// Components
import Hotel from './Hotel/Hotel';
// React icons
import { AiOutlineArrowRight } from 'react-icons/ai';
// SCSS
import styles from './Hotels.module.scss';
import { useTranslation } from 'react-i18next';

export default function Hotels() {
    const [t] = useTranslation('main')
    return (
        <section className={styles.hotels}>
            <h2 className={styles.mainTitle}>{t("main_page_mobile_h1_text")} <AiOutlineArrowRight /></h2>
            <div className={styles.hotelWrapper}>
                {allHotels.hotels.map((hotel, index) => (
                    <Hotel hotel={hotel} key={index} />
                ))}
            </div>
        </section>
    )
}