export const getTimes = () => {
    return fetch("http://localhost:8088/times").then((res) => res.json())
}

export const getLessons = () => {
    return fetch("http://localhost:8088/lesson").then((res) => res.json())
}

export const postNewAppointment = async (newAppointment) => {
    const postOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(newAppointment), 
     }
     return await fetch('http://localhost:8088/lesson', postOptions) 
 }

 export const deleteLesson = async (lessonId) => {
    
    const deleteOptions = {

        method: "DELETE",
    }
     return await fetch(`http://localhost:8088/lesson/${lessonId}`, deleteOptions)
}