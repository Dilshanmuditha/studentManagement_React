// import React, { useEffect, useState } from "react";
// import { Box, Grid, Typography } from "@mui/material";
// import { addAlert } from "../../features/alertSlice";
// import AXIOS_INSTANCE from "../../services/AxiosInstance";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export interface Course {
//   id: string;
//   name: string;
// }

// function CourseList() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [expandedModule, setExpandedModule] = useState<string>('');

//   const Course = async () => {
//     try {
//       const body = {
//         id: '0',
//         name: '',
//       };
//       console.log(body);
//       const data = await AXIOS_INSTANCE.post(`/courses`, body);
//       console.log("response", data);
//       if (data.status === 200) {
//         dispatch(
//           addAlert({
//             alertState: true,
//             alertType: "Success",
//             alertMessage: "Successfully Added",
//             alertDescription: "Course Registration is successfully completed.",
//           })
//         );
//       }
//       setLoading(false);
//       navigate("/course/course");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     setCourses([{ id: "123", name: "Example Course" }]);
//   }, []);

//   return (
//     <Box
//       sx={{
//         padding: "30px",
//         flex: 1,
//         overflow: "hidden",
//         overflowY: "auto",
//       }}
//     >
//       <Grid item xs={12}>
//         <Typography
//           sx={{
//             fontSize: "24px",
//             marginBottom: "20px",
//             textAlign: "center",
//             backgroundColor: "#024D81",
//             color: "white",
//             borderRadius: "10px",
//             height: "40px",
//           }}
//         >
//           Course Register
//         </Typography>
//       </Grid>
//       <Grid container spacing={2}>
//         {courses.map((course) => (
//           <Grid item xs={4} key={course.id}>
//             <Link to={`/modulelist/${course.id}`} style={{ textDecoration: "none" }}>
//               <Typography
//                 sx={{
//                   backgroundColor: "#024D81",
//                   color: "white",
//                   borderRadius: "10px",
//                   height: "100px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 {course.name}
//               </Typography>
//               {/* <button onClick={() => Course()} style={{ width: '100%', marginTop: '10px' }}>
//                 Click Here To Course Register
//               </button> */}
//             </Link>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }

// export default CourseList;



// import React, { useEffect, useState } from "react";
// import { Box, Grid, Typography } from "@mui/material";
// import { Link } from "react-router-dom";
// import AXIOS_INSTANCE from "../../services/AxiosInstance";

// export interface Course {
//   id: string;
//   name: string;
// }

// function CourseList() {
//   const [courses, setCourses] = useState<Course[]>([]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await AXIOS_INSTANCE.get("/course");
//         if (response.status === 200) {
//           setCourses(response.data);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return (
//     <Box sx={{ padding: "30px", flex: 1, overflow: "hidden", overflowY: "auto" }}>
//       <Grid item xs={12}>
//         <Typography
//           sx={{
//             fontSize: "24px",
//             marginBottom: "20px",
//             textAlign: "center",
//             backgroundColor: "#024D81",
//             color: "white",
//             borderRadius: "10px",
//             height: "40px",
//           }}
//         >
//           Courses
//         </Typography>
//       </Grid>
//       <Grid container spacing={2}>
//         {courses.map((course) => (
//           <Grid item xs={4} key={course.id}>
//             <Link to={`/course/${course.id}`} style={{ textDecoration: "none" }}>
//               <Typography
//                 sx={{
//                   backgroundColor: "#024D81",
//                   color: "white",
//                   borderRadius: "10px",
//                   height: "100px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 {course.name}
//               </Typography>
//             </Link>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }

// export default CourseList;

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAlert } from "../../features/alertSlice";
import { useEffect, useState } from "react";
import AXIOS_INSTANCE from "../../services/AxiosInstance";

const Department = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to track form data
  const [formData, setFormData] = useState({
    name: "",
    coursecode: "",
    lecturerId: "",
  });

  // Function to handle form field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to submit course registration
  const courseRegisterFunction = async () => {
    try {
      const { name, coursecode, lecturerId } = formData;
      const body = { name, coursecode, lecturerId };
      await AXIOS_INSTANCE.post("/course", body);
      dispatch(
        addAlert({
          alertState: true,
          alertType: "Success",
          alertMessage: "Successfully Added",
          alertDescription: "Course Registration is successfully completed.",
        })
      );
      // Redirect to the course list page
      navigate("/course");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // Your JSX for the Department component
        <Box sx={{ padding: "30px", flex: 1, overflow: "hidden", overflowY: "auto" }}>
      <Grid item xs={12}>
        <Typography
          sx={{
            fontSize: "24px",
            marginBottom: "20px",
            textAlign: "center",
            backgroundColor: "#024D81",
            color: "white",
            borderRadius: "10px",
            height: "40px",
          }}
        >
          Courses
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid item xs={4} key={course.id}>
            <Link to={`/course/${course.id}`} style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  backgroundColor: "#024D81",
                  color: "white",
                  borderRadius: "10px",
                  height: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {course.name}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Department;
