import { useEffect, useState } from "react";
import CustomButton from "../../components/buttons";
import CustomInput from "../../components/inputBox";
import { adminRegister } from "../../services/AuthService";
import { Chip, IconButton, InputAdornment, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomTable from "../../components/dataGrid";
import { GridColDef } from "@mui/x-data-grid";
import AXIOS_INSTANCE from "../../services/AxiosInstance";
import { addAlert } from "../../features/alertSlice";
import { useDispatch } from "react-redux";
import UserView from "./userView";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [tablePage, setTablePage] = useState(1);
  const [tableRow, setTableRow] = useState([]);
  const [resetFilter, setResetFilter] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableAllRowCount, setTableAllRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    state: false,
    massage: "",
  });
  const handlePageChange = (newPage: number) => {
    setTablePage(newPage + 1);
  };
  const [felidValue, setFelidValue] = useState({
    name: "",
    nameError: false,
    nameErrorMsg: "",
    email: "",
    emailError: false,
    emailErrorMsg: "",
    password: "",
    passwordError: false,
    passwordErrorMsg: "",
    mobile_number: "",
    mobile_numberError: false,
    mobile_numberErrorMsg: "",
  });
  const handleInputValue = (e: any) => {
    if (felidValue.nameError && e.target.name == "name") {
      setFelidValue((pre) => {
        return { ...pre, nameError: false, nameErrorMsg: "" };
      });
    }
    if (felidValue.emailError && e.target.name == "email") {
      setFelidValue((pre) => {
        return { ...pre, emailError: false, emailErrorMsg: "" };
      });
    }
    if (felidValue.passwordError && e.target.name == "password") {
      setFelidValue((pre) => {
        return { ...pre, passwordError: false, passwordErrorMsg: "" };
      });
    }
    if (error.state) {
      setError({
        state: false,
        massage: "",
      });
    }
    setFelidValue((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };
  const adminRegisterFunction = async () => {
    if (felidValue.name == "") {
      setFelidValue((pre) => {
        return {
          ...pre,
          nameError: true,
          nameErrorMsg: "You need to Enter Name",
        };
      });
      return;
    }
    if (felidValue.email == "") {
      setFelidValue((pre) => {
        return {
          ...pre,
          emailError: true,
          emailErrorMsg: "You need to Enter Email",
        };
      });
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(felidValue.email)) {
      setFelidValue((pre) => {
        return {
          ...pre,
          emailError: true,
          emailErrorMsg: "You need to Enter valid Email",
        };
      });
      return;
    }
    if (felidValue.password == "") {
      setFelidValue((pre) => {
        return {
          ...pre,
          passwordError: true,
          passwordErrorMsg: "You need to Enter Password",
        };
      });
      return;
    }
    try {
      const body = {
        name: felidValue.name,
        email: felidValue.email,
        password: felidValue.password,
        mobile_number: felidValue.mobile_number,
      };
      console.log(body);
      const { data } = await adminRegister(body);

      console.log("response", data);

      // setToken(data.token);
      // localStorage.setItem('user', JSON.stringify(userAllData));
      navigate("/");
    } catch (error:any) {
      console.log(error);
      setError({
        state: true,
        massage: "Registration Failed",
      });
      dispatch(
        addAlert({
          alertState: true,
          alertType: "Error",
          alertMessage: `${error?.response?.data}`,
          alertDescription: "User Registration is not successfull.",
        })
      );
    }
  };
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      align: "left",
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              fontSize: "14px",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => {
              setSelectedUserID(params?.row?.id)
              handleOpenDetailPopup()
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    { field: "email", headerName: "Email Address", flex: 1, align: "left" },
    {
      field: "mobile_number",
      headerName: "Contact Number",
      flex: 1,
      align: "left",
    },
  ];
  const fetchRowData = async (filterState: boolean, exportSate: boolean) => {
    let parameters: any = {
      page: tablePage,
    };

    try {
      setLoading(true);
      const { data } = await AXIOS_INSTANCE.get(`/admins`, {
        // params: parameters,
      });
      setTableRow(data);
      setTableAllRowCount(data.admin.total);
      setResetFilter(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const [selectedUserID, setSelectedUserID] = useState<number>()
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState<boolean>(false)
  const handleOpenDetailPopup = () => {
    setIsDetailsPopupOpen(true)
  }

  const handleDetailClosePopup = () => {
    fetchRowData(false, false)
    setIsDetailsPopupOpen(false)
  }

  useEffect(() => {
    fetchRowData(false, false);
  }, [tablePage]);
  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <CustomTable
          rows={tableRow}
          columns={columns}
          checkboxState={true}
          columnGroupingState={false}
          columnGroupingModel={[]}
          // allRowCount={tableAllRowCount}
          pageSize={[10, 20]}
          // page={tablePage - 1}
          // dataLoading={loading}
          // onPageChange={handlePageChange}
          setSelectedRows={setSelectedRows}
        />
      </div>
      {isDetailsPopupOpen && (
        <UserView
          isPopupOpen={isDetailsPopupOpen}
          handleClosePopup={handleDetailClosePopup}
          selectedUserID={selectedUserID}
        />
      )}
    </>
  );
};

export default Users;
