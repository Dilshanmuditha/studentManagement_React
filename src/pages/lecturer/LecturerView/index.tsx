import React, { useEffect, useState } from "react";
import SidePopup from "../../../components/SidePopup";
import AXIOS_INSTANCE from "../../../services/AxiosInstance";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import CustomButton from "../../../components/buttons";
import EditLecturer from "../editLecturer";

interface LecturerDetailProps {
  isPopupOpen: boolean;
  handleClosePopup: any;
  selectedLecturerID: number | undefined;
}

const LecturerView = ({
  isPopupOpen,
  handleClosePopup,
  selectedLecturerID,
}: LecturerDetailProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lecturerDetail, setLecturerDetail] = useState<any>(undefined);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false)

  const fetchLecturerDetail = async () => {
    try {
      // const response = await AXIOS_INSTANCE.get(
      //  `/lecturer/${selectedLecturerID}`
      // );

      const response = await AXIOS_INSTANCE.get(
        `/lecturer/${selectedLecturerID}`
      );
      
      console.log(response.data)
      if (response.status == 200) {
        setLecturerDetail(response.data);
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
    fetchLecturerDetail()
    setIsEditPopupOpen(false)
  }


  useEffect(() => {
    fetchLecturerDetail();
  }, []);
  return (
    <SidePopup
      onClose={handleClosePopup}
      title={"Lecturer Details"}
      open={isPopupOpen}
      isClose={true}
    >
      {isLoading ? (
        // Show loader while loading
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
                  {lecturerDetail?.name}
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
                  Email
                </Typography>
              </Grid>
              {/* Value */}
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Typography
                  sx={{
                    color: "#101828",
                  }}
                >
                  {lecturerDetail?.email}
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
                  NIC
                </Typography>
              </Grid>
              {/* Value */}
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Typography
                  sx={{
                    color: "#101828",
                  }}
                >
                  {lecturerDetail?.nic}
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
                  Address
                </Typography>
              </Grid>
              {/* Value */}
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Typography
                  sx={{
                    color: "#101828",
                  }}
                >
                  {lecturerDetail?.address}
                </Typography>
              </Grid>
            </Grid>

            {/* PIC no */}
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
                  Contact Number
                </Typography>
              </Grid>
              {/* Value */}
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Typography
                  sx={{
                    color: "#101828",
                  }}
                >
                  {lecturerDetail?.mobile}
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
                  User Name
                </Typography>
              </Grid>
              {/* Value */}
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Typography
                  sx={{
                    color: "#101828",
                  }}
                >
                  {lecturerDetail?.userName}
                </Typography>
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
      {isEditPopupOpen && (
        <EditLecturer
          isPopupOpen={isEditPopupOpen}
          handleClosePopup={handleEditClosePopup}
          selectedLecturerID={selectedLecturerID}
        />
      )}
    </SidePopup>
  );
};

export default LecturerView;
