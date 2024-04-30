export const getLessonById = (lessonId) => {
  return fetch(
    `http://localhost:8088/lesson?id=${lessonId}&_expand=student&_expand=teacher`
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
