import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AlertState {
  alertState: boolean;
  alertType: 'Success' | 'Error' | 'Warning' | 'default';
  alertMessage: string;
  alertDescription: string;
}

const initialState: AlertState = {
  alertState: false,
  alertType: "default",
  alertMessage: "",
  alertDescription: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<AlertState>) => {
      const { alertState, alertType, alertMessage, alertDescription } =
        action.payload;
      state.alertState = alertState;
      state.alertType = alertType;
      state.alertMessage = alertMessage;
      state.alertDescription = alertDescription;
    },
  },
});

export const { addAlert } = alertSlice.actions;
export default alertSlice.reducer;
