import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// fix ikon v bundlerech (Vite)
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type LatLng = { lat: number; lng: number };

function ClickMarker({
  onSelect,
}: {
  onSelect: (pos: LatLng) => void;
}) {
  const [pos, setPos] = useState<LatLng | null>(null);

  useMapEvents({
    click(e) {
      const p = { lat: e.latlng.lat, lng: e.latlng.lng };
      setPos(p);
      onSelect(p);
    },
  });

  return pos ? <Marker position={[pos.lat, pos.lng]} icon={markerIcon} /> : null;
}

export default function MapPicker({
  onLocationSelect,
  height = 420,
  center = [49.1951, 16.6068], // Brno default
  zoom = 8,
}: {
  onLocationSelect: (pos: LatLng) => void;
  height?: number;
  center?: [number, number];
  zoom?: number;
}) {
  return (
    <div style={{ height, width: "100%", borderRadius: 12, overflow: "hidden" }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickMarker onSelect={onLocationSelect} />
      </MapContainer>
    </div>
  );
}
