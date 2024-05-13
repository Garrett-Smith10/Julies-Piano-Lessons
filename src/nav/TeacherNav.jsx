import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const TeacherNav = () => {
    const navigate = useNavigate()

  return (
    <ul className="navbar">
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
