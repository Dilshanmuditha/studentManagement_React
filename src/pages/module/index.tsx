import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { addAlert } from "../../features/alertSlice";
import AXIOS_INSTANCE from "../../services/AxiosInstance";
import { Link, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CourseView from "../course";

export interface Course {
  id: string;
  name: string;
}

function CourseList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [expandedModule, setExpandedModule] = useState<string>('');
  
  const fetchCourseData = async () => {
    try {
      const response = await AXIOS_INSTANCE.get('/course');
      console.log(response);
      setCourses(response?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCourseData();
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
          Registered Courses 
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
                Course code: {course?.code}
                <br />
                Course name: {course.name}
              </Typography>

            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CourseList;
