import { useEffect, useState } from "react";
import "./MyLessons.css";
import { deleteLesson, getLessons } from "../services/timeService.js";
import { Link } from "react-router-dom"

export const MyLessons = () => {
  const [allLessons, setAllLessons] = useState([]);

  const render = () => {
    getLessons().then((lessonsArray) => {
      setAllLessons(lessonsArray);
    });
  };

  useEffect(() => {
    render();
  }, []);

  const deleteLessonValue = (lessonId) => {
    deleteLesson(lessonId).then(() => {
      render();
    });
  };

  return (
    <div className="lessons-container">
      {allLessons.map((lessonObj) => {
        return (
          <div className="lesson-card" key={lessonObj.id}>
            <h2>Scheduled Lesson:</h2>
            <p> Date: {lessonObj.date}</p>
            <p>Time: {lessonObj.time}</p>
            <div className="buttons">
              <div className="view-location">
                <Link to={`/myLessons/${lessonObj.id}`} className="view">View</Link>
              </div>
              <div className="delete-location">
                <button
                  className="delete"
                  onClick={() => {
                    deleteLessonValue(lessonObj.id);
                  }}
                >
                  {" "}
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
