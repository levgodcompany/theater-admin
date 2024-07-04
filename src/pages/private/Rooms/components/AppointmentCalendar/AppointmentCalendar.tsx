import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AppointmentCalendarStyle from "./css/AppointmentCalendar.module.css";
import { IAppointment } from "../../services/Rooms.service";
import editImage from '../../../Local/assets/edit-3-svgrepo-com.svg'
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../../../routes/routes";

interface CalendarProps {
  _appointments: IAppointment[];
  idRoom: string;
}

const AppointmentCalendar: React.FC<CalendarProps> = ({ idRoom }) => {

  const navigate = useNavigate();




  const onClick = ()=> {
    navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.ROOM}/?id=${idRoom}`, { replace: true });
  }

  return (
    <>
    <div className={AppointmentCalendarStyle.container}>
    <div className={AppointmentCalendarStyle.header}>
        <h2 style={{fontSize: "16px"}}>Turnos disponibles:</h2>
        <img src={editImage} onClick={onClick} alt="" />
      </div>
    </div>
    </>
  );
};

export default AppointmentCalendar;
