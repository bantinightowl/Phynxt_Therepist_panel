import { createSlice } from "@reduxjs/toolkit";

// appointmentsSlice.js
const initialState = {
  selectedAppointmentId: null
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setSelectedAppointment: (state, action) => {
      state.selectedAppointmentId = action.payload;
    }
  }
});

export const { setSelectedAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;