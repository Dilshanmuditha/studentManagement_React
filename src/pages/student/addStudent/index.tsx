import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import CustomInput from "../../../components/inputBox";
import CustomSelect from "../../../components/select";
import AXIOS_INSTANCE from "../../../services/AxiosInstance";
import { useDispatch } from "react-redux";
import { addAlert } from "../../../features/alertSlice";
import CustomButton from "../../../components/buttons";
import { useNavigate } from "react-router-dom";

export interface FormData {
  name: string;
  nic: string;
  email: string;
  address: string;
  mobile: Number | string;
  userName: string;
  password: string | number | undefined;
  confirmpassword: string | number | undefined;
}

function AddStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    nic: "",
    email: "",
    address: "",
    mobile: "",
    userName: "",
    password: "",
    confirmpassword: "",
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
      name: "",
      nic: "",
      email: "",
      address: "",
      mobile: "",
      userName: "",
      password: "",
      confirmpassword: "",
    });
  };

  const studentRegisterFunction = async () => {
    try {
      const body = {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        nic: formData.nic,
        userName: "std_"+formData.userName,
        password: formData.password, 
        mobile: formData.mobile,
        role: "student",
      };
      console.log(body);
      const data = await AXIOS_INSTANCE.post(`/student`, body);

      console.log("response", data);
      if (data.status == 200) {
        dispatch(
          addAlert({
            alertState: true,
            alertType: "Success",
            alertMessage: "Successfully Added",
            alertDescription: "Student Registration is successfully completed.",
          })
        );
      }
      setLoading(false);
      clearFormFields();
      navigate("/students/students")
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
          Student Register
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>Name</Typography>
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
                placeHolderText={"Name"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>NIC</Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                style={{
                  width: "575px",
                }}
                id={0}
                TextFieldName={"nic"}
                labelText={""}
                TextFieldType={"text"}
                variant={"outlined"}
                onchangeFunction={handleFieldChange}
                errorTextState={false}
                errorText={""}
                value={formData.nic}
                textFieldSize={"small"}
                placeHolderText={"NIC"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>Email</Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                style={{
                  width: "575px",
                }}
                id={0}
                TextFieldName={"email"}
                labelText={""}
                TextFieldType={"text"}
                variant={"outlined"}
                onchangeFunction={handleFieldChange}
                errorTextState={false}
                errorText={""}
                value={formData.email}
                textFieldSize={"small"}
                placeHolderText={"Email"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>Address</Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                id={0}
                style={{
                  width: "575px",
                }}
                TextFieldName={"address"}
                labelText={""}
                TextFieldType={"text"}
                variant={"outlined"}
                onchangeFunction={handleFieldChange}
                errorTextState={false}
                errorText={""}
                value={formData.address}
                textFieldSize={"small"}
                placeHolderText={"Address"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>Mobile</Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                id={0}
                style={{
                  width: "575px",
                }}
                TextFieldName={"mobile"}
                labelText={""}
                TextFieldType={"text"}
                variant={"outlined"}
                onchangeFunction={handleFieldChange}
                errorTextState={false}
                errorText={""}
                value={formData.mobile}
                textFieldSize={"small"}
                placeHolderText={"Mobile"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          padding: 0,
          backgroundColor: "#ffffff",
          marginTop: "20px",
          borderTop: "1px solid #ccc",
        }}
      >
        <Grid item xs={12}>
          <Typography
            sx={{
              color: "#ACACAC",
            }}
          >
            Add Credentials
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>User Name</Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                id={0}
                style={{
                  width: "575px",
                }}
                TextFieldName={"userName"}
                labelText={""}
                TextFieldType={"text"}
                variant={"outlined"}
                onchangeFunction={handleFieldChange}
                errorTextState={false}
                errorText={""}
                value={formData.userName}
                textFieldSize={"small"}
                placeHolderText={"User Name"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>New Password</Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                id={3}
                style={{
                  width: "575px",
                }}
                TextFieldName={"password"}
                labelText={""}
                placeHolderText={"New Password"}
                TextFieldType={""}
                variant={"outlined"}
                onchangeFunction={handleFieldChange}
                errorTextState={false}
                errorText={""}
                value={formData.password}
                textFieldSize={"small"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>Confirm Password</Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                id={3}
                style={{
                  width: "575px",
                }}
                TextFieldName={"confirmpassword"}
                labelText={""}
                placeHolderText={"Confirm Password"}
                TextFieldType={""}
                variant={"outlined"}
                onchangeFunction={handleFieldChange}
                errorTextState={false}
                errorText={""}
                value={formData.confirmpassword}
                textFieldSize={"small"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div style={{ marginTop: "auto" }}>
        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          sx={{
            padding: 2,
            backgroundColor: "#ffffff",
            gap: "8px",
            marginTop: "auto",
            borderTop: "1px solid #ccc",
          }}
        >
          <Grid item>
            <CustomButton
              variant={"outlined"}
              buttonText={"Clear"}
              id={1}
              buttonFunction={clearFormFields}
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
                studentRegisterFunction();
              }}
              style={{
                borderRadius: "10px",
              }}
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}

export default AddStudent;
