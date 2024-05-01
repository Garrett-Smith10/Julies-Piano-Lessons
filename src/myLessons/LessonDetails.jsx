import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLessonById } from "../services/lessonService.js";
import { Link } from "react-router-dom"
import { deleteLesson } from "../services/timeService.js";

export const LessonDetails = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    getLessonById(lessonId).then((data) => {
      const lessonObj = data[0];
      setLesson(lessonObj);
    });
  }, [lessonId]);

  const deleteLessonValue = () => {
    deleteLesson(lessonId).then(() => {
        navigate("/myLessons")
    })
  }

  return (
    <section className="lesson">
      <header className="lesson-header">Lesson Details</header>
      <div className="lesson-info-student">
        <span className="lesson-info-student">Student : </span>
        {lesson.user?.name}
      </div>
      <div>
        <span className="lesson-info">Email : </span>
        {lesson.user?.email}
      </div>
      <div>
        <span className="lesson-info"> Date : </span>
        {lesson.date}
      </div>
      <div>
        <span className="lesson-info">Time : </span>
        {lesson.time}
      </div>
      <div className="lesson-info-teacher">
        <span className="lesson-info-teacher">Teacher : </span>
        {lesson.teacher?.name}
      </div>
      <div>
        <span className="lesson-info">Email: </span>
        {lesson.teacher?.email}
      </div>
      <div>
        <span className="lesson-info">Lesson Address :</span>
        {lesson.teacher?.address}
      </div>
      <div className="edit-location">
        <Link to={`/edit/${lessonId}`} className="edit-button">
          Edit
        </Link>
        <button onClick={deleteLessonValue} className="delete">
            Delete
        </button>
      </div>
    </section>
  );
};
