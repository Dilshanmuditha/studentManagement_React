import React, { ChangeEvent, useState } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import CustomInput from "../../components/inputBox";
import CustomButton from "../../components/buttons";
import { useNavigate } from "react-router-dom";

export interface FormData {
  name: string;
  modulecode: string;
  modulecontent: string;
  lectureMaterialUpload: File | null;
  lectureMaterial: string;
  lecturerId: string;
}

function Addmodule() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
    name: string;
    modulecode: string;
    modulecontent: string;
    lectureMaterialUpload: File | null;
    lectureMaterial: string;
    lecturerId: string;
  }>({
    name: "",
    modulecode: "",
    modulecontent: "",
    lectureMaterialUpload: null,
    lectureMaterial: "",
    lecturerId: "",
  });


  const clearFormFields = () => {
    setFormData({
    name: "",
    modulecode: "",
    modulecontent: "",
    lectureMaterialUpload: null,
    lectureMaterial: "",
    lecturerId: "",
    });
  };

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        lectureMaterialUpload: file,
      }));
    }
  };

  const moduleRegisterFunction = async () => {
    // Implement module registration logic here
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
      <Grid container spacing={2}>
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
            Module Register
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Module Name</Typography>
          <CustomInput
            style={{ width: "100%" }}
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
            placeHolderText={"Enter the Module Name"}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Module Code</Typography>
          <CustomInput
            style={{ width: "100%" }}
            id={0}
            TextFieldName={"modulecode"}
            labelText={""}
            TextFieldType={"text"}
            variant={"outlined"}
            onchangeFunction={handleFieldChange}
            errorTextState={false}
            errorText={""}
            value={formData.modulecode}
            textFieldSize={"small"}
            placeHolderText={"Enter the Module code"}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Module Content</Typography>
          <CustomInput
            style={{ width: "100%" }}
            id={0}
            TextFieldName={"modulecontent"}
            labelText={""}
            TextFieldType={"text"}
            variant={"outlined"}
            onchangeFunction={handleFieldChange}
            errorTextState={false}
            errorText={""}
            value={formData.modulecontent}
            textFieldSize={"small"}
            placeHolderText={"Enter the Module content"}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Lecture Material Upload</Typography>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Lecturer Id</Typography>
          <CustomInput
            style={{ width: "100%" }}
            id={0}
            TextFieldName={"lecturerId"}
            labelText={""}
            TextFieldType={"text"}
            variant={"outlined"}
            onchangeFunction={handleFieldChange}
            errorTextState={false}
            errorText={""}
            value={formData.lecturerId}
            textFieldSize={"small"}
            placeHolderText={"Enter the Lecturer Id"}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <CustomButton
              variant={"outlined"}
              buttonText={"Cancel"}
              id={1}
              // buttonFunction={() => {
              //   // Handle cancel button click
              // }}
              buttonFunction={clearFormFields}
              style={{
                borderRadius: "10px",
                width: "110px",
                marginRight: "10px",
              }}
            />
            <CustomButton
              variant={"contained"}
              buttonText={"Create"}
              id={0}
              buttonFunction={moduleRegisterFunction}
              style={{
                borderRadius: "10px",
                width: "110px",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Addmodule;
