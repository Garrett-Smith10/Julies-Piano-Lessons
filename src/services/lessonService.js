export const getLessonById = (lessonId) => {
  return fetch(
    `http://localhost:8088/lesson?id=${lessonId}&_expand=student&_expand=teacher&_expand=user`
  ).then((res) => res.json());
};

export const updateLesson = (lesson) => {
  return fetch(`http://localhost:8088/lesson/${lesson.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lesson),
  });
};


export const checkForDuplicateLessons = (date, time) => {
    return fetch(
        `http://localhost:8088/lesson?date=${date}&time=${time}`
      ).then((res) => res.json())
      .then((lessons) => lessons.length === 0);
}