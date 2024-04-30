import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
    const navigate = useNavigate()
  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/">Home</Link>
      </li>
      <li className="navbar-item">
        <Link to="/lessons">Schedule Lesson</Link>
      </li>
      <li className="navbar-item">
        <Link to="/myLessons">My Lessons</Link>
      </li>
      {localStorage.getItem("piano_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("piano_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
