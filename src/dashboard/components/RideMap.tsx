import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { Coordinates } from "../pages/BookingPage";


export const RideMap = ({ pickup, drop }: { pickup: Coordinates; drop: Coordinates }) => {
  const pickupLatLng: [number, number] = [pickup.lat, pickup.lng];
  const dropLatLng: [number, number] = [drop.lat, drop.lng];

  const pickupIcon = L.icon({
    iconUrl: "/PICKUP_ICON.png", // Make sure this path is correct and in `public` folder
    iconSize: [28, 28], // Set icon size
    iconAnchor: [16, 32], // Optional: sets the "tip" of the icon (bottom center)
  });

  const dropIcon = L.icon({
    iconUrl: "/DROP_ICON.png", // Also put this in `public`
    iconSize: [28, 28],
    iconAnchor: [16, 32],
  });

  return (
    <MapContainer
      center={pickupLatLng}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={pickupLatLng} icon={pickupIcon} />
      <Marker position={dropLatLng} icon={dropIcon} />
      <Polyline positions={[pickupLatLng, dropLatLng]} color="blue" />
    </MapContainer>
  );
};
