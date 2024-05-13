import { Outlet, Route, Routes } from "react-router-dom";
import { StudentNav } from "../nav/StudentNav.jsx";
import { Home } from "../home/Home.jsx";
import { ScheduleLesson } from "../lessons/ScheduleLesson.jsx";
import { MyLessons } from "../myLessons/MyLessons.jsx";
import { LessonDetails } from "../myLessons/LessonDetails.jsx";
import { LessonForm } from "../forms/LessonForm.jsx";

export const StudentViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <StudentNav />
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
