import { useState } from "react";
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { useAuth } from "../../store/auth-context";
import { db } from "../../firebase/firebase";
import firebase from "../../../node_modules/firebase/compat";

const MapComp = ({ setShowOverlay, setPositions }) => {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [position, setPosition] = useState([]);
  const { currentUser } = useAuth();
  const id = currentUser?.uid;

  const options = {
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          const latitude = pos.coords.latitude;
          const longitude = pos.coords.longitude;

          setLat(latitude);
          setLong(longitude);
        },
        function () {
          alert("couldn't get your location! 😔");
        }
      );
    }
  }, [lat, long]);
  
  const HandleClickMap = () => {
    const map = useMapEvents({
      click(e) {
        const position = e.latlng;
        setPositions(position);
        setShowOverlay(true);
      },
    });
  };

  useEffect(() => {
    db.collection("users")
      .doc(id)
      .onSnapshot((doc) => {
        const data = doc.data();
        const workout = data?.workout;
        const position = workout?.map((item) => {
          return {
            lat: item.lat,
            lng: item.lng,
            type: item.type,
            at: new Date(item.at?.toDate()).toLocaleDateString(
              undefined,
              options
            ),
          };
        });
        setPosition(position);
      });
  }, [id]);

  return (
    <div className="darkLight"  id='map' >
      {lat ? (
        <MapContainer center={[lat, long]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />

          <HandleClickMap />

          {position &&
            position.map((pos, i) => (
              <Marker position={pos} icon={DefaultIcon} key={i + 1}>
                {pos.type === "running" ? (
                  <Popup  >
                    🏃‍♂️ {pos.type} on {pos.at}
                  </Popup>
                ) : (
                  <Popup autoClose={false} closeOnClick={false} >
                    🚴‍♀️ {pos.type} on {pos.at}
                  </Popup>
                )}
              </Marker>
            ))}
        </MapContainer>
      ) : (
        ""
      )}
    </div>
  );
};

let DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon-2x.png",
  iconSize: [20],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default MapComp;
