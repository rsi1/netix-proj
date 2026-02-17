import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationPicker({ setPosition }: any) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function MapsPage() {
  const [position, setPosition] = useState<[number, number] | null>(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>Světová mapa – klikni kamkoliv</h1>

      {position && (
        <p>
          Vybraná pozice: {position[0].toFixed(5)}, {position[1].toFixed(5)}
        </p>
      )}

      <div style={{ height: "600px" }}>
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LocationPicker setPosition={setPosition} />

          {position && (
            <Marker position={position}>
              <Popup>
                {position[0].toFixed(4)}, {position[1].toFixed(4)}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
