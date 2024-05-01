export const getNonStudentUsers = () => {
  return fetch(`http://localhost:8088/users?isStudent=false`).then(res => res.json())
}

export const getStudentUsers = () => {
  return fetch(`http://localhost:8088/users?isStudent=true`).then(res => res.json())
}




export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  )
}

export const createUser = (user) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json())
}

export const createStudent = (student) => {
  return fetch("http://localhost:8088/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  }).then((res) => res.json())
}
  