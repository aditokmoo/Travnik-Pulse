import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import MarkerCustomIcon from "../../../assets/marker.svg";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMapContext } from "../../../context/MapContext";

export default function LeafletRouting({
  tourLocation,
  currentPosition,
  cancelRouteRef,
}) {
  const map = useMap();
  const routingControlRef = useRef(null);
  const markersRef = useRef([]); // Store markers to be removed
  const { travelTime, setTravelTime } = useMapContext();

  useEffect(() => {
    // Update map center when tourLocation changes
    if (tourLocation) {
      map.setView(currentPosition, 19);
    }
  }, [tourLocation, currentPosition, map]);

  useEffect(() => {
    if (!routingControlRef.current) {
      const routingControl = L.Routing.control({
        waypoints: [L.latLng(currentPosition), L.latLng(tourLocation)],
        lineOptions: {
          styles: [
            {
              color: "#437de0",
              weight: 5,
            },
          ],
        },
        showAlternatives: false,
        routeWhileDragging: true,
        draggableWaypoints: false,
        createMarker: function (waypointIndex, waypoint, numberOfWaypoints) {
          const marker = L.marker(waypoint.latLng, {
            draggable: true,
            icon: L.icon({
              iconUrl: MarkerCustomIcon,
              iconSize: [32, 32],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32],
            }),
          });

          // Add markers to the array to be removed
          markersRef.current.push(marker);

          return marker;
        },
      });

      // Add event listener for 'routesfound' event
      routingControl.on("routesfound", function (e) {
        const routes = e.routes;
        if (routes.length > 0) {
          const totalTimeInSeconds = routes[0].summary.totalTime;
          const totalTimeInMinutes = totalTimeInSeconds / 60;
          setTravelTime(totalTimeInMinutes.toFixed(0));

          // Remove markers that are not part of the route
          markersRef.current.forEach((marker) => {
            map.removeLayer(marker);
          });
          markersRef.current = []; // Clear the array
        }
      });

      routingControlRef.current = routingControl;
    } else {
      routingControlRef.current
        .getPlan()
        .setWaypoints([L.latLng(currentPosition), L.latLng(tourLocation)]);
    }

    if (!map.hasLayer(routingControlRef.current)) {
      routingControlRef.current.addTo(map);
    }

    const cancelRoute = () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
        setTravelTime(null);
        map.setView(tourLocation, 15);
      }
    };

    if (cancelRouteRef.current) {
      cancelRouteRef.current.addEventListener("click", cancelRoute);
    }

    return () => {
      if (
        routingControlRef.current &&
        map.hasLayer(routingControlRef.current)
      ) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }

      if (cancelRouteRef.current) {
        cancelRouteRef.current.removeEventListener("click", cancelRoute);
      }
    };
  }, [map, currentPosition, tourLocation, cancelRouteRef]);

  return null;
}