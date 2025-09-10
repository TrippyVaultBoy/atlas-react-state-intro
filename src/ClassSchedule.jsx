import{ useState, useContext } from "react";
import { EnrolledCourses } from "./App";

export default function ClassSchedule() {
  const { myCourses, setMyCourses } = useContext(EnrolledCourses);
  
  const dropCourse = (courseNumber) => {
    setMyCourses(myCourses.filter((course) => courseNumber !== course.courseNumber))
  }

  return (
    <div className="class-schedule">
      <h1>Class Schedule</h1>
      <table>
        
        <thead>
          <tr>
            <th>Course Number</th>
            <th>Course Name</th>
            <th>Drop</th>
          </tr>
        </thead>
        
        {/* <tbody>
          <tr>
            <td>OS1000</td>
            <td>Fundamentals of Open Source Operating Systems</td>
            <td>
              <button>Drop</button>
            </td>
          </tr>
        </tbody> */}

        <tbody>
          {myCourses.map((course) => (
            <tr key={course.courseNumber}>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>
                <button onClick={() => dropCourse(course.courseNumber)}>Drop</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
