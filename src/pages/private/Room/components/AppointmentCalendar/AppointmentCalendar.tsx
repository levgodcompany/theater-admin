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

interface CalendarProps {
  _appointments: IAppointment[];
  idRoom: string;
}

interface IShift {
  prevStart: Date;
  prevEnd: Date;
  shift: IAppointment;
}

const localizer = momentLocalizer(moment);

const AppointmentCalendar: React.FC<CalendarProps> = ({
  _appointments,
  idRoom,
}) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  // Estado para agregar nuevos datos
  const [newsEvents, setNewsEvents] = useState<IShift[]>([]);

   // Estado para editar datos
   const [editEvents, setEditEvents] = useState<IShift[]>([]);

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
  });

  const handleEventClick = (event: CalendarEvent) => {
    const appointment = appointments.find(
      (app) =>
        app.title === event.title &&
        app.start.getTime() === (event.start as Date).getTime()
    );

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
    });
    setNewEventModalOpen(true);
  };

  const handleNewEventSave = (prevStart: Date, prevEnd: Date, event: IAppointment) => {
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
    setNewsEvents((prev) => [...prev, {
      prevEnd,
      prevStart,
      shift: event
    }]);
    setEvents([...events, e]);
    setAppointments((prev) => [...prev, event]);
    setNewEventModalOpen(false);
  };

  const handleEditEventSave = (
    prevStart: Date,
    prevEnd: Date,
    event: IAppointment
  ) => {
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

    const indexNewsEvent = newsEvents.findIndex(
      (app) =>
        app.prevStart.getTime() === (prevStart as Date).getTime() &&
        app.prevEnd.getTime() === (prevEnd as Date).getTime()
    );

    if (indexNewsEvent != -1) {
      setNewsEvents((prev) => {
        const index = prev.map((app, index) => {
          return index == indexEvent ? {
            prevEnd,
            prevStart,
            shift: event
          } : app;
        });
        return [...index];
      });
    }

    const indexEditEvent = editEvents.findIndex(
      (app) =>
        app.prevStart.getTime() === (prevStart as Date).getTime() &&
        app.prevEnd.getTime() === (prevEnd as Date).getTime()
    );

    if (indexEditEvent != -1) {
      setEditEvents((prev) => {
        const index = prev.map((app, index) => {
          return index == indexEvent ? {
            prevEnd,
            prevStart,
            shift: event
          } : app;
        });
        return [...index];
      });
    }

    const indexEvent = events.findIndex(
      (app) =>
        app.start?.getTime() === (prevStart as Date).getTime() &&
        app.end?.getTime() === (prevEnd as Date).getTime()
    );

    if (indexEvent != -1) {
      setEvents((prev) => {
        const index = prev.map((app, index) => {
          return index == indexEvent ? e : app;
        });
        return [...index];
      });
    }

    const indexAppointment = appointments.findIndex(
      (app) =>
        app.start?.getTime() === (prevStart as Date).getTime() &&
        app.end?.getTime() === (prevEnd as Date).getTime()
    );

    if (indexAppointment != -1) {
      setAppointments((prev) => {
        const index = prev.map((app, index) => {
          return index == indexEvent ? event : app;
        });
        return [...index];
      });
    }

    if(indexNewsEvent == -1 && indexEditEvent == -1){
      setEditEvents((prev) => [...prev, {
        prevEnd,
        prevStart,
        shift: event
      }]);
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
    }));

    setEvents([..._events]);
    setAppointments([...app]);
  }, [_appointments]);

  useEffect(() => {
    console.log("newsEvents", newsEvents.length);
  }, [newsEvents]);

  useEffect(() => {
    console.log("editEvents", editEvents.length);
  }, [editEvents]);

  const eventPropGetter = (event: CalendarEvent) => {
    let backgroundColor = "grey";
    if (event.resource.client && event.resource.client.length > 0) {
      backgroundColor = "blue";
    } else if (event.resource.available) {
      backgroundColor = "green";
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
