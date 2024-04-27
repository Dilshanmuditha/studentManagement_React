import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import CustomInput from "../../components/inputBox";
import CustomSelect, { IdropDown } from "../../components/select";
import AXIOS_INSTANCE from "../../services/AxiosInstance";
import { useDispatch } from "react-redux";
import { addAlert } from "../../features/alertSlice";
import CustomButton from "../../components/buttons";
import { useNavigate } from "react-router-dom";

export interface FormData {
  name: string;
  coursecode: "0";
  lecturerId: Number | string | any;
}

function Department() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lecture, setLecture] = useState<IdropDown[]>([])
  const [lectureId, setLectureId] = useState<{
    label: string
    value: string | number
  } | null>({ label: "", value: "" })
  const [formData, setFormData] = useState<FormData>({
    name: "",
    coursecode: "0",
    lecturerId: "",

  });
  const [loading, setLoading] = useState<boolean>(false);
  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const clearFormFields = () => {
    setFormData({
      name: '',
      coursecode: '0',
      lecturerId: '',
    });
  };
  const fetchLectureData = async () => {
    try {
      const response = await AXIOS_INSTANCE.get(/lecturer)
      
      if (response.status === 200) {
        const result = response?.data

        const formattedStates = result.map((item: any) => ({
          label: item.name,
          value: item.id,
        }))
        setLecture(formattedStates)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const courseRegisterFunction = async () => {
    try {
      const body = {
        name: formData.name,
        code: formData.coursecode,
        lecturer_id: formData.lecturerId,
      };
      console.log(body);
      const data = await AXIOS_INSTANCE.post(/course, body);
      console.log("response", data);
      if (data.status == 200) {
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
      clearFormFields();
      navigate('/University/degree');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLectureData()
  }, [])
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
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>Course Name</Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                style={{
                  width: "575px",
                }}
                id={0}
                TextFieldName={"name"}
                labelText={""}
                TextFieldType={"text"}
                variant={"outlined"}
                onchangeFunction={handleFieldChange}
                errorTextState={false}
                errorText={""}
                value={formData.name}
                textFieldSize={"small"}
                placeHolderText={"Enter the Course Name"}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={1}>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>Course Code</Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                style={{
                  width: "575px",
                }}
                id={0}
                TextFieldName={"coursecode"}
                labelText={""}
                TextFieldType={"text"}
                variant={"outlined"}
                onchangeFunction={handleFieldChange}
                errorTextState={false}
                errorText={""}
                value={formData.coursecode}
                textFieldSize={"small"}
                placeHolderText={"Enter the Course code"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1}>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>Lecturer</Typography>
            </Grid>
            <Grid item xs={12}>
            <CustomSelect
              label={""}
              placeHolderText={"Lecturer"}
              autocompleteSize={"small"}
              option={lecture}
              value={lectureId}
              onchangeValue={(_e, n) => {
                setLectureId(n)
                setFormData((prevData) => ({
                  ...prevData,
                  lecturerId: n?.value,
                }))
              }}
            />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="flex-end"
        alignItems="center"
        sx={{
          padding: 0,
          backgroundColor: "#ffffff",
          marginTop: "20px",
          borderTop: "1px solid #ccc",
        }}
      >
        <Grid item xs={12}>
          <Grid container spacing={1} justifyContent="flex-end">
            <Grid item>
              <CustomButton
                variant={"outlined"}
                buttonText={"Cancel"}
                id={1}
                buttonFunction={clearFormFields}
                // buttonFunction={() => {
                // }}
                style={{
                  borderRadius: "10px",
                  width: "220px",
                }}
              />
            </Grid>
            <Grid item>
              <CustomButton
                variant={"contained"}
                buttonText={
                  loading ? (
                    <CircularProgress sx={{ color: "white" }} size={28} />
                  ) : (
                    "Create"
                  )
                }
                disableState={loading ? true : false}
                id={0}
                buttonFunction={() => {
                  courseRegisterFunction();
                }}
                style={{
                  borderRadius: "10px",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Department;
