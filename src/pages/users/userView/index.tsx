import React, { useEffect, useState } from "react";
import SidePopup from "../../../components/SidePopup";
import AXIOS_INSTANCE from "../../../services/AxiosInstance";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import CustomButton from "../../../components/buttons";

interface UserDetailProps {
  isPopupOpen: boolean;
  handleClosePopup: any;
  selectedUserID: number | undefined;
}

const UserView = ({
  isPopupOpen,
  handleClosePopup,
  selectedUserID,
}: UserDetailProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userDetail, setUserDetail] = useState<any>(undefined);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false)

  const fetchuserDetail = async () => {
    try {
      const response = await AXIOS_INSTANCE.get(
        `/admin/${selectedUserID}`
      );
      
      console.log(response.data)
      if (response.status == 200) {
        setUserDetail(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Fetch User error", error);
      setIsLoading(false);
    }
  };

  const handleOpenEditPopup = () => {
    setIsEditPopupOpen(true)
  }

  const handleEditClosePopup = () => {
    fetchuserDetail()
    setIsEditPopupOpen(false)
  }


  useEffect(() => {
    fetchuserDetail();
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
                  {userDetail?.name}
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
                  {userDetail?.email}
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
                  Mobile
                </Typography>
              </Grid>
              {/* Value */}
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Typography
                  sx={{
                    color: "#101828",
                  }}
                >
                  {userDetail?.mobile_number}
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
      {/* {isEditPopupOpen && (
        <EditStudent
          isPopupOpen={isEditPopupOpen}
          handleClosePopup={handleEditClosePopup}
          selectedStudentID={selectedStudentID}
        />
      )} */}
    </SidePopup>
  );
};

export default UserView;
