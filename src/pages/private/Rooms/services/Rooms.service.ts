import { axiosInstance, JsonResponseToken } from "../../../../services/axios.service";
import { IOpeningDays } from "../../Local/services/Local.service";


export interface IAppointment {
  _id: string;
  date: Date; // Fecha y hora del turno
  start: Date; // Hora de entrada
  end: Date; // Hora de salida
  title: string; // Título del turno
  description: string; // Descripción del turno
  available: boolean; // Para saber si el turno esta o no disponible
  client: string[] | null; // Cliente que reservó el turno
  }

  export interface IClient {
    _id: string;
    name: string; // Nombre del cliente
    email: string; // Correo electrónico del cliente
    password: string; // Contraseña del cliente
    phone: string; // Número de teléfono del cliente
    token: string; // Token del usuario (Esto se tiene que modificar a toda costa, esto no se hace de esta forma)
  }
  
export interface IRoom {
    _id: string;
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
  
export interface IImage {
    url: string; // URL de la imagen
    description?: string; // Descripción opcional de la imagen
  }
  

export const getRoomsHTTP = async () => {
    try {
        const response = await axiosInstance.get<JsonResponseToken<IRoom[]>>(`rooms/room`);
        const data = response.data;

        return data.data;
      } catch (error) {
        console.error("Error loging in:", error);
        // Manejar el error de forma adecuada
      }
}

export const getClientAppointment = async(
  roomId: string,
  clientId: string,
  appointmentId: string
) => {
  try {
      const response = await axiosInstance.get<JsonResponseToken<IClient>>(`clients/client/book-appointment/room/${roomId}/client/${clientId}/add/${appointmentId}`);
      const data = response.data;

      return data.data;
    } catch (error) {
      console.error("Error loging in:", error);
      // Manejar el error de forma adecuada
    }
}