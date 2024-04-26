import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import CustomInput from "../../components/inputBox";
import CustomSelect from "../../components/select";
import AXIOS_INSTANCE from "../../services/AxiosInstance";
import { useDispatch } from "react-redux";
import { addAlert } from "../../features/alertSlice";
import CustomButton from "../../components/buttons";
import { useNavigate } from "react-router-dom";

export interface FormData {
  name: string;
  coursecode: "0";
  lecturerId: Number | string;
}

function Department() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      coursecode: '',
      lecturerId: '',
    });
  };

  const courseRegisterFunction = async () => {
    try {
      const body = {
        name: formData.name,
        coursecode: formData.coursecode,
        lecturerId: formData.lecturerId,
      };
      console.log(body);
      const data = await AXIOS_INSTANCE.post(`/course`, body);
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
      navigate("/department")
    } catch (error) {
      console.log(error);
    }
  };
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
              <Typography>Lecturer Id</Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                id={0}
                style={{
                  width: "575px",
                }}
                TextFieldName={"lecturerId"}
                labelText={""}
                TextFieldType={"text"}
                variant={"outlined"}
                onchangeFunction={handleFieldChange}
                errorTextState={false}
                errorText={""}
                value={formData.lecturerId}
                textFieldSize={"small"}
                placeHolderText={"Enter the Lecturere ID"}
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
                  width: "110px",
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

export default Department;