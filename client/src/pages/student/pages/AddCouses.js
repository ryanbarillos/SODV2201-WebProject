import React, { useEffect, useState } from "react";
import CourseList from "../components/CourseList";
import useAuthContext from "../../../hooks/useAuthContext";

function AddCourses() {
  const [termNow, termNowSet] = useState(1),
    [termNext, termNextSet] = useState(termNow === 4 ? 0 : termNow + 1),
    [courses, setCourses] = useState(null),
    user = useAuthContext().user;

  // Get courses
  useEffect(() => {
    const courseList = async () => {
      try {
        // Error: aborted
        //     at PendingOperation.abort (/home-extra/compdev/Documents/software-development/from-school/bow-valley-college/term-03/SODV2201/SODV2201-WebProject/backend/node_modules/tarn/dist/PendingOperation.js:25:21)
        //     at /home-extra/compdev/Documents/software-development/from-school/bow-valley-college/term-03/SODV2201/SODV2201-WebProject/backend/node_modules/tarn/dist/Pool.js:208:25
        //     at Array.map (<anonymous>)
        //     at /home-extra/compdev/Documents/software-development/from-school/bow-valley-college/term-03/SODV2201/SODV2201-WebProject/backend/node_modules/tarn/dist/Pool.js:207:53
        //     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

        const response = await fetch("/api/course/all", {
          method: "GET",
          headers: { Authorization: `Bearer ${user.token}` },
        });

        // console.log(coursesNew);
        // console.log(response.json());
        if (response.ok) {
          const coursesNew = await response.json();
          // if (coursesNew) {
          // console.log(coursesNew);
          // setCourses(coursesNew);
          // console.log(courses);
          // }
        }
      } catch (err) {
        console.log("Error\n" + err.message);
      }
    };
    if (user) {
      courseList();
    }
  }, [user]);

  return (
    <div>
      {" "}
      <h1>You are in Term {termNow}</h1>
      <h2>Select Your Course(s)</h2>
      {/* {courses && (
        <CourseList courses={courses} term={termNow} mode={"enroll"} />
      )} */}
    </div>
  );
}

export default AddCourses;
