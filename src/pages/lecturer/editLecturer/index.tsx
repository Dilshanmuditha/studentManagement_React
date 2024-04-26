import React, { ChangeEvent, useEffect, useState } from 'react'
import SidePopup from '../../../components/SidePopup'
import AXIOS_INSTANCE from '../../../services/AxiosInstance'
import { Box, CircularProgress, Grid, Typography, setRef } from '@mui/material'
import CustomInput from '../../../components/inputBox'
import CustomButton from '../../../components/buttons'
import { addAlert } from '../../../features/alertSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export interface FormData {
    name: string;
    nic: string;
    email: string;
    address: string;
    mobile: Number | string;
    userName: string;
    password: string;
  }
interface EditLecturerProps {
    isPopupOpen: boolean
    handleClosePopup: any
    selectedLecturerID: number | undefined
  }
const EditLecturer = ({
    isPopupOpen,
    handleClosePopup,
    selectedLecturerID,
  }: EditLecturerProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState<FormData>({
      name: "",
      nic: "",
      email: "",
      address: "",
      mobile: "",
      userName: "",
      password:""
    });
    const [loading, setLoading] = useState<boolean>(false);
    const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    };
  
    const lecturerUpdateFunction = async () => {
      try {
        const body = {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          nic: formData.nic,
          userName: formData.userName,
          mobile: formData.mobile,
          password: formData.password,
        };
        console.log(body);
        const data = await AXIOS_INSTANCE.put(`/lecturer/${selectedLecturerID}`, body);
        console.log("response", data);
        if (data.status == 200) {
          dispatch(
            addAlert({
              alertState: true,
              alertType: "Success", 
              alertMessage: "Successfully Updated",
              alertDescription: "Lecturer update is successfully completed.",
            })
          );
        }
        handleClosePopup();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchStudentDetail = async () => {
        try {
          const response = await AXIOS_INSTANCE.get(
            `/students/${selectedLecturerID}`
          );
          console.log(response.data)
          if (response.status == 200) {
            setFormData({
              name: response.data.name,
              nic: response.data.nic,
              mobile: response.data.mobile,
              address: response.data.address,
              userName: response.data.userName,
              email: response.data.email,
              password: response.data.password,
            })
          }
        } catch (error) {
          console.log("Fetch Lecturer error", error);
        }
      };
      useEffect(() => {
        fetchStudentDetail();
      }, []);
  return (
    <SidePopup
    popWidth={1000}
    onClose={handleClosePopup}
    title={"Edit Lecturer "}
    open={isPopupOpen}>
 <Box
      sx={{
        padding: "30px",
        flex: 1,
        overflow: "hidden",
        overflowY: "auto",
        marginTop:"20px"
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
          Lecturer Update
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
                  width: "450px",
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
                  width: "450px",
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
                  width: "450px",
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
                  width: "450px",
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
                  width: "450px",
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
                  width: "450px",
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
              buttonText={"Cancel"}
              id={1}
              buttonFunction={() => {
                  handleClosePopup()
              }}
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
                  "Update"
                )
              }
              disableState={loading ? true : false}
              id={0}
              buttonFunction={() => {
                lecturerUpdateFunction();
              }}
              style={{
                borderRadius: "10px",
              }}
            />
          </Grid>
        </Grid>
      </div>
    </Box>
    </SidePopup>
  )
}

export default EditLecturer