import { useState } from "react";
import styles from "./register.module.css";
import Signup from "../signup";
import Login from "../login";

const Register = ( { setIsAuth } ) => {
  const [activeBtn, setActiveBtn] = useState("login");

  const activeHandler = (e) => {
    setActiveBtn(e.target.value);
  };

  return (
    <section
      className={`${styles.container} vh-100 text-white d-flex align-items-center justify-content-center`}
    >
      <div className={`${styles.wrapper} shadow `}>
        <div className={`${styles.btnContainer} mb-2`}>
          <button
            className={activeBtn == "login" ? styles.active : ""}
            onClick={activeHandler}
            value="login"
          >
            Log in
          </button>
          <button
            className={activeBtn == "signup" ? styles.active : ""}
            onClick={activeHandler}
            value="signup"
          >
            Sign up
          </button>
        </div>

        {activeBtn == "login" && <Login setIsAuth={setIsAuth} />}

        {activeBtn == "signup" && <Signup  setIsAuth={setIsAuth}/>}
      </div>
    </section>
  );
};

export default Register;
