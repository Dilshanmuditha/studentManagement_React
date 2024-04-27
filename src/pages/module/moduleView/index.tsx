import React, { useEffect, useState } from 'react'
import AXIOS_INSTANCE from '../../../services/AxiosInstance';
import SidePopup from '../../../components/SidePopup';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import CustomButton from '../../../components/buttons';
import ArticleIcon from "@mui/icons-material/Article"
import { useDispatch } from 'react-redux';
import { addAlert } from '../../../features/alertSlice';
import axios from 'axios';

interface ModuleDetailProps {
    isPopupOpen: boolean;
    handleClosePopup: any;
    selectedModuleID: number | undefined;
  }
  
  const ModuleView = ({
    isPopupOpen,
    handleClosePopup,
    selectedModuleID,
  }: ModuleDetailProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
  const [moduleDetail, setModuleDetail] = useState<any>(undefined);
  const dispatch = useDispatch();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [file, setFile] = useState<any>(null);

    const handleFileChange = (event:any) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        
        try {
            const formData = new FormData();
            formData.append('file', file);

            // Replace 'http://localhost:8080/upload' with your actual backend API endpoint
            // const response = await axios.post('http://localhost:8080/api/v1/module/2/materials/upload', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // });
            const response = await AXIOS_INSTANCE.put(`/module/${selectedModuleID}/materials/upload`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded successfully:', response.data);
            dispatch(
                addAlert({
                  alertState: true,
                  alertType: "Success",
                  alertMessage: "Document uploaded",
                  alertDescription: "Document uploaded successfully",
                })
              )
        } catch (error) {
            console.error('Error uploading file:', error);
            dispatch(
                addAlert({
                  alertState: true,
                  alertType: "Error",
                  alertMessage: "Document not uploaded",
                  alertDescription: "Document uploaded unsuccessfully",
                })
              )
        }
    };
  const fetchModuleDetail = async () => {
    try {
      const response = await AXIOS_INSTANCE.get(
        `/module/${selectedModuleID}`
      );
      
      console.log(response.data)
      if (response.status == 200) {
        setModuleDetail(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Fetch Buyer error", error);
      setIsLoading(false);
    }
  };

  const handleOpenEditPopup = () => {
    setIsEditPopupOpen(true)
  }

  const handleEditClosePopup = () => {
    setIsEditPopupOpen(false)
  }
  const handleDisplayPdf = async () => {
    try {
          window.open(`http://localhost:8080/api/v1/${selectedModuleID}/view`)
          return
    } catch (error) {
        console.log(error)
      dispatch(
        addAlert({
          alertState: true,
          alertType: "Error",
          alertMessage: "Invalid Document",
          alertDescription: "Can not open document.",
        })
      )
    }
  }

  useEffect(() => {
    fetchModuleDetail();
  }, []);
  return (
    <SidePopup
      onClose={handleClosePopup}
      title={"Student Details"}
      open={isPopupOpen}
      isClose={true}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            flex: 1,
            overflow: "hidden",
            overflowY: "auto",
            marginTop: "80px",
          }}
        >

          {/* List details */}
          <Grid container spacing={1}>
            {/* Pic name */}
            <Grid
              container
              item
              xs={12}
              style={{
                margin: 0,
                padding: "30px 48px 30px 48px",
                borderBottom: "1px solid #EEEEEE",
              }}
            >
              {/* Label */}
              <Grid item xs={6} style={{ textAlign: "left" }}>
                <Typography
                  sx={{
                    color: "#B8B8B8",
                  }}
                >
                  Name
                </Typography>
              </Grid>
              {/* Value */}
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Typography
                  sx={{
                    color: "#101828",
                  }}
                >
                  {moduleDetail?.name}
                </Typography>
              </Grid>
            </Grid>
           
            <Grid
              container
              item
              xs={12}
              style={{
                margin: 0,
                padding: "30px 48px 30px 48px",
                borderBottom: "1px solid #EEEEEE",
              }}
            >
              {/* Label */}
              <Grid item xs={6} style={{ textAlign: "left" }}>
                <Typography
                  sx={{
                    color: "#B8B8B8",
                  }}
                >
                  Content
                </Typography>
              </Grid>
              {/* Value */}
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Typography
                  sx={{
                    color: "#101828",
                  }}
                >
                  {moduleDetail?.content}
                </Typography>
              </Grid>
            </Grid>

            {/* Address */}
            <Grid
              container
              item
              xs={12}
              style={{
                margin: 0,
                padding: "30px 48px 30px 48px",
                borderBottom: "1px solid #EEEEEE",
              }}
            >
              {/* Label */}
              <Grid item xs={6} style={{ textAlign: "left" }}>
                <Typography
                  sx={{
                    color: "#B8B8B8",
                
                  }}
                >
                  Code
                </Typography>
              </Grid>
              {/* Value */}
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Typography
                  sx={{
                    color: "#101828",
                  }}
                >
                  {moduleDetail?.code}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              style={{
                margin: 0,
                padding: "30px 48px 30px 48px",
                borderBottom: "1px solid #EEEEEE",
              }}
            >
              {/* Label */}
              <Grid item xs={6} style={{ textAlign: "left" }}>
                <Typography
                  sx={{
                    color: "#B8B8B8",
                
                  }}
                >
                  Materials
                </Typography>
              </Grid>
              <Grid item xs={12}>
                          {!moduleDetail?.file_path ||
                          moduleDetail?.file_path.length == 0 ? (
                            <Typography
                              sx={{
                                margin: 2,
                                color: "#B8B8B8",
                                fontSize: "12px",
                                fontWeight: 500,
                              }}>
                              No Uploaded Documents
                            </Typography>
                          ) : (
                            <Grid container>
                                  <Grid
                                    item
                                    xs={6}
                                    key={1}
                                    sx={{ padding: "5px" }}>
                                    <Box
                                      sx={{
                                        boxShadow:
                                          "2px 2px 4px rgba(0, 0, 0, 0.2)",
                                        border: "1px solid #D0D5DD",
                                        borderRadius: "8px",
                                        height: "44px",
                                        display: "flex",
                                        alignItems: "center",
                                        paddingLeft: "5px",
                                        paddingRight: "5px",
                                        width: "100%",
                                      }}>
                                      <ArticleIcon
                                        sx={{
                                          color: "#8B8B8B",
                                          marginRight: "5px",
                                        }}
                                      />

                                      <div
                                        style={{
                                          width: "100%",
                                          height: "20px",
                                        }}>
                                        <Typography
                                          sx={{
                                            fontSize: "14px",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            "&:hover": {
                                              textDecoration: "underline",
                                              textTransform: "none",
                                              cursor: "pointer",
                                            },
                                          }}
                                          onClick={() => {
                                            handleDisplayPdf()
                                          }}>
                                          <span>
                                            {moduleDetail?.name}
                                          </span>{" "}
                                        </Typography>
                                      </div>
                                    </Box>
                                  </Grid>
                                
                            </Grid>
                          )}
                        </Grid>
            </Grid>
            <Grid sx={{
                backgroundColor:"grey",
                width:"400px",
                height:"50px",
                justifyContent:"center",
                alignItems:"center",
                display:"flex"
            }}>
            <form style={{
                justifyContent:"center",
                alignItems:"center",
                display:"flex"
            }} onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button style={{width:"100px",height:"30px",}} type="submit">Upload</button>
            </form>
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
                //   handleClosePopup()
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
              buttonText={"Edit"}
              id={0}
              buttonFunction={() => {
              handleOpenEditPopup()
              }}
              style={{
                borderRadius: "10px",
              }}
            />
          </Grid>
        </Grid>
      </div>
        </Box>
      )}
      {/* {isEditPopupOpen && (
        <EditStudent
          isPopupOpen={isEditPopupOpen}
          handleClosePopup={handleEditClosePopup}
          selectedStudentID={selectedStudentID}
        />
      )} */}
    </SidePopup>
  )
}

export default ModuleView