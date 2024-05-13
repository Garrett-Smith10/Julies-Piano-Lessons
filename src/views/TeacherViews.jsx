import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "../home/Home.jsx";
import { TeacherNav } from "../nav/TeacherNav.jsx";

export const TeacherViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <TeacherNav />
            <Outlet />
          </>
        }
      >
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};
