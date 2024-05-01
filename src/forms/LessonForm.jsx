import { useEffect, useState } from "react";
import "./Form.css";
import { useNavigate, useParams } from "react-router-dom";
import { getLessonById, updateLesson } from "../services/lessonService.js";
import { getTimes } from "../services/timeService.js";

export const LessonForm = () => {
  // uses the useParams hook to extract the value of lessonId from the parameters
  const { lessonId } = useParams();
  //initializes a state variable named "lesson" with an initial state object 
  // the initial state object has two parameters which are both initialized with empty strings
  // this keeps date and time from being undefined off of initial render
  const [lesson, setLesson] = useState({date: "", time: ""});
  const [allTimes, setAllTimes] = useState([]);
  
  const navigate = useNavigate();

  // uses the useEffect hook, within it getLessonById fetches lesson data with lessonId as an argument
  useEffect(() => {
    // when a promise is fulfilled the .then() is invoked with a callback function as its argument
    getLessonById(lessonId).then((data) => {
        console.log("lesson data:", data)
        //this declares a constant variable "lessonObj" that accesses the first element (index 0) of the "data" array
        // which is the "id"
      const lessonObj = data[0];
      setLesson(lessonObj);
    });
  }, [lessonId]);

  // React hook takes two parameters: a callback function, and an optional dependency array
  // the callback function is the getTimes function that updates the state variable "allTimes" with the fetched data using "setAllTimes"
  // the empty array is the dependency array for useEffect. The effect is executed when the component first renders
  useEffect(() => {
    getTimes().then((data) => {
      setAllTimes(data);
    });
  }, []);
// declares a constant named "handDateChange" which is a function followed by arrow function syntax that takes "event" as a parameter
//then spread syntax is used on the "lessons" object and the event.target.value replaces the current date
  const handleDateChange = (event) => {
    setLesson({ ...lesson, date: event.target.value });
  };

  const handleTimeChange = (event) => {
    setLesson({ ...lesson, time: event.target.value });
  };

  const handleSave = (event) => {
    event.preventDefault();

    //retrieves a user object from the browsers local storage associated with the key "piano_user"
    //then parses it from a JSON string format back into a javascript object
    const currentUser = JSON.parse(localStorage.getItem("piano_user"))
    // declares a constant variable "userId" and sets it equal to the id property of the currentUser object
    const userId = currentUser.id

    // creates a "editedLesson" object with properties extracted from "lesson" state object and the userId
    const editedLesson = {
      id: lesson.id,
      date: lesson.date,
      time: lesson.time,
      studentId: lesson.studentId,
      teacherId: lesson.teacherId,
      userId: userId
    };
    // this function takes the editedLesson as an argument and then navigates to mylessons based on the lesson id
    updateLesson(editedLesson).then(() => {
      navigate(`/myLessons/${lesson.id}`);
    });
  };

  return (
    // the onSubmit event on the form triggers the "handleSave" function
    <form className="lesson-edit" onSubmit={handleSave}> 
      <h2>Update Lesson</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="lessonDate">Date</label>
          <input
            type="date"
            id="lessonDate"
            value={lesson.date}
            onChange={handleDateChange}
            required
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="lessonTime">Time</label>
          {/* the <select> is the dropdown element where users can select a time */}
          <select
          id="lessonTime"
          name="lessonTime"
          // sets the selected value of the dropdown to the value stored in the lesson.time state variable
            value={lesson.time}
            onChange={handleTimeChange}
            // the required attribute makes the dropdown required so the user must select an option before submitting the form
            required
            className="form-control"
          >
            <option value="">Select Time</option>
            {allTimes.map((time) => (
              <option key={time.id} value={time.time}>
                {time.time}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          {/*  the type="submit" acts as a submit button within a form the forms submit event is triggered 
          and any associated form submission handlers are executed*/}
          <button type="submit" className="form-button">
            Update Lesson
          </button>
        </div>
      </fieldset>
    </form>
  );
};
