import React from "react";

import "./ProgressBar.css";
export const BasicProgressBarWithLabel = ({
  currentValue,
  label,
  maxValue,
}) => (
  <>
    <label for="progress-bar">{label}</label>
    <progress id="progress-bar" value={currentValue} max={maxValue}>
      {currentValue}%
    </progress>
  </>
);
