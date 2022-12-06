import MapComp from "../map";
import Sidbar from "../sidbar";
import OverLay from "../overlay";
import { useState } from "react";

const Home = ({ setIsAuth }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [positions, setPositions] = useState([]);

  return (
    <>
      <div id="home" >
        <Sidbar setIsAuth={setIsAuth} showOverlay={showOverlay} />

        <MapComp setPositions={setPositions} setShowOverlay={setShowOverlay} />
      </div>
      {showOverlay && (
        <OverLay positions={positions} setShowOverlay={setShowOverlay} />
      )}
    </>
  );
};

export default Home;
