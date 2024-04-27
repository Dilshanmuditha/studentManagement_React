import { Box, Paper, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import AXIOS_INSTANCE from '../../services/AxiosInstance'
import CustomTable from '../../components/dataGrid'
import LecturerView from './LecturerView'


function Lecturer() {
  const [tablePage, setTablePage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [tableRow, setTableRow] = useState([])
  const [resetFilter, setResetFilter] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [tableAllRowCount, setTableAllRowCount] = useState(0)
  const [selectedLecturerID, setSelectedLecturerID] = useState<number>()
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState<boolean>(false)
  const handleOpenDetailPopup = () => {
    setIsDetailsPopupOpen(true)
  }

  const handleDetailClosePopup = () => {
    fetchRowData(false, false)
    setIsDetailsPopupOpen(false)
  }
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
              setSelectedLecturerID(params?.row?.id)
              handleOpenDetailPopup()
            }}>
            {params.value}
          </Typography>
        )
      },
    },
    { field: "email", headerName: "Email Address", flex: 1, align: "left" },
    { field: "mobile", headerName: "Contact Number", flex: 1, align: "left" },
    { field: "userName", headerName: "User Name", flex: 1, align: "left" },
    { field: "address", headerName: "Address", flex: 1, align: "left" },
    { field: "nic", headerName: "NIC", flex: 1, align: "left" },
  ]
  const fetchRowData = async (filterState: boolean, exportSate: boolean) => {
    let parameters: any = {
      page: tablePage,
    }
    
    try {
      setLoading(true)
      const { data } = await AXIOS_INSTANCE.get(`/lecturer`, {
        // params: parameters,
      })
      console.log(data)
      setTableRow(data)
      setTableAllRowCount(data.admin.total)
      setResetFilter(false)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  
  useEffect(() => {
    fetchRowData(false, false)
  }, [tablePage])
  return (
    <>
    <Box sx={{ width: "100%", height: "100%" }}>
    <Paper
          sx={{
            padding: 2,
            display: "flex",
            gap: 2,
            flexDirection: "column",
            width: "100%",
            height: "100%",
            border: "1px solid #EAECF0",
            borderRadius: 5,
            zIndex: 5,
          }}>
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
    </Paper>
    {isDetailsPopupOpen && (
        <LecturerView
          isPopupOpen={isDetailsPopupOpen}
          handleClosePopup={handleDetailClosePopup}
          selectedLecturerID={selectedLecturerID}
        />
      )}
    </Box>
    </>
  )
}

export default Lecturer
