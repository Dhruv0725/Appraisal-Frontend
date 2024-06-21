import React from "react";
import "./CircularProgressBar.css";

const CircularProgressBar = ({ value }) => {
  const percentage = (value / 10) * 100;
  const strokeWidth = 10; // Adjust as needed
  const radius = 40 - strokeWidth / 2; // Assuming 50% width/height for the progress bar
  const borderStrokeWidth = 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 10) * circumference;
  const dashOffset = circumference - progress;
  return (
    <div className="circular-progress-bar">
      <svg className="progress-ring">
        <circle
          className="progress-ring-circle"
          stroke="#3498db"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          fill="transparent"
          r={radius}
          cx="50%"
          cy="50%"
        />
      </svg>
      <div className="progress-value">{value}</div>
    </div>
  );
};

export default CircularProgressBar;
