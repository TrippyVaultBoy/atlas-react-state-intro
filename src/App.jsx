import {useState, createContext} from "react"

import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";

export const EnrolledCourses = createContext();

export default function App() {
  const [myCourses, setMyCourses] = useState([]);
  
  return (
    <div>
      <EnrolledCourses.Provider value={{ myCourses, setMyCourses }}>
        <Header />
        <SchoolCatalog />
        <ClassSchedule />
      </EnrolledCourses.Provider>
    </div>
  );
}
