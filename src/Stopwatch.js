import React, { useState, useRef } from "react";
import './Stopwatch.css';

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]); // Added state for laps
  const intervalRef = useRef();
  const [buttonColor, setButtonColor] = useState("#0f0"); // Added state for button color

  function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    const ms = (milliseconds % 1000).toString().padStart(3, "0");
    return `${hours}:${minutes}:${seconds}.${ms}`;
  }

  function handleStartStopClick() {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setButtonColor("#0f0"); // Change button color to green
    } else {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
      setIsRunning(true);
      setButtonColor("#f00"); // Change button color to red
    }
  }

  function handleResetClick() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]); // Reset laps array
    setButtonColor("#0f0"); // Reset button color to green
  }

  function handleLapClick() {
    const newLap = formatTime(elapsedTime);
    if (laps.length >= 8) {
      // If the number of laps exceeds 8, remove the first lap and add a new one to the end.
      setLaps([...laps.slice(1), newLap]);
    } else {
      setLaps([...laps, newLap]);
    }
  }

  const buttonText = isRunning ? "Stop" : "Start";
  const formattedTime = formatTime(elapsedTime);

  return (
    <div className="stopwatch-container">
      <div className="stopwatch-header">freestopwatch</div>
      <div className="time-display">
        <p>{formattedTime}</p>
      </div>
      <div className="button-group"> 
        <button style={{ backgroundColor: buttonColor }} onClick={handleStartStopClick}>
          {buttonText}
        </button>
        <button onClick={handleResetClick}>Reset</button>
        <button onClick={handleLapClick}>Lap</button>
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
