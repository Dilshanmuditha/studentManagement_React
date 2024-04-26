import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { addAlert } from "../../features/alertSlice";
import AXIOS_INSTANCE from "../../services/AxiosInstance";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export interface Course {
  id: string;
  name: string;
}

function CourseList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [expandedModule, setExpandedModule] = useState<string>('');

  const Course = async () => {
    try {
      const body = {
        id: '0',
        name: '',
      };
      console.log(body);
      const data = await AXIOS_INSTANCE.post(`/courses`, body);
      console.log("response", data);
      if (data.status === 200) {
        dispatch(
          addAlert({
            alertState: true,
            alertType: "Success",
            alertMessage: "Successfully Added",
            alertDescription: "Course Registration is successfully completed.",
          })
        );
      }
      setLoading(false);
      navigate("/lecturer/lecturer");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCourses([{ id: "123", name: "Example Course" }]);
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
              <button onClick={() => Course()} style={{ width: '100%', marginTop: '10px' }}>
                Click Here To Course Register
              </button>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CourseList;
