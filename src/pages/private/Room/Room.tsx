import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../../../components/Header/Header";
import InfoRoom from "../Rooms/components/Card_B/InfoRoom";
import { IRoom } from "../Rooms/services/Rooms.service";
import { getRoomHTTP } from "./service/Room.service";
import AppointmentCalendar from "./components/AppointmentCalendar/AppointmentCalendar";
import RoomStyle from "./css/Room.module.css"
import Sidebar from "../../../components/Sidebar/Sidebar";


const Room = () => {
  const location = useLocation();
  const idRoom = new URLSearchParams(location.search).get("id");

  const [room, setRoom] = useState<IRoom>({
    _id: "",
    name: "", // Nombre de la sala
    capacity: 0, // Capacidad máxima de personas en la sala
    availableAppointments: [], // Lista de turnos disponibles en la sala
    phone: "", // Número de teléfono del local
    priceBase: 0,
    length: 0,
    Width: 0,
    typeRoom: "",
    dtoRoomHours: [],
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

  useEffect(() => {
    const get = async () => {
      if (idRoom) {
        const res = await getRoomHTTP(idRoom);
        if (res) {
          setRoom(res);
        }
      }
    };

    get();
  }, []);

  useEffect(()=> {
  }, [room.availableAppointments])

  return (
    <>
      <Header />
      <Sidebar />

      <div className={RoomStyle.room_container}>
        <div key={room.name} className={RoomStyle.container_room}>
          <InfoRoom
            idRoom={room._id}
            image={room.mainImage.url}
            capacity={room.capacity}
            description={room.description}
            phone={room.phone}
            title={room.name}
            price={room.priceBase}
            Width={room.Width}
            dtos={room.dtoRoomHours}
            length={room.length}
            loadRoom={()=>{}}
            typeRoom={room.typeRoom}
          />
          <div>
            <p>Reservar</p>
          </div>
          <div className={RoomStyle.room_calendar}>
            <AppointmentCalendar
              _appointments={room.availableAppointments}
              idRoom={room._id}
              dto={room.dtoRoomHours}
              price={room.priceBase}
              nameRoom={room.name}
              capacity={room.capacity}
            />
          </div>


         
        </div>
      </div>
    </>
  );
};

export default Room;
