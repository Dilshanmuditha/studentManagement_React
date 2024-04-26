import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

export interface Course {
  id: string;
  name: string;
}

function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);

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