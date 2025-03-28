import { useGetWeather } from "../../../hooks/useWeather";
import { IoIosPaperPlane } from "react-icons/io";
// image backgrounds
import cloudyBackground from "../../../assets/CloudBg.png";
import snowBackground from "../../../assets/snowBg.png";
import sunnyBackground from "../../../assets/weather-sunny-bg.jpg";
import rainBackground from "../../../assets/rainBg.png";
// image icons
import sunnyIcon from "../../../assets/weather-symbol.png";
import cloudyIcon from "../../../assets/cloudyIcon.png";
import rainIcon from "../../../assets/rainyIcon.png";
import snowIcon from "../../../assets/snowIcon.png";
// SCSS
import styles from "./Weather.module.scss";
import Spinner from "../../../components/Spinner/Spinner";

export default function Weather() {
  const { data, isLoading } = useGetWeather();

  if (isLoading) return <Spinner />;

  let backgroundImage;

  if (data.weather[0].main === "Clouds") {
    backgroundImage = { backgroundImage: `url(${cloudyBackground})` };
  } else if (data.weather[0].main === "Sunny") {
    backgroundImage = { backgroundImage: `url(${sunnyBackground})` };
  } else if (data.weather[0].main === "Clear") {
    backgroundImage = { backgroundImage: `url(${sunnyBackground})` };
  } else if (data.weather[0].main === "Rainy") {
    backgroundImage = { backgroundImage: `url(${rainBackground})` };
  } else if (data.weather[0].main === "Snowy") {
    backgroundImage = { backgroundImage: `url(${snowBackground})` };
  }

  return (
    <section className={styles.weatherSection} style={backgroundImage}>
      <div className={styles.weatherOverlay}></div>
      <div className={styles.left}>
        <p>
          {data.name} <IoIosPaperPlane />
        </p>
        <p className={styles.temperature}>
          {Math.floor(data.main.temp - 273.15)} &deg;
        </p>
      </div>
      <div className={styles.right}>
        {data.weather[0].main === "Clouds" && (
          <img src={cloudyIcon} alt="" className={styles.weatherSymbol} />
        )}
        {data.weather[0].main === "Clear" && (
          <img src={cloudyIcon} alt="" className={styles.weatherSymbol} />
        )}
        {data.weather[0].main === "Sunny" && (
          <img src={sunnyIcon} alt="" className={styles.weatherSymbol} />
        )}
        {data.weather[0].main === "Rainy" && (
          <img src={rainIcon} alt="" className={styles.weatherSymbol} />
        )}
        {data.weather[0].main === "Snowy" && (
          <img src={snowIcon} alt="" className={styles.weatherSymbol} />
        )}
        <p>{data.weather[0].main}</p>
        <p>
          H:{Math.floor(data.main.temp_max - 273.15)} L:
          {Math.floor(data.main.temp_min - 273.15)}
        </p>
      </div>
    </section>
  );
}
