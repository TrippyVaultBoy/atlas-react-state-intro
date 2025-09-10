import { useContext } from "react";
import { EnrolledCourses } from "./App";

import logo from "./assets/logo.png";

export default function Header() {
  const { myCourses, setMyCourses } = useContext(EnrolledCourses);
  
  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">Classes Enrolled: {myCourses.length}</div>
    </div>
  );
}
