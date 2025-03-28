/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import styles from "./Map.module.scss";
import "leaflet/dist/leaflet.css";
import { useTouristDataContext } from "../../context/TouristDataContext";
import L from "leaflet";
import MarkerCustomIcon from "../../assets/marker.svg";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useRef } from "react";

const customIcon = L.icon({
  iconUrl: MarkerCustomIcon,
  iconSize: [32, 32], // Width and height of the icon,
  iconAnchor: [16, 32],
});

const travnikCoords = [44.2294, 17.643];
export default function Map() {
  const mapRef = useRef();
  const { setPosition, position } = useTouristDataContext();
  const handleMapClick = (e) => {
    setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
  };

  useEffect(() => {
    if (position && mapRef.current) {
      mapRef.current.setView(
        [position.lat, position.lng],
        mapRef.current.getZoom()
      );
    }
  }, [position]);

  return (
    <div className={styles.map}>
      <MapContainer
        center={position ? [position.lat, position.lng] : travnikCoords}
        zoom={14}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler onMapClick={handleMapClick} mapRef={mapRef} />
        {position && <Marker position={position} icon={customIcon} />}
      </MapContainer>
    </div>
  );
}

function MapClickHandler({ onMapClick, mapRef }) {
  const map = useMap();

  useEffect(() => {
    // Save the map instance for later use
    mapRef.current = map;
  }, [map, mapRef]);

  useMapEvents({
    click: (e) => {
      onMapClick(e);
    },
  });

  return null; // This component doesn't render anything, it just handles map events
}
