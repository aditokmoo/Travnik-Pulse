// React icons
import { BsFillStarFill } from 'react-icons/bs';
// SCSS
import styles from './Hotel.module.scss';
import { useTranslation } from 'react-i18next';

export default function Hotel({ hotel }) {
    const [t] = useTranslation("main");
	return (
		<div className={styles.hotel} style={{ backgroundImage: `url(${hotel.pictures[0]})` }}>
			<div className={styles.hotelOverlay} />
			<div className={styles.content}>
                <h2>{hotel.name}</h2>
                <div className={styles.reviewStars}>
                    <div className={hotel.rating > 0 ? `${styles.star} ${styles.active}` : styles.star}>
                        <BsFillStarFill />
                    </div>
                    <div className={hotel.rating > 1 ? `${styles.star} ${styles.active}` : styles.star}>
                        <BsFillStarFill />
                    </div>
                    <div className={hotel.rating > 2 ? `${styles.star} ${styles.active}` : styles.star}>
                        <BsFillStarFill />
                    </div>
                    <div className={hotel.rating > 3 ? `${styles.star} ${styles.active}` : styles.star}>
                        <BsFillStarFill />
                    </div>
                    <div className={hotel.rating > 4 ? `${styles.star} ${styles.active}` : styles.star}>
                        <BsFillStarFill />
                    </div>
                </div>
            </div>
		</div>
	);
}
