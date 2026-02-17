import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const cities = {
  brno: { name: "Brno", coords: [49.1951, 16.6068] as [number, number] },
  praha: { name: "Praha", coords: [50.0755, 14.4378] as [number, number] },
};

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 13);
  return null;
}

export default function MapPage() {
  const [selectedCity, setSelectedCity] = useState<keyof typeof cities>("brno");
  const current = cities[selectedCity];

  return (
    <div style={{ padding: 20 }}>
      <h1>ČR – rychlý výběr města</h1>

      <button onClick={() => setSelectedCity("brno")}>Brno</button>
      <button onClick={() => setSelectedCity("praha")} style={{ marginLeft: 10 }}>
        Praha
      </button>

      <div style={{ height: "600px", marginTop: 20 }}>
        <MapContainer
          center={current.coords}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <ChangeView center={current.coords} />

          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={current.coords}>
            <Popup>{current.name}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
