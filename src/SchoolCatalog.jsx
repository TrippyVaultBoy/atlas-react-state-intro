import { useState ,useEffect, useContext } from "react";
import { EnrolledCourses } from "./App";

export default function SchoolCatalog() {
  
  // Define states
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("trimester");
  const [sortDirection, setSortDirection] = useState("asc");
  const [page, setPage] = useState(1);
  const { myCourses, setMyCourses } = useContext(EnrolledCourses);

  // Fetch course data is fetched
  useEffect(() => {
    fetch("/api/courses.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);
  
  // Courses are filtered
  const filteredData = data.filter((course) =>
    course.courseNumber.toLowerCase().includes(search.toLowerCase()) || 
    course.courseName.toLowerCase().includes(search.toLowerCase())
  );

  // Courses are Sorted (make this more efficient later)
  const sortedData = filteredData.sort((a, b) => {
    if (sort === "trimester") {
      if (sortDirection === "asc") {
        return a.trimester.localeCompare(b.trimester);
      } else if (sortDirection === "desc") {
        return b.trimester.localeCompare(a.trimester);
      }
    } else if (sort === "courseNumber") {
      if (sortDirection === "asc") {
        return a.courseNumber.localeCompare(b.courseNumber);
      } else if (sortDirection === "desc") {
        return b.courseNumber.localeCompare(a.courseNumber);
      }
    } else if (sort === "courseName") {
      if (sortDirection === "asc") {
        return a.courseName.localeCompare(b.courseName);
      } else if (sortDirection === "desc") {
        return b.courseName.localeCompare(a.courseName);
      }
    } else if (sort === "semesterCredits") {
      if (sortDirection === "asc") {
        return a.semesterCredits - b.semesterCredits;
      } else if (sortDirection === "desc") {
        return b.semesterCredits - a.semesterCredits;
      }
    } else if (sort === "totalClockHours") {
      if (sortDirection === "asc") {
        return a.totalClockHours - b.totalClockHours;
      } else if (sortDirection === "desc") {
        return b.totalClockHours - a.totalClockHours;
      }
    }
    return 0;
  });

  // Calculate pagination data
  const page_size = 5;
  const currentPage = sortedData.slice((page - 1) * page_size, page * page_size);
  const hasMore = sortedData.length > page * page_size;
  const hasLess = page > 1;

  // Toggle sortDirection when tab is clicked
  const toggleSort = (column) => {
    if (sort === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSort(column);
      setSortDirection("asc");
    }
  };

  const enrollCourse = (course) => {
    if (!myCourses.includes(course)) {
      setMyCourses([...myCourses, course]);
      console.log(myCourses);
    }
  }

  // Return school-catalog
  return (
    <div className="school-catalog">
      
      <h1>School Catalog</h1>
 
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <table>
        <thead>
          <tr>
            <th onClick={() => toggleSort("trimester")}>Trimester</th>
            <th onClick={() => toggleSort("courseNumber")}>Course Number</th>
            <th onClick={() => toggleSort("courseName")}>Courses Name</th>
            <th onClick={() => toggleSort("semesterCredits")}>Semester Credits</th>
            <th onClick={() => toggleSort("totalClockHours")}>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>

        <tbody>
          {currentPage.map((course) => (
            <tr key={course.courseNumber}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                <button onClick={() => enrollCourse(course)}>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="pagination">
        <button
          disabled={!hasLess}
          onClick={() => setPage(page - 1)}
        >Previous</button>
        <button
          disabled={!hasMore}
          onClick={() => setPage(page + 1)}
        >Next</button>
      </div>
    </div>
  );
}
