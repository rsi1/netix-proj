import { useState } from "react";
import MapPicker from "../components/MapPicker.tsx";

export default function MapsPage() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  return (
    <div style={{ padding: 16 }}>
      <h2>Vyber místo kliknutím do mapy</h2>

      <MapPicker onLocationSelect={setCoords} />

      <div style={{ marginTop: 12 }}>
        {coords ? (
          <div>
            Vybráno: <b>{coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</b>
          </div>
        ) : (
          <div>Klikni do mapy…</div>
        )}
      </div>
    </div>
  );
}


export default function MapsPage() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  return (
    <div style={{ padding: 16 }}>
      <h2>Vyber místo kliknutím do mapy</h2>

      <MapPicker onLocationSelect={setCoords} />

      <div style={{ marginTop: 12 }}>
        {coords ? (
          <div>
            Vybráno: <b>{coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</b>
          </div>
        ) : (
          <div>Klikni do mapy…</div>
        )}
      </div>
    </div>
  );
}
