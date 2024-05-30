import "react-big-calendar/lib/css/react-big-calendar.css";
import RoomsStyle from "./css/Rooms.module.css";
import AppointmentCalendar from "./components/AppointmentCalendar/AppointmentCalendar";
import InfoRoom from "./components/Card_B/InfoRoom";
import { Header } from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import OpeningHours from "./components/OpeningHours/OpeningHours";
import ServicesList from "./components/ServicesList/ServicesList";
import HighlightedImages from "./components/HighlightedImages/HighlightedImages";
import { getRoomsHTTP, IRoom } from "./services/Rooms.service";
import { useEffect, useState } from "react";

const RoomDetails = () => {
  const [rooms, setRooms] = useState<IRoom[]>();

  const getRooms = async () => {
    const roomhttp = await getRoomsHTTP();
    if (roomhttp) {
      setRooms(roomhttp);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

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
                  image="http://eljuvenil.com/wp-content/uploads/2019/11/Sala1H.jpg"
                  capacity={room.capacity}
                  description={room.description}
                  phone={room.phone}
                  title={room.name}
                />

                <OpeningHours openingDays={room.openingHours} />

                <ServicesList services={room.services} />

                <HighlightedImages
                  images={room.additionalImages}
                  onViewMore={(index) => console.log("A ver mas", index)}
                  onEdit={(index) => console.log("A editar", index)}
                  onDelete={(index) => console.log("A eliminar", index)}
                />

                  <AppointmentCalendar _appointments={room.availableAppointments} idRoom={room._id} />

              </div>
            ))}

            <div className={RoomsStyle.container_button_new}>
              <button>Nueva Sala</button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default RoomDetails;
