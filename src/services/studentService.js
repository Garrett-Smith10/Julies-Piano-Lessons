export const getStudents = () => {
  return fetch(`http://localhost:8088/students`).then((res) => res.json());
}

