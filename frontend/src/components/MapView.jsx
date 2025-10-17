import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [32, 32],
});

export default function MapView({ reports }) {
  const center = [25.5941, 85.1376]; // Default: Patna (you can set user's location)

  return (
    <div className="w-full h-[400px] rounded shadow">
      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {reports.map((r) => (
          <Marker
            key={r._id}
            position={[r.location.coordinates[1], r.location.coordinates[0]]}
            icon={icon}
          >
            <Popup>
              <strong>{r.title}</strong><br />
              {r.category} | {r.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
