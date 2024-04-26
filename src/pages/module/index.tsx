// import { useEffect, useState } from "react";
// import { Box, Grid, Typography } from "@mui/material";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export interface Course {
//   id: string;
//   name: string;
// }

// function CourseList() {
//   const [courses, setCourses] = useState<Course[]>([]);

//   useEffect(() => {
//     async function fetchCourses() {
//       try {
//         const response = await axios.get("/api/courses");
//         setCourses(response.data);
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       }
//     }
//   const handleCourseChange = (e) => {
//     setSelectedCourse(e.target.value);
//     setExpandedModule('');
//   };

//   const dataScienceModules = [
//     {
//       name: 'Statistics',
//       content: [
//         { text: 'Descriptive statistics (mean, median, variance, etc.)', pdfLink: '/statistics.pdf' },
//         { text: 'Inferential statistics (hypothesis testing, confidence intervals)', pdfLink: '/statistics.pdf' },
//         { text: 'Probability distributions (normal, binomial, etc.)', pdfLink: '/statistics.pdf' }
//       ]
//     },
//     {
//       name: 'Programming and Tools',
//       content: [
//         { text: 'Python or R programming', pdfLink: '/programming.pdf' },
//         { text: 'Data manipulation with pandas or dplyr', pdfLink: '/data_manipulation.pdf' },
//         { text: 'Data visualization using matplotlib, seaborn, or ggplot2', pdfLink: '/data_visualization.pdf' }
//       ]
//     },
//     {
//       name: 'Machine Learning',
//       content: [
//         { text: 'Supervised learning (regression, classification)', pdfLink: '/programming.pdf' },
//         { text: 'Unsupervised learning (clustering, dimensionality reduction)', pdfLink: '/data_manipulation.pdf' },
//         { text: 'Model evaluation and selection', pdfLink: '/data_visualization.pdf' }
//       ]
//     },
//     {
//       name: 'Data Preprocessing',
//       content: [
//         { text: 'Data cleaning (handling missing values, outliers)', pdfLink: '/programming.pdf' },
//         { text: 'Feature engineering (creating new features)', pdfLink: '/data_manipulation.pdf' },
//         { text: 'Data scaling and normalization', pdfLink: '/data_visualization.pdf' }
//       ]
//     },
//     {
//       name: 'Big Data and Cloud Computing',
//       content: [
//         { text: 'Hadoop, Spark, or AWS', pdfLink: '/programming.pdf' },
//         { text: 'Distributed computing for large datasets', pdfLink: '/data_manipulation.pdf' },
//       ]
//     },
//     {
//       name: 'Deep Learning',
//       content: [
//         { text: 'Neural networks, TensorFlow, or PyTorch', pdfLink: '/programming.pdf' },
//         { text: 'Convolutional neural networks (CNNs) and recurrent neural networks (RNNs)', pdfLink: '/data_manipulation.pdf' },
//       ]
//     },
//     {
//       name: 'Business Acumen',
//       content: [
//         { text: 'Understanding domain-specific problems', pdfLink: '/programming.pdf' },
//         { text: 'Communicating results to stakeholders', pdfLink: '/data_manipulation.pdf' },
//       ]
//     },
   
//   ];


//   const digitalMarketingModules = [
//     {
//       name: 'Introduction to Digital Marketing',
//       content: [
//         { text: 'Why Internet Marketing', pdfLink: '/Why Internet Marketing.pdf' },
//         { text: 'Assignments', pdfLink: '/Assignments.pdf' }
//       ]
//     },
    
//   ];

//   const projectManagementModules = [
//     {
//       name: 'Introduction',
//       content: [
//         { text: 'Conception: ‘The journey begins’', pdfLink: '/What is a project?.pdf' },
//         { text: 'The project environment: strategic planning', pdfLink: '/statistics.pdf' }
//       ]
//     },
    
//     {
//       name: 'Feasibility',
//       content: [
//         { text: 'The feasibility study', pdfLink: '/feasibility study.pdf' },
//       ]
//     },
   
//   ];

//   const businessAnalyticsModules = [
//     {
//       name: 'Introduction',
//       content: [
//         { text: 'Getting Started with Spreadsheet Modeling and Business Analytics', pdfLink: '/statistics.pdf' },
//         { text: 'Harvesting Spreadsheet Data', pdfLink: '/statistics.pdf' },
//         { text: 'Visualizing and Communicating Insights In Excel', pdfLink: '/statistics.pdf' }
//       ]
//     },
//     {
//       name: 'Making Predictions and Forecasts with Data',
//       content: [
//         { text: 'Using Prescriptive Analytics in Excel', pdfLink: '/programming.pdf' }
//       ]
//     },
   
//   ];



//   const handleModuleClick = (moduleName) => {
//     if (expandedModule === moduleName) {
//       setExpandedModule('');
//     } else {
//       setExpandedModule(moduleName);
// >>>>>>> yamuna
//     }

//     fetchCourses();
//   }, []);

//   // Add an example course
//   useEffect(() => {
//     setCourses((prevCourses) => [
//       ...prevCourses,
//       { id: "123", name: "Example Course" },
//     ]);
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
//             </Link>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }

// export default CourseList;
import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

export interface Course {
  id: string;
  name: string;
}

function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [expandedModule, setExpandedModule] = useState<string>('');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get("/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourses();
  }, []);

  // Add an example course
  useEffect(() => {
    setCourses((prevCourses) => [
      ...prevCourses,
      { id: "123", name: "Example Course" },
    ]);
  }, []);

  return (
    <Box
      sx={{
        padding: "30px",
        flex: 1,
        overflow: "hidden",
        overflowY: "auto",
      }}
    >
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
          Course Register
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid item xs={4} key={course.id}>
            <Link to={`/modulelist/${course.id}`} style={{ textDecoration: "none" }}>
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
}

export default CourseList;
