import { useEffect, useState } from "react";
import "./Form.css";
import { useNavigate, useParams } from "react-router-dom";
import { getLessonById, updateLesson } from "../services/lessonService.js";
import { getTimes } from "../services/timeService.js";

export const LessonForm = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState({});
  const [allTimes, setAllTimes] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    getLessonById(lessonId).then((data) => {
        console.log("lesson data:", data)
      const lessonObj = data[0];
      setLesson(lessonObj);
    });
  }, [lessonId]);

  useEffect(() => {
    getTimes().then((data) => {
      setAllTimes(data);
    });
  }, []);

  const handleDateChange = (event) => {
    setLesson({ ...lesson, date: event.target.value });
  };

  const handleTimeChange = (event) => {
    setLesson({ ...lesson, time: event.target.value });
  };

  const handleSave = (event) => {
    event.preventDefault();

    const editedLesson = {
      id: lesson.id,
      date: lesson.date,
      time: lesson.time,
      studentId: lesson.studentId,
      teacherId: lesson.teacherId,
    };
    updateLesson(editedLesson).then(() => {
      navigate(`/myLessons/${lesson.id}`);
    });
  };

  return (
    <form className="lesson-edit" onSubmit={handleSave}> 
      <h2>Update Lesson</h2>
      <fieldset>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={lesson.date}
            onChange={handleDateChange}
            required
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Time</label>
          <select
            value={lesson.time}
            onChange={handleTimeChange}
            required
            className="form-control"
          >
            <option value="">Select Time</option>
            {allTimes.map((time) => (
              <option key={time.id} value={time.time}>
                {time.time}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button type="submit" className="form-button">
            Update Lesson
          </button>
        </div>
      </fieldset>
    </form>
  );
};
