/* eslint-disable react/prop-types */
import styles from "./EditTourMap.module.scss";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

import L from "leaflet";
import MarkerCustomIcon from "../../../assets/marker.svg";

const customIcon = L.icon({
  iconUrl: MarkerCustomIcon,
  iconSize: [32, 32], // Width and height of the icon,
  iconAnchor: [16, 32],
});

export default function EditTourMap({ position, setPosition }) {
  const handleMapClick = (e) => {
    setPosition([e.latlng.lat, e.latlng.lng]);
  };

  return (
    <div className={styles.map}>
      <MapContainer
        center={[44.2294, 17.643]}
        zoom={14}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler onMapClick={handleMapClick} />
        {position.length > 0 && (
          <Marker position={position} icon={customIcon} />
        )}
      </MapContainer>
    </div>
  );
}

function MapClickHandler({ onMapClick }) {
  const map = useMapEvents({
    click: (e) => {
      onMapClick(e);
    },
  });
}
