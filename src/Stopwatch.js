import React, { useState, useRef } from "react";
import "./Stopwatch.css";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef();
  const [buttonColor, setButtonColor] = useState("#0f0");

  function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(1, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    const ms = (milliseconds % 1000 / 1000).toFixed(2).toString().substr(2);
    return `${hours}:${minutes}:${seconds}.${ms}`;
  }

  function handleStartStopClick() {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setButtonColor("#0f0");
    } else {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
      setIsRunning(true);
      setButtonColor("#f00");
    }
  }

  function handleResetClick() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
    setButtonColor("#0f0");
  }

  function handleLapClick() {
    const newLap = formatTime(elapsedTime);
    if (laps.length >= 8) {
      setLaps([...laps.slice(1), newLap]);
    } else {
      setLaps([...laps, newLap]);
    }
  }

  function handleContinueClick() {
    const startTime = Date.now() - elapsedTime;
    intervalRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 10);
    setIsRunning(true);
    setButtonColor("#f00");
  }

  let buttons;
  if (isRunning) {
    buttons = (
      <div className="button-group">
        <button style={{ backgroundColor: "#FF8A1F", width: 100  }} onClick={handleLapClick}>Lap</button>
        <button style={{ backgroundColor: "#EB5757", width: 100  }} onClick={handleStartStopClick}>
          Stop
        </button>
      </div>
    );
  } else if (elapsedTime !== 0) {
    buttons = (
      <div className="button-group">
        <button style={{ backgroundColor: "#E5E7EB", width: 100  }} onClick={handleResetClick}>Reset</button>
        <button style={{ backgroundColor: "rgba(39, 174, 96, 0.2)", width: 100, display: 'flex', justifyContent: 'center'  }} onClick={handleContinueClick}>Continue</button>
      </div>
    );
  } else {
    buttons = (
      <div className="button-group">
        <button style={{ backgroundColor: "#27AE60", width: 335  }} onClick={handleStartStopClick}>Start</button>
      </div>
    );
  }

  const formattedTime = formatTime(elapsedTime);

  return (
<div className="stopwatch-container">
  <div className="stopwatch-header">freestopwatch</div>
  <div className="time-display-buttons">
    <div className="time-display">
      <div className="formattedTime">{formattedTime}</div>
    </div>
    {buttons}
  </div>
  <div className="lap-list">
    {laps.map((lap, index) => (
      <div key={index} className="lap-item">
        <span className="lap-number">Lap {index + 1}  :  </span>
        <span className="lap-time">{lap}</span>
      </div>
    ))}
  </div>
</div>

  );
}

export default Stopwatch;
