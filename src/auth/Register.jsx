import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { getUserByEmail, createUser, createStudent } from "../services/userServices.js"

export const Register = (props) => {
  const [student, setStudent] = useState({
    email: "",
    name: "",
    isStudent: true,
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    createUser(student).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "piano_user",
          JSON.stringify({
            id: createdUser.id,
            student: createdUser.isStudent,
          })
        )

        const { email, id } = createdUser

        const newStudent = {
            email,
            userId: id,
            phone: "1234567890"
        }

        createStudent(newStudent).then(() => {
            navigate("/")
        })

      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(student.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateStudent = (evt) => {
    const copy = { ...student }
    copy[evt.target.id] = evt.target.value
    setStudent(copy)
  }

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1>Julie's Piano Lessons</h1>
        <h2>Please Register</h2>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateStudent}
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateStudent}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            {/* <label>
              <input
                onChange={(evt) => {
                  const copy = { ...student }
                  copy.isStudent = evt.target.checked
                  setStudent(copy)
                }}
                type="checkbox"
                id="isStudent"
              />
              I am a teacher{" "}
            </label> */}
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <button className="login-btn btn-info" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}
