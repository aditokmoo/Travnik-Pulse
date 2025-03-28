/* eslint-disable react/prop-types */
import { Marker, useMap } from "react-leaflet";
import L from "leaflet";
import styles from "./Markers.module.scss";
import { useEffect } from "react";
import { useMapContext } from "../../../context/MapContext";

export default function Markers({ tour }) {
  const { setSelectedTour, setShowModal, showModal } = useMapContext();
  const map = useMap();

  console.log(tour)

  const customIcon = new L.Icon({
    iconUrl: `/${tour.coverImg}`,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
  });

  const hotelIcon = new L.Icon({
    iconUrl: tour.pictures ? tour.pictures[0] : `/${tour.coverImg}`,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
  });

  const handleMarkerClick = () => {
    setSelectedTour(tour);
    setShowModal((prevState) => !prevState);
  };

  // Disable map dragging when the modal is open
  useEffect(() => {
    if (showModal) {
      map.dragging.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
    } else {
      map.dragging.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
    }
  }, [showModal, map]);

  return (
    <>
      {tour.coverImg && (
        <Marker
          id={styles.marker}
          eventHandlers={{ click: () => handleMarkerClick() }}
          position={[
            tour.location.coordinates[0],
            tour.location.coordinates[1],
          ]}
          icon={customIcon}
        ></Marker>
      )}
      {tour.pictures && (
        <Marker
          id={styles.marker}
          eventHandlers={{ click: () => handleMarkerClick() }}
          position={[
            tour.location.coordinates[0],
            tour.location.coordinates[1],
          ]}
          icon={hotelIcon}
        ></Marker>
      )}
    </>
  );
}
