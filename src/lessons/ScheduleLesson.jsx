import { useEffect, useState } from "react";
import "./ScheduleLesson.css";
import { getTimes, postNewLesson } from "../services/timeService.js";
import { MyLessons } from "../myLessons/MyLessons.jsx";
import { getStudents } from "../services/studentService.js";
import { checkForDuplicateLessons } from "../services/lessonService.js";

export const ScheduleLesson = () => {
  const [allTimes, setAllTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentUser, setCurrentUser] = useState({})
  const [studentId, setStudentId] = useState("")

  const render = () => {
    getTimes().then((timesArr) => {
      setAllTimes(timesArr);
    });
  };

  useEffect(() => {
    render();
    const user = JSON.parse(localStorage.getItem("piano_user"))
    setCurrentUser(user)

    getStudents().then((students) => {

      const student = students.find((student) => student.userId === user.id)
      if (student) {
        setStudentId(student.id)
      }
    })
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
              checkForDuplicateLessons(selectedDate, selectedTime).then((checkForDuplicate) => {
                if (checkForDuplicate) {

                  const defaultState = {
                    date: selectedDate,
                    time: selectedTime,
                    studentId: studentId,
                    teacherId: 1,
                    userId: currentUser.id
                  };
                  postNewLesson(defaultState).then(() => {
                    render()
                    setSelectedDate("");
                    setSelectedTime("");
                  });
                  <MyLessons date={selectedDate} time={selectedTime} />
                } else {
                  alert("A lesson at this date and time already exists. Please choose another")
                }
            })
            }}
          >
            Save
          </button>
        </p>
      </div>
    </div>
  );
};
