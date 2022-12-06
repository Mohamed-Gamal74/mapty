import { Form, Select, Input } from "antd";
import { useState } from "react";
import { useAuth } from "../../store/auth-context";
import { db } from "../../firebase/firebase";
import { doc } from "firebase/firestore";
import firebase from "../../../node_modules/firebase/compat";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {motion } from "framer-motion";

const selectOptions = [
  {
    value: "running",
    label: "Running",
  },
  {
    value: "cycling",
    label: "Cycling",
  },
];

const OverLay = ({ setShowOverlay, positions }) => {
  const { currentUser } = useAuth();
  const id = currentUser?.uid;
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const onFinish = (values) => {
    const { type, distance, duration, cadence } = values;
    db.collection("users")
      .doc(id)
      .update({
        workout: firebase.firestore.FieldValue.arrayUnion({
          type,
          distance,
          duration,
          cadence,
          lat: positions.lat,
          lng: positions.lng,
          at: new Date(),
          id : Math.random().toString(36).substr(2, 9)
        }),
      });
    toast.success("Workout Added Successfully", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setTimeout(() => {
      setShowOverlay(false);
    }, 1500);
  };

  const animation = {
    hidden: {
      opacity: 0,
      y: "-100vw",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
      },
    },
    exit: {
      y: "-100vw",
      transition: {
        ease: "easeInOut",
      },
    },
  };


 

  return (
    <motion.section
      variants={animation}
      initial="hidden"
      animate="visible"
      exit="exit"
      
      className="d-flex  align-items-center justify-content-center vh-100 text-white"
      id="overlay"
    >
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
        className="d-flex flex-column w-100"
      >
        <div className=" d-flex align-items-center justify-content-center ">
          <div className="d-flex flex-column align-items-start mx-5">
            <p className="mb-1">Type</p>
            <Form.Item name="type">
              <Select
                // defaultValue="Running"
                style={{ width: 150 }}
                onChange={handleChange}
                options={selectOptions}
                placeholder="type"
              />
            </Form.Item>
          </div>

          <div className="d-flex flex-column align-items-start mx-5">
            <p className="mb-1">Distance</p>
            <Form.Item name="distance">
              <Input placeholder="Km" />
            </Form.Item>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-center">
          <div className="d-flex flex-column align-items-start mx-5">
            <p className="mb-1">Duration</p>
            <Form.Item name="duration">
              <Input placeholder="min" />
            </Form.Item>
          </div>

          {selectedValue === "running" ? (
            <div className="d-flex flex-column align-items-start mx-5">
              <p className="mb-1">Cadence</p>
              <Form.Item name="cadence">
                <Input placeholder="step/min" />
              </Form.Item>
            </div>
          ) : (
            <div className="d-flex flex-column align-items-start mx-5">
              <p className="mb-1">Elev Gain</p>
              <Form.Item name="cadence">
                <Input placeholder="meters" />
              </Form.Item>
            </div>
          )}
        </div>

        <button className="green btn text-white w-25 mx-auto">Save</button>
      </Form>
      <ToastContainer />
    </motion.section>
  );
};

export default OverLay;
