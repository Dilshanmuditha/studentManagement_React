import { Box, Snackbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useDispatch, useSelector } from "react-redux";
import { addAlert } from "../../features/alertSlice";

const AlertComponent = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state: any) => state.alert);

  const iconViewer = () => {
    switch (alert.alertType) {
      case "Success":
        return (
          <>
            <CheckIcon sx={{ fontSize: "60px", color: "#51ff00" }} />
          </>
        );
      case "Error":
        return (
          <>
            <ClearIcon sx={{ fontSize: "60px", color: "#ff0000" }} />
          </>
        );
      case "Warning":
        return (
          <>
            <QuestionMarkIcon sx={{ fontSize: "60px", color: "#ffbb00" }} />
          </>
        );
      default:
        return <></>;
    }
  };

  const alertCloseHandler = () => {
    dispatch(
      addAlert({
        alertState: false,
        alertType: "default",
        alertMessage: "",
        alertDescription: "",
      })
    );
  };

  return (
    <>
      <Snackbar
        open={alert.alertState}
        autoHideDuration={2000}
        onClose={() => {
          alertCloseHandler();
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            boxShadow: 3,
            padding: "10px",
            borderRadius: 2,
            maxWidth: "450px",
            height: "130px",
            backgroundColor: "#ffffff",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "#aaffa281",
                borderRadius: "80px",
                padding: "60px",
                width: "56px",
                height: "56px",
              }}
            >
              {iconViewer()}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                // backgroundColor: "#3500f7",
                gap: 2,
                height: "100%",
                paddingRight: "20px",
              }}
            >
              <div style={{ fontSize: "18px", fontWeight: 600 }}>
                {alert.alertMessage}
              </div>
              <div style={{ fontSize: "14px", fontWeight: 400 }}>
                {alert.alertDescription}
              </div>
            </div>
          </div>
        </Box>
      </Snackbar>
    </>
  );
};

export default AlertComponent;
