import React, { useEffect, useState } from "react";
import {
  Calendar,
  momentLocalizer,
  Event as CalendarEvent,
  SlotInfo,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import AppointmentCalendarStyle from "./css/AppointmentCalendar.module.css";
import NewEventModal from "./components/NewEventModal";
import { IAppointment } from "../../../Rooms/services/Rooms.service";
import { deleteAppointmentHTTP, postAppointmentHTTP, putAppointmentHTTP } from "../../service/Room.service";

interface CalendarProps {
  _appointments: IAppointment[];
  idRoom: string;
}


const localizer = momentLocalizer(moment);

const AppointmentCalendar: React.FC<CalendarProps> = ({
  _appointments,
  idRoom,
}) => {
  // Event, variable para poder mostrar todos los eventos que hay
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Appointments, variable donde tenemos todo los turnos en la base de datos
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  // Mostramos el modal para crear un nuevo evento
  const [newEventModalOpen, setNewEventModalOpen] = useState(false);

  // Mostramos el modal de un evento
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // Nuevo evento
  const [newEvent, setNewEvent] = useState<IAppointment | null>(null);

  // Seleccionamos un evento
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment>({
    _id: "",
    available: false,
    client: null,
    date: new Date(),
    description: "",
    end: new Date(),
    start: new Date(),
    title: "",
    GuestListClient: [],
    GuestListNotClient: []
  });

  const handleEventClick = (event: CalendarEvent) => {
    const appointment = appointments.find(
      (app) =>
        app.title === event.title &&
        app.start.getTime() === (event.start as Date).getTime()
    );

    console.log("handleEventClick", appointments)

    if (appointment) {
      setSelectedAppointment(appointment);
      setModalIsOpen(true);
    }
  };

  const handleSlotSelect = (slotInfo: SlotInfo) => {
    const start = new Date(slotInfo.start);
    const end = new Date(slotInfo.end);
    setNewEvent({
      title: "",
      start,
      end,
      description: "",
      _id: "",
      available: false,
      client: null,
      date: start,
      GuestListClient: [],
      GuestListNotClient: []
    });
    setNewEventModalOpen(true);
  };

  const handleNewEventSave = async (event: IAppointment) => {
    const e: CalendarEvent = {
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      allDay: false,
      resource: {
        description: event.description,
        available: event.available,
        client: event.client,
      },
    };
    const rest = await postAppointmentHTTP(idRoom, event);
    console.log("rest", rest)
    if(rest) {

      const app: IAppointment[] = rest.map((appointment) => ({
        _id: appointment._id,
        date: new Date(appointment.date),
        start: new Date(appointment.start),
        end: new Date(appointment.end),
        title: appointment.title,
        description: appointment.description,
        available: appointment.available,
        client: appointment.client,
        GuestListClient: appointment.GuestListClient,
        GuestListNotClient: appointment.GuestListNotClient
      }));

      setEvents([...events, e]);
      setAppointments(app)

    }
    setNewEventModalOpen(false);
  };

  const handleEditEventSave = async (event: IAppointment ) => {
    const rest = await putAppointmentHTTP(idRoom, event._id, event);
    if(rest) {

      const _events: CalendarEvent[] = rest.map((appointment) => ({
        title: appointment.title,
        start: new Date(appointment.start),
        end: new Date(appointment.end),
        allDay: false,
        resource: {
          description: appointment.description,
          available: appointment.available,
          client: appointment.client,
        },
      }));

      const app: IAppointment[] = rest.map((appointment) => ({
        _id: appointment._id,
        date: new Date(appointment.date),
        start: new Date(appointment.start),
        end: new Date(appointment.end),
        title: appointment.title,
        description: appointment.description,
        available: appointment.available,
        client: appointment.client,
        GuestListClient: appointment.GuestListClient,
        GuestListNotClient: appointment.GuestListNotClient
      }));
      setAppointments(app);
      setEvents([..._events]);
    }

    setModalIsOpen(false);
  };

  const handleDeleteEvent = async (id: string ) => {
    const rest = await deleteAppointmentHTTP(idRoom, id);
    if(rest) {

      const _events: CalendarEvent[] = rest.map((appointment) => ({
        title: appointment.title,
        start: new Date(appointment.start),
        end: new Date(appointment.end),
        allDay: false,
        resource: {
          description: appointment.description,
          available: appointment.available,
          client: appointment.client,
        },
      }));

      const app: IAppointment[] = rest.map((appointment) => ({
        _id: appointment._id,
        date: new Date(appointment.date),
        start: new Date(appointment.start),
        end: new Date(appointment.end),
        title: appointment.title,
        description: appointment.description,
        available: appointment.available,
        client: appointment.client,
        GuestListClient: appointment.GuestListClient,
        GuestListNotClient: appointment.GuestListNotClient
      }));
      setAppointments(app);
      setEvents([..._events]);
    }

    setModalIsOpen(false);
  };

  useEffect(() => {
    const _events: CalendarEvent[] = _appointments.map((appointment) => ({
      title: appointment.title,
      start: new Date(appointment.start),
      end: new Date(appointment.end),
      allDay: false,
      resource: {
        description: appointment.description,
        available: appointment.available,
        client: appointment.client,
      },
    }));

    const app: IAppointment[] = _appointments.map((appointment) => ({
      _id: appointment._id,
      date: new Date(appointment.date),
      start: new Date(appointment.start),
      end: new Date(appointment.end),
      title: appointment.title,
      description: appointment.description,
      available: appointment.available,
      client: appointment.client,
      GuestListClient: appointment.GuestListClient,
      GuestListNotClient: appointment.GuestListNotClient
    }));

    setEvents([..._events]);
    setAppointments([...app]);
  }, [_appointments]);

  const eventPropGetter = (event: CalendarEvent) => {
    let backgroundColor = "#B0BEC5";
    if (event.resource.client && event.resource.client.length > 0) {
      backgroundColor = "#F44336";
    } else if (event.resource.available) {
      backgroundColor = "#4CAF50";
    }
    return {
      style: { backgroundColor },
    };
  };

  return (
    <>
      <div className={AppointmentCalendarStyle.container}>
        <div className={AppointmentCalendarStyle.header}>
          <h2>Turnos disponibles:</h2>
        </div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, backgroundColor: "#fff" }}
          tooltipAccessor={(event) => event.resource.description}
          onSelectEvent={handleEventClick}
          eventPropGetter={eventPropGetter}
          selectable
          onSelectSlot={handleSlotSelect}
        />
        <AppointmentModal
          isOpen={modalIsOpen}
          event={selectedAppointment}
          onRequestClose={() => setModalIsOpen(false)}
          onSave={handleEditEventSave}
          onDelet={handleDeleteEvent}
        />
        {/* Modal para nuevo evento */}
        {newEventModalOpen && newEvent && (
          <NewEventModal
            isOpen={newEventModalOpen}
            onRequestClose={() => setNewEventModalOpen(false)}
            onSave={handleNewEventSave}
            event={newEvent}
          />
        )}
      </div>
    </>
  );
};

export default AppointmentCalendar;
