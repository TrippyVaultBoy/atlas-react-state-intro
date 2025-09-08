import { useState ,useEffect } from "react";

export default function SchoolCatalog() {
 
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("../public/api/courses.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);
  
  return (
    <div className="school-catalog">
      
      <h1>School Catalog</h1>
      
      <input type="text" placeholder="Search" />
      
      <table>
        <thead>
          <tr>
            <th>Trimester</th>
            <th>Course Number</th>
            <th>Courses Name</th>
            <th>Semester Credits</th>
            <th>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>

        {data.map((course) => (
          <tbody>
          <tr key={course.courseNumber}>
            <td>{course.trimester}</td>
            <td>{course.courseNumber}</td>
            <td>{course.courseName}</td>
            <td>{course.semesterCredits}</td>
            <td>{course.totalClockHours}</td>
            <td>
              <button>Enroll</button>
            </td>
          </tr>
          </tbody>
        ))}
        
        {/* <tbody>
          <tr>
            <td>1</td>
            <td>PP1000</td>
            <td>Beginning Procedural Programming</td>
            <td>2</td>
            <td>30</td>
            <td>
              <button>Enroll</button>
            </td>
          </tr>
        </tbody> */}
      </table>
      
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
