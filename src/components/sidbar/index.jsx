import logo from "../../logo.png";
import img from "../../img.png";
import { IoMdLogOut } from "react-icons/io";
import { useAuth } from "../../store/auth-context";
import { db } from "../../firebase/firebase";
import { useState, useEffect } from "react";
import Card from "../card";

const Sidbar = ({ setIsAuth, showOverlay }) => {
  const { currentUser, logout } = useAuth();
  const id = currentUser?.uid;
  const [user, setUser] = useState("");
  const [workout, setWorkout] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(id)
      .onSnapshot((doc) => {
        const data = doc.data();
        setUser(data?.userName);
        if (data?.workout) {
          setWorkout(data?.workout);
        }
      });
  }, [showOverlay, id]);

  const logoutHandler = () => {
    logout();
    setIsAuth(false);
  };

  return (
    <div
      id="sidebar"
      className="dark text-white d-flex flex-column align-items-center position-relative"
    >
      <div style={{ width: "150px" }} className="mb-5">
        <img src={logo} alt="logo" className="img-fluid" />
      </div>

      {workout.length === 0 ? (
        <div className=" text-center my-5">
          <img src={img} alt="img" className="w-50 " />
          <h2 className="text-capitalize ">no workout to show add now!</h2>
        </div>
      ) : (
        <div id="cardContainer">
          {workout.map((work, i) => (
            <Card
              type={work.type}
              key={i + 1}
              distance={work.distance}
              duration={work.duration}
              cadence={work.cadence}
              time={work.at}
              id={work.id}
            />
          ))}
        </div>
      )}

      <footer className="px-3 mt-4 w-100 d-flex align-items-center justify-content-between ">
        <p className="text-uppercase m-0">
          Hello, <span className="greenText fw-bolder">{user}</span>
        </p>
        <button className="btn " onClick={logoutHandler}>
          <IoMdLogOut className="greenText" style={{ fontSize: "25px" }} />
        </button>
      </footer>
    </div>
  );
};

export default Sidbar;
