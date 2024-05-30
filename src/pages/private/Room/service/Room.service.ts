import { axiosInstance, JsonResponseToken } from "../../../../services/axios.service";
import { IRoom } from "../../Rooms/services/Rooms.service";


export const getRoomHTTP = async (idRoom: string) => {
    try {
        const response = await axiosInstance.get<JsonResponseToken<IRoom>>(`rooms/room/${idRoom}`);
        const data = response.data;

        return data.data;
      } catch (error) {
        console.error("Error loging in:", error);
        // Manejar el error de forma adecuada
      }
}