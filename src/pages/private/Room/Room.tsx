import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../../../components/Header/Header";
import InfoRoom from "../Rooms/components/Card_B/InfoRoom";
import { IAppointment, IRoom } from "../Rooms/services/Rooms.service";
import { getRoomHTTP } from "./service/Room.service";
import AppointmentCalendar from "./components/AppointmentCalendar/AppointmentCalendar";
import RoomStyle from "./css/Room.module.css"

interface ISelects {
  id: string;
  year: number;
  month: number;
  days: string[];
}

const Room = () => {
  const location = useLocation();
  const idRoom = new URLSearchParams(location.search).get("id");

  const [room, setRoom] = useState<IRoom>({
    _id: "",
    name: "", // Nombre de la sala
    capacity: 0, // Capacidad máxima de personas en la sala
    availableAppointments: [], // Lista de turnos disponibles en la sala
    phone: "", // Número de teléfono del local
    openingHours: {
      monday: {
        isOpen: false,
        close: "",
        open: "",
      },
      tuesday: {
        isOpen: false,
        close: "",
        open: "",
      },
      wednesday: {
        isOpen: false,
        close: "",
        open: "",
      },
      thursday: {
        isOpen: false,
        close: "",
        open: "",
      },
      friday: {
        isOpen: false,
        close: "",
        open: "",
      },
      saturday: {
        isOpen: false,
        close: "",
        open: "",
      },
      sunday: {
        isOpen: false,
        close: "",
        open: "",
      },
    }, // Horario de apertura
    mainImage: {
      url: "",
      description: "",
    }, // Imagen principal del local
    additionalImages: [], // Lista de imágenes adicionales del local
    description: "", // Descripción del local
    services: [], // Lista de servicios que ofrece el local
  });

  const [selectedDateList, setSelectedDateList] = useState<ISelects[]>([]);

  // Función para convertir un array de IAppointment a un array de ISelects
  const convertAppointmentsToSelects = (
    appointments: IAppointment[]
  ): ISelects[] => {
    const selectsMap: { [key: string]: ISelects } = {};
    appointments.forEach((appointment) => {
      const date = new Date(appointment.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Los meses en JavaScript son 0-indexados
      const day = date.getDate().toString();
      const fullDay = `${year}-${month}-${day}`;

      const key = `${month}${year}`;

      if (!selectsMap[key]) {
        selectsMap[key] = {
          id: appointment._id,
          year: year,
          month: month,
          days: [fullDay],
        };
      } else {
        // Agregar el día si no está ya en la lista
        if (!selectsMap[key].days.includes(fullDay)) {
          selectsMap[key].days.push(fullDay);
        }
      }
    });

    return Object.values(selectsMap);
  };

  useEffect(() => {
    const get = async () => {
      if (idRoom) {
        const res = await getRoomHTTP(idRoom);
        if (res) {
          //setSelectedDateList(
          //  convertAppointmentsToSelects(res.availableAppointments)
          //);
          setRoom(res);
        }
      }
    };

    get();
  }, []);

  return (
    <>
      <Header />

      <div className={RoomStyle.room_container}>
        <div key={room.name} className={RoomStyle.container_room}>
          <InfoRoom
            image="http://eljuvenil.com/wp-content/uploads/2019/11/Sala1H.jpg"
            capacity={room.capacity}
            description={room.description}
            phone={room.phone}
            title={room.name}
          />
          <div className={RoomStyle.room_calendar}>
            <AppointmentCalendar
              _appointments={room.availableAppointments}
              idRoom={room._id}
            />
          </div>
         
        </div>
      </div>
    </>
  );
};

export default Room;