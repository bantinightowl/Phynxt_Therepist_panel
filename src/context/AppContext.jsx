// import { createContext, useContext, useState } from "react";


// const AppContext = createContext(null)


// export const AppContextProvider = ({ children }) => {

//     const [data, setData] = useState([
//         {
//             appointment_id: 'APT001',
//             patient_name: 'John Doe',
//             phone_no: '9876543210',
//             email: 'john@example.com',
//             service_type: 'Physiotherapy',
//             service_description: 'Back pain relief session',
//             booking_date: '2025-04-25',
//             date: '2025-04-30',
//             slot_time: '10:00 AM - 11:00 AM',
//             appointment_status: 'Pending',
//             location: 'Clinic',
//             price: '₹1200',
//             treatmentId: "TRT001",
//             patientId: "P001",
//             physiotherapistName: "Dr. Smith",
//             sessionDuration: "",
//             charges: "₹1500",
//             paymentStatus: "Paid",
//             treatmentNotes: "",
//             nextAppointment: "",
//             treatment_status: "Pending",

//             id: 1,
//             initialCondition: '',
//             currentCondition: '',
//             exercisesAssigned: '',
//             therapistObservations: '',
//             patientFeedback: '',
//             progressScore: '',
//             status: '',
//         },
//         {
//             appointment_id: 'APT002',
//             patient_name: 'Jane Smith',
//             phone_no: '9876543211',
//             email: 'jane@example.com',
//             service_type: 'Massage Therapy',
//             service_description: 'Full body relaxing massage',
//             booking_date: '2025-04-26',
//             date: '2025-05-01',
//             slot_time: '2:00 PM - 3:00 PM',
//             appointment_status: 'Pending',
//             location: 'Home Visit',
//             price: '₹1500',
//             treatmentId: "TRT002",
//             patientId: "P002",
//             physiotherapistName: "Dr. Kelly",
//             sessionDuration: "",
//             charges: "₹1200",
//             paymentStatus: "Pending",
//             treatmentNotes: "",
//             nextAppointment: "",
//             treatment_status: "Pending",

//             id: 2,
//             initialCondition: '',
//             currentCondition: '',
//             exercisesAssigned: '',
//             therapistObservations: '',
//             patientFeedback: '',
//             progressScore: '',
//             status: '',
//         },
//     ])


//     const contextValue = {
//         data,
//         setData
//     }

//     return (
//         <AppContext.Provider value={contextValue}>
//             {children}
//         </AppContext.Provider>
//     )
// }


// export const useAppContext = () => {
//     const context = useContext(AppContext)

//     if (!context) {
//         new Error("Use useAppContext within AppContextProvider")
//     }

//     return context;
// }