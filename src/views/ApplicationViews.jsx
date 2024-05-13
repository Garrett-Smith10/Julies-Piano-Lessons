import { useEffect, useState } from "react";
// import { Routes, Route, Outlet } from "react-router-dom";
// import { Home } from "../home/Home.jsx";
// import { NavBar } from "../nav/StudentNav.jsx";
// import { ScheduleLesson } from "../lessons/ScheduleLesson.jsx";
// import { MyLessons } from "../myLessons/MyLessons.jsx";
// import { LessonDetails } from "../myLessons/LessonDetails.jsx";
// import { LessonForm } from "../forms/LessonForm.jsx";
import { StudentViews } from "./StudentViews.jsx";
import { TeacherViews } from "./TeacherViews.jsx";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localPianoUser = localStorage.getItem("piano_user");
    const pianoUserObject = JSON.parse(localPianoUser);

    setCurrentUser(pianoUserObject);
  }, []);

  return currentUser.isStudent ? <StudentViews /> : <TeacherViews />;
};
