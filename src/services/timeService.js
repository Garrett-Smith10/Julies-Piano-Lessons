export const getTimes = () => {
    return fetch("http://localhost:8088/times").then((res) => res.json())
}

export const getLessons = (userId) => {
    return fetch(`http://localhost:8088/lesson?userId=${userId}`).then((res) => res.json())
}

export const postNewLesson = async (newLesson) => {
    const postOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(newLesson), 
     }
     return await fetch('http://localhost:8088/lesson', postOptions) 
 }

 export const deleteLesson = async (lessonId) => {
    
    const deleteOptions = {

        method: "DELETE",
    }
     return await fetch(`http://localhost:8088/lesson/${lessonId}`, deleteOptions)
}