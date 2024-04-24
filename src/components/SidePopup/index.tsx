import { ReactNode } from "react"
import { Modal } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useTheme } from "@emotion/react"

const SidePopup = ({
  open,
  onClose,
  title,
  children,
  popWidth,
  isClose,
}: {
  open: boolean
  onClose: (value: boolean) => void
  title: string
  children?: ReactNode
  popWidth?: number
  isClose?: boolean
}) => {
  const theme: any = useTheme()
  return (
    <Modal
      open={open}
      onClose={() => onClose(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ zIndex: 100}}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "stretch",
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          boxShadow: "-5px 0 15px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#ffffff",
          width: popWidth ? popWidth : 800,
        }}>
        <div
          style={{
            padding: 10,
            paddingRight: 20,
            height: "50px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "30px",
            fontSize: theme.typography.h6.fontSize,
            fontWeight: theme.typography.h6.fontWeight,
            color: "black",
            borderBottom: "1px solid #ccc",
            transition: "border-bottom 0.3s ease-in-out",
            justifyContent: "space-between",
          }}>
          {title}
          {isClose && (
            <CloseIcon
              sx={{ fontSize: "25px", color: "#000000", cursor: "pointer" }}
              onClick={() => onClose(false)}
            />
          )}
        </div>
        {children}
      </div>
    </Modal>
  )
}

export default SidePopup
