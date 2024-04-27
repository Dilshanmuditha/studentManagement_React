import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AXIOS_INSTANCE from "../../services/AxiosInstance";
import { Box, Grid, Typography } from "@mui/material";
import { IdropDown } from "../../components/select";
import { GridColDef } from "@mui/x-data-grid";
import CustomTable from "../../components/dataGrid";
import ModuleView from "../module/moduleView";

const CourseView = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<any>([]);
  const [leturer, setLecture] = useState<IdropDown[]>([])
  const [tableRow, setTableRow] = useState([])
  const [resetFilter, setResetFilter] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [tableAllRowCount, setTableAllRowCount] = useState(0)
  const [tablePage, setTablePage] = useState(1)
  const [selectedModuleID, setSelectedModuleID] = useState<number>()
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState<boolean>(false)
  const handleOpenDetailPopup = () => {
    setIsDetailsPopupOpen(true)
  }

  const handleDetailClosePopup = () => {
    fetchRowData(false, false)
    setIsDetailsPopupOpen(false)
  }
  const fetchCourseData = async () => {
    try {
      const response = await AXIOS_INSTANCE.get(`/course/${id}`);
      console.log(response.data);
      setCourse(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchLectureData = async () => {
    try {
      const response = await AXIOS_INSTANCE.get(`/lecturer`)
      
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
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Module Name",
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
              setSelectedModuleID(params?.row?.id)
              handleOpenDetailPopup()
            }}>
            {params.value}
          </Typography>
        )
      },
    },
    { field: "code", headerName: "Module Code", flex: 1, align: "left" },
    { field: "content", headerName: "Content", flex: 1, align: "left" },
  ]
  const fetchRowData = async (filterState: boolean, exportSate: boolean) => {
    let parameters: any = { 
      page: tablePage,
    }
    
    try {
      const { data } = await AXIOS_INSTANCE.get(`/module`, {
        // params: parameters,
      })
      console.log(data)
      setTableRow(data)
      setTableAllRowCount(data.data.total)
      setResetFilter(false)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    fetchRowData(false, false)
  }, [tablePage])
  useEffect(() => {
    fetchCourseData();
    fetchLectureData();
  }, []);
  return (
    <>
    <Box sx={{ backgroundColor: "#ECFFF4", padding: "30px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: "26px",
              }}
            >
              Course - {course.name}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: "26px",
              }}
            >
              Code - {course.code}
              
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: "26px",
              }}
            >
              Assigned Lecture - {
                leturer.find((data: any) => data?.value == course.lecturer_id)
                  ?.label
              }
              
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
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
        <ModuleView
          isPopupOpen={isDetailsPopupOpen}
          handleClosePopup={handleDetailClosePopup}
          selectedModuleID={selectedModuleID}
        />
      )}
    </>
  );
};

export default CourseView;
