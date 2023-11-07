import React from "react";
import "./Alert.scss";

//STRING INTERPOLATION ->  {`alert alert--${type}`}

export default function alert({
  data: { message, details = [], type = "error" },
}) {
  if (!message) return null; //if no error to display, the alert box should disappear

  return (
    <div className={`alert alert--${type}`}>
      <p className="alert__message">{message}</p>
      <ul className="alert__details">
        {details?.map((detail, index) => (
          <li key={index} className="alert__detail">
            {detail.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
