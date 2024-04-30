import { useEffect, useState } from "react";
import "./ScheduleLesson.css";
import { getTimes, postNewAppointment } from "../services/timeService.js";
import { MyLessons } from "../myLessons/MyLessons.jsx";

export const ScheduleLesson = () => {
  const [allTimes, setAllTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const render = () => {
    getTimes().then((timesArr) => {
      setAllTimes(timesArr);
    });
  };

  useEffect(() => {
    render();
  }, []);

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="schedule-container">
      <div>
        <label htmlFor="start">Schedule Date:</label>
        <input
          type="date"
          id="start"
          name="lessons-start"
          min="2024-01-01"
          max="2024-12-31"
          value={selectedDate}
          onChange={(event) => {
            handleDateChange(event);
          }}
        />
      </div>
      <div>
        <label htmlFor="time">Time:</label>
        <select
          name=""
          id="time"
          value={selectedTime}
          onChange={handleTimeChange}
        >
          <option value="">Select Time</option>
          {allTimes.map((time) => (
            <option key={time.id} value={time.time}>
              {time.time}
            </option>
          ))}
        </select>
        <p className="button">
          <button
            className="save"
            onClick={() => {
              const defaultState = {
                date: selectedDate,
                time: selectedTime,
                studentId: 1,
                teacherId: 1
              };
              postNewAppointment(defaultState).then(() => {
                render()
                setSelectedDate("");
                setSelectedTime("");
              });
              <MyLessons date={selectedDate} time={selectedTime} />
            }}
          >
            Save
          </button>
        </p>
      </div>
    </div>
  );
};
