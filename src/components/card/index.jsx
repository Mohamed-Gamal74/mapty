import { motion } from "framer-motion";

const Card = ({
  type,
  time,
  distance,
  duration,
  cadence,

}) => {
  const options = {
    month: "long",
    day: "numeric",
  };

  const animations = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
  };

  const workDate = new Date(time?.toDate()).toLocaleDateString(
    undefined,
    options
  );

  return (
    <motion.div
      {...animations}
     
      id="card"
      className={type === "cycling" ? "yellowBorder my-3 " : "greenBorder my-3"}
    >
      <p className="text-capitalize  ">
        {type} on {workDate}

       
      </p>

      <div className="d-flex align-items-center justify-content-between">
        <div>
          <span>{type === "cycling" ? "🚴‍♀️" : "🏃‍♂️"}</span>
          <span className="mx-1">{distance}</span>
          <small className="text-white-50">KM</small>
        </div>

        <div>
          <span>⏱</span>
          <span className="mx-1">{duration}</span>
          <small className="text-white-50">MIN</small>
        </div>

        <div>
          <span>⚡️</span>
          <span className="mx-1">{duration / distance}</span>
          <small className="text-white-50">MIN/KM</small>
        </div>

        {type === "running" ? (
          <div>
            <span>🦶🏼</span>
            <span className="mx-1">{cadence}</span>
            <small className="text-white-50">SPM</small>
          </div>
        ) : (
          <div>
            <span>⛰</span>
            <span className="mx-1">{cadence}</span>
            <small className="text-white-50">M</small>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
