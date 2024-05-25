import React, { useEffect, useState } from "react";
import {
  Calendar,
  momentLocalizer,
  Event as CalendarEvent,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import AppointmentCalendarStyle from './css/AppointmentCalendar.module.css'

interface IAppointment {
  date: Date; // Fecha y hora del turno
  start: Date; // Hora de entrada
  end: Date; // Hora de salida
  title: string; // Título del turno
  description: string; // Descripción del turno
}

interface CalendarProps {
  _appointments: IAppointment[];
}

const localizer = momentLocalizer(moment);

const AppointmentCalendar: React.FC<CalendarProps> = ({ _appointments }) => {
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointment | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const app: IAppointment[] = [
    {
      date: new Date("2024-06-01"),
      start: new Date("2024-06-01T10:00:00"),
      end: new Date("2024-06-01T12:00:00"),
      title: "Reunión de Proyecto",
      description: "Reunión para discutir el progreso del proyecto.",
    },
    {
      date: new Date("2024-06-01"),
      start: new Date("2024-06-01T14:00:00"),
      end: new Date("2024-06-01T16:00:00"),
      title: "Taller de Capacitación",
      description: "Capacitación sobre nuevas herramientas de desarrollo.",
    },
    {
      date: new Date("2024-06-02"),
      start: new Date("2024-06-02T09:00:00"),
      end: new Date("2024-06-02T11:00:00"),
      title: "Revisión de Código",
      description: "Sesión de revisión de código con el equipo de desarrollo.",
    },
  ];

  const handleEventClick = (event: CalendarEvent) => {
    const appointment = app.find(
      (app) => app.title === event.title && app.start === event.start
    );
    console.log("appointment",appointment);
    if (appointment) {
      setSelectedAppointment(appointment);
      setModalIsOpen(true);
    }
  };
  const events: CalendarEvent[] = app.map((appointment) => ({
    title: appointment.title,
    start: appointment.start,
    end: appointment.end,
    allDay: false,
    resource: appointment.description,
  }));

  useEffect(() => {
    console.log(events);
  }, events);

  return (
    <div className={AppointmentCalendarStyle.container}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        tooltipAccessor="resource"
        onSelectEvent={handleEventClick}
      />
      <AppointmentModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default AppointmentCalendar;
