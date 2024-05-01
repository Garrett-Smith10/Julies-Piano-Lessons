import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Home } from "../home/Home.jsx";
import { NavBar } from "../nav/NavBar.jsx";
import { ScheduleLesson } from "../lessons/ScheduleLesson.jsx";
import { MyLessons } from "../myLessons/MyLessons.jsx";
import { LessonDetails } from "../myLessons/LessonDetails.jsx";
import { LessonForm } from "../forms/LessonForm.jsx";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localPianoUser = localStorage.getItem("piano_user");
    const pianoUserObject = JSON.parse(localPianoUser);

    setCurrentUser(pianoUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Home />} />
        <Route path="lessons" element={<ScheduleLesson />} />
        <Route path="myLessons">
          <Route index element={<MyLessons />} />
          <Route path=":lessonId" element={<LessonDetails />} />
        </Route>
      </Route>
      <Route path="edit/:lessonId" element={<LessonForm />} />
    </Routes>
  );
};