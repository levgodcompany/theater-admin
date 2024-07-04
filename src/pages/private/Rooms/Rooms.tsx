import "react-big-calendar/lib/css/react-big-calendar.css";
import RoomsStyle from "./css/Rooms.module.css";
import AppointmentCalendar from "./components/AppointmentCalendar/AppointmentCalendar";
import InfoRoom from "./components/Card_B/InfoRoom";
import { Header } from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import ServicesList from "./components/ServicesList/ServicesList";
import HighlightedImages from "./components/HighlightedImages/HighlightedImages";
import { deleteRoomHTTP, getRoomsHTTP, IRoom } from "./services/Rooms.service";
import { useEffect, useState } from "react";
import NewRoom from "./components/NewRoom/NewRoom";

const RoomDetails = () => {
  const [rooms, setRooms] = useState<IRoom[]>();

  const [isNewRoom, setIsNewRoom] = useState<boolean>(false);

  const getRooms = async () => {
    const roomhttp = await getRoomsHTTP();
    if (roomhttp) {
      setRooms(roomhttp);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  const deleteRoom = async (idRoom:string)=> {
    await deleteRoomHTTP(idRoom)
  }

  const lodadRooms = () => {
    getRooms()
  }

  const closeNewRoom = () => {
    setIsNewRoom(false)
  }


  return (
    <>
      <Header />
      <Sidebar />

      {rooms ? (
        <>
          <div className={RoomsStyle.rooms_container}>
            {rooms.map((room) => (
              <div key={room.name} className={RoomsStyle.room_details}>
                <InfoRoom
                  idRoom={room._id}
                  typeRoom={room.typeRoom}
                  image= {room.mainImage.url}
                  capacity={room.capacity}
                  description={room.description}
                  phone={room.phone}
                  title={room.name}
                  price={room.priceBase}
                  Width={room.Width}
                  length={room.length}
                  loadRoom={lodadRooms}
                  dtos={room.dtoRoomHours}
                />

                <ServicesList idRoom={room._id} services={room.services} />

                <HighlightedImages
                  idRoom={room._id}
                  images={room.additionalImages}
                />

                <AppointmentCalendar
                  _appointments={room.availableAppointments}
                  idRoom={room._id}
                />
                <div className={RoomsStyle.container_button_delete_room}>
                  <button onClick={()=> deleteRoom(room._id)}>Eliminar Sala</button>
                </div>
              </div>
            ))}

            <div className={RoomsStyle.container_button_new}>
              <button onClick={() => setIsNewRoom(!isNewRoom)}>
                Nueva Sala
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      {isNewRoom ? (
        <>
          <NewRoom closeNewRoom={closeNewRoom} loadRoom={lodadRooms} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default RoomDetails;
