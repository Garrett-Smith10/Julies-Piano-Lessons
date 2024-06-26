import { useEffect, useState } from "react";
import "./MyLessons.css";
import { deleteLesson, getLessons } from "../services/timeService.js";
import { Link } from "react-router-dom"

export const MyLessons = () => {
  const [myLessons, setMyLessons] = useState([]);

  const render = () => {
    getLessons().then((lessonsArray) => {
      setMyLessons(lessonsArray);
    });
  };

  
    useEffect(() => {
      const currentUser = JSON.parse(localStorage.getItem("piano_user"))
      const userId = currentUser.id
      getLessons(userId).then((lessonsArray) => {
        setMyLessons(lessonsArray)
      })
    }, []);
  

  const deleteLessonValue = (lessonId) => {
    deleteLesson(lessonId).then(() => {
      setMyLessons(previousLessons => previousLessons.filter(lesson => lesson.id !== lessonId))
    });
  };

  return (
    <div className="lessons-container">
      {myLessons.map((lessonObj) => {
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