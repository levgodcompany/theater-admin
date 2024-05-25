import "react-big-calendar/lib/css/react-big-calendar.css";
import "./css/Rooms.css";
import AppointmentCalendar from "./components/AppointmentCalendar/AppointmentCalendar";
import InfoRoom from "./components/Card_B/InfoRoom";
import { Header } from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import OpeningHours from "./components/OpeningHours/OpeningHours";
import ServicesList from "./components/ServicesList/ServicesList";
import HighlightedImages from "./components/HighlightedImages/HighlightedImages";

interface IAppointment {
  date: Date; // Fecha y hora del turno
  start: Date; // Hora de entrada
  end: Date; // Hora de salida
  title: string; // Título del turno
  description: string; // Descripción del turno
}

interface IOpeningDays {
  monday: IOpeningCloseHours; // Horario de apertura los lunes
  tuesday: IOpeningCloseHours; // Horario de apertura los martes
  wednesday: IOpeningCloseHours; // Horario de apertura los miércoles
  thursday: IOpeningCloseHours; // Horario de apertura los jueves
  friday: IOpeningCloseHours; // Horario de apertura los viernes
  saturday: IOpeningCloseHours; // Horario de apertura los sábados
  sunday: IOpeningCloseHours; // Horario de apertura los domingos
}

interface IOpeningCloseHours {
  isOpen: boolean;
  open: string;
  close: string;
}

interface IRoom {
  name: string; // Nombre de la sala
  capacity: number; // Capacidad máxima de personas en la sala
  availableAppointments: IAppointment[]; // Lista de turnos disponibles en la sala
  phone: string; // Número de teléfono del local
  openingHours: IOpeningDays; // Horario de apertura
  mainImage: IImage; // Imagen principal del local
  additionalImages: IImage[]; // Lista de imágenes adicionales del local
  description: string; // Descripción del local
  services: string[]; // Lista de servicios que ofrece el local
}

interface IImage {
  url: string; // URL de la imagen
  description?: string; // Descripción opcional de la imagen
}

interface RoomDetailsProps {
  rooms: IRoom[];
}

const RoomDetails = () => {
  const rooms: IRoom[] = [
    {
      name: "Sala 1",
      capacity: 50,
      phone: "123-456-7890",
      openingHours: {
        monday: { isOpen: true, open: "08:00", close: "18:00" },
        tuesday: { isOpen: true, open: "08:00", close: "18:00" },
        wednesday: { isOpen: true, open: "08:00", close: "18:00" },
        thursday: { isOpen: true, open: "08:00", close: "18:00" },
        friday: { isOpen: true, open: "08:00", close: "18:00" },
        saturday: { isOpen: false, open: "", close: "" },
        sunday: { isOpen: false, open: "", close: "" },
      },
      mainImage: {
        url: "http://example.com/main1.jpg",
        description: "Main Image 1",
      },
      additionalImages: [
        {
          url: "http://example.com/additional1.jpg",
          description: "Additional Image 1",
        },
        {
          url: "http://example.com/additional2.jpg",
          description: "Additional Image 2",
        },
      ],
      description: "Esta es la descripción de la Sala 1",
      services: ["Servicio 1", "Servicio 2"],
      availableAppointments: [
        {
          date: new Date("2023-06-01"),
          start: new Date("2023-06-01T10:00:00"),
          end: new Date("2023-06-01T12:00:00"),
          title: "Reunión",
          description: "Descripción de la reunión",
        },
      ],
    },
    {
      name: "Sala 2",
      capacity: 30,
      phone: "987-654-3210",
      openingHours: {
        monday: { isOpen: true, open: "09:00", close: "17:00" },
        tuesday: { isOpen: true, open: "09:00", close: "17:00" },
        wednesday: { isOpen: true, open: "09:00", close: "17:00" },
        thursday: { isOpen: true, open: "09:00", close: "17:00" },
        friday: { isOpen: true, open: "09:00", close: "17:00" },
        saturday: { isOpen: false, open: "", close: "" },
        sunday: { isOpen: false, open: "", close: "" },
      },
      mainImage: {
        url: "http://example.com/main2.jpg",
        description: "Main Image 2",
      },
      additionalImages: [
        {
          url: "http://example.com/additional3.jpg",
          description: "Additional Image 3",
        },
        {
          url: "http://example.com/additional4.jpg",
          description: "Additional Image 4",
        },
      ],
      description: "Esta es la descripción de la Sala 2",
      services: ["Servicio 3", "Servicio 4"],
      availableAppointments: [
        {
          date: new Date("2023-06-02"),
          start: new Date("2023-06-02T11:00:00"),
          end: new Date("2023-06-02T13:00:00"),
          title: "Consulta",
          description: "Descripción de la consulta",
        },
      ],
    },
    {
      name: "Sala 3",
      capacity: 40,
      phone: "555-555-5555",
      openingHours: {
        monday: { isOpen: true, open: "10:00", close: "16:00" },
        tuesday: { isOpen: true, open: "10:00", close: "16:00" },
        wednesday: { isOpen: true, open: "10:00", close: "16:00" },
        thursday: { isOpen: true, open: "10:00", close: "16:00" },
        friday: { isOpen: true, open: "10:00", close: "16:00" },
        saturday: { isOpen: false, open: "", close: "" },
        sunday: { isOpen: false, open: "", close: "" },
      },
      mainImage: {
        url: "http://example.com/main3.jpg",
        description: "Main Image 3",
      },
      additionalImages: [
        {
          url: "http://example.com/additional5.jpg",
          description: "Additional Image 5",
        },
        {
          url: "http://example.com/additional6.jpg",
          description: "Additional Image 6",
        },
      ],
      description: "Esta es la descripción de la Sala 3",
      services: ["Servicio 5", "Servicio 6"],
      availableAppointments: [
        {
          date: new Date("2023-06-03"),
          start: new Date("2023-06-03T12:00:00"),
          end: new Date("2023-06-03T14:00:00"),
          title: "Presentación",
          description: "Descripción de la presentación",
        },
      ],
    },
  ];

  const imagesAddit = ()=> {
    const objest: {
      image: string;
      title: string;
      description: string;
    }[] = [
      {
        title: "Sala 1",
        description: "Espacio para Multi Eventos",
        image: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala1H.jpg",
      },
      {
        title: "Sala 2",
        description: "Espacio para Multi Eventos",
        image:
          "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07903-1536x1152.jpg",
      },
      {
        title: "Sala 3",
        description: "Espacio para Multi Eventos",
        image:
          "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07936-1024x768.jpg",
      },
      {
        title: "Sala 4",
        description: "Espacio para Multi Eventos",
        image:
          "http://eljuvenil.com/wp-content/uploads/2019/11/Sala-4-88.jpg",
      },
      {
        title: "Sala 5",
        description: "Espacio para Multi Eventos",
        image: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala-5-5.jpg",
      },
      {
        title: "Sala 6",
        description: "Espacio para Multi Eventos",
        image:
          "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07959-1536x1152.jpg",
      },
      {
        title: "Sala 7",
        description: "Espacio para Multi Eventos",
        image:
          "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07985-1536x1152.jpg",
      },
      {
        title: "Sala 8",
        description: "Espacio para Multi Eventos",
        image:
          "http://eljuvenil.com/wp-content/uploads/2019/11/Sala-8-81.jpg",
      },
      {
        title: "Sala 9",
        description: "Espacio para Multi Eventos",
        image:
          "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07922-1536x1152.jpg",
      },
      {
        title: "Sala 10",
        description: "Espacio para Multi Eventos",
        image:
          "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07968-1536x1152.jpg",
      },
    ];

    const transformedImages: IImage[] = objest.map((obj) => ({
      url: obj.image,
      description: obj.description,
    }));

    return transformedImages;
  }

  return (
    <>

      <Header />
      <Sidebar />
    <div className="rooms-container">
      {rooms.map((room) => (
        <div key={room.name} className="room-details">
          <InfoRoom
            image="http://eljuvenil.com/wp-content/uploads/2019/11/Sala1H.jpg"
            capacity={room.capacity}
            description={room.description}
            phone={room.phone}
            title={room.name}
          />

          <OpeningHours openingDays={room.openingHours} />

          <ServicesList services={room.services} />

          <HighlightedImages images={imagesAddit()}  onViewMore={(index) => console.log("A ver mas", index)}
                onEdit={(index) => console.log("A editar", index)}
                onDelete={(index) => console.log("A eliminar", index)}  />

          <div className="room-calendar">
            <h3>Turnos disponibles:</h3>
            <AppointmentCalendar _appointments={[]} />
          </div>
        </div>
      ))}

      <div  className="container-button-new">
        <button>Nueva Sala</button>
      </div>
    </div>
    </>
  );
};

export default RoomDetails;
