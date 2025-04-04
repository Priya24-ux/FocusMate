

import React, { useState, useEffect } from "react";
import './PomodoroTimer.css'; // Import custom CSS for Pomodoro Timer

const PomodoroTimer = () => {
  const [workDuration, setWorkDuration] = useState(25 * 60); // default 25 minutes in seconds
  const [breakDuration, setBreakDuration] = useState(5 * 60); // default 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isWorking, setIsWorking] = useState(true); // true for work, false for break
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0); // track completed Pomodoro sessions

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            handleSessionComplete();
            return isWorking ? breakDuration : workDuration; // switch to break or work
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, isWorking, workDuration, breakDuration]);

  const handleSessionComplete = () => {
    if (isWorking) {
      setCompletedSessions(completedSessions + 1);
    }
    setIsWorking(!isWorking); // Switch between work and break
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(workDuration); // Reset to work time
  };

  const handleWorkDurationChange = (e) => {
    setWorkDuration(e.target.value * 60); // convert minutes to seconds
    if (isWorking) setTimeLeft(e.target.value * 60);
  };

  const handleBreakDurationChange = (e) => {
    setBreakDuration(e.target.value * 60); // convert minutes to seconds
  };

  return (
    <div className="pomodoro-timer">
      <h2 className="pomodoro-title">Pomodoro Timer</h2>
      <div className="timer-settings">
        <label className="settings-label">
          Work Duration:
          <input
            type="number"
            value={workDuration / 60} // convert seconds back to minutes
            onChange={handleWorkDurationChange}
            min="1"
            max="60"
            className="settings-input"
          /> minutes
        </label>
        <label className="settings-label">
          Break Duration:
          <input
            type="number"
            value={breakDuration / 60} // convert seconds back to minutes
            onChange={handleBreakDurationChange}
            min="1"
            max="30"
            className="settings-input"
          /> minutes
        </label>
      </div>

      <div className="timer-display">
        <div className={`clock-face ${isWorking ? "work" : "break"}`}>
          <p className="time-left">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</p>
        </div>
      </div>

      <div className="timer-controls">
        <button onClick={toggleTimer} className="btn">{isRunning ? "Pause" : "Start"}</button>
        <button onClick={resetTimer} className="btn">Reset</button>
      </div>

      <div className="session-stats">
        <h3>Completed Sessions: {completedSessions}</h3>
      </div>
    </div>
  );
};

export default PomodoroTimer;
