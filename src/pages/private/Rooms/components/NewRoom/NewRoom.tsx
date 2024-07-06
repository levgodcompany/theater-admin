import { useState } from "react";
import NewRoomStyle from "./css/NewRoom.module.css";
import {
  DtoRoom,
  IImage,
  newRoom,
  RoomDTO,
} from "../../services/Rooms.service";
import { IOpeningDays } from "../OpeningHours/OpeningHours";
import deleteImage from "../../../../../assets/delete-svgrepo-com.svg";
import editImage from "../../../../../assets/edit-3-svgrepo-com.svg";

interface FormData {
  image: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  capacity: number;
  priceBase: number;
  length: number;
  Width: number;
  typeRoom: string;
}

interface NewRoomProps {
  loadRoom:  ()=> void;
  closeNewRoom: ()=> void;
}

const NewRoom: React.FC<NewRoomProps> = ({loadRoom, closeNewRoom}) => {


  const [formData, setFormData] = useState<FormData>({
    image: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    capacity: 0,
    priceBase: 0,
    length: 0,
    Width: 0,
    typeRoom: ""
  });

  const [openingHours, _setOpeningHours] = useState<IOpeningDays>({
    monday: { isOpen: false, open: "", close: "" },
    tuesday: { isOpen: false, open: "", close: "" },
    wednesday: { isOpen: false, open: "", close: "" },
    thursday: { isOpen: false, open: "", close: "" },
    friday: { isOpen: false, open: "", close: "" },
    sunday: { isOpen: false, open: "", close: "" },
    saturday: { isOpen: false, open: "", close: "" },
  });

  const [editedServices, setEditedServices] = useState<string[]>([]);
  const [newService, setNewService] = useState<string>("");
  const [form, setForm] = useState<DtoRoom>({
    startHour: "",
    endHour: "",
    dto: 0,
  });

  const [schedules, setSchedules] = useState<DtoRoom[]>([]);

  const handleChangeHorus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "dto" ? parseInt(value, 10) : value,
    });
  };

  const handleDeleteHors = (index: number) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };
  const [localImages, setLocalImages] = useState<IImage[]>([]);

  const handleChangeSave = async () => {
    const roomSave: RoomDTO = {
      price: formData.priceBase,
      name: formData.title,
      capacity: formData.capacity,
      phone: formData.phone,
      description: formData.description,
      openingHours: openingHours,
      mainImage: localImages.length > 0 ? localImages[0] : { url: "" },
      additionalImages: localImages,
      services: editedServices,
      dtoRoomHours: schedules,
      length: formData.length,
      Width: formData.Width,
      typeRoom: formData.typeRoom
      
    };
    await newRoom(roomSave);
    loadRoom();
    closeNewRoom()
  };

  const handleChangeDataRoom = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeDataRoomNumber = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number.parseInt(value) });
  };


  const handleDeleteService = (service: string) => {
    setEditedServices(editedServices.filter((s) => s !== service));
  };

  const handleEditService = (oldService: string, newService: string) => {
    const index = editedServices.indexOf(oldService);
    if (index !== -1) {
      const updatedServices = [...editedServices];
      updatedServices[index] = newService;
      setEditedServices(updatedServices);
    }
  };

  const handleOnClickAddService = () => {
    setEditedServices([...editedServices, newService]);
    setNewService("");
  };

  const handleChangeImage = (
    index: number,
    field: keyof IImage,
    value: string
  ) => {
    const newImages = [...localImages];
    newImages[index] = { ...newImages[index], [field]: value };
    setLocalImages(newImages);
  };

  const handleAddImage = () => {
    setLocalImages([...localImages, { url: "", description: "" }]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = localImages.filter((_, i) => i !== index);
    setLocalImages(newImages);
  };

  const isOverlapping = (
    newSchedule: DtoRoom,
    existingSchedules: DtoRoom[]
  ): boolean => {
    const newStart = new Date(`1970-01-01T${newSchedule.startHour}:00`);
    const newEnd = new Date(`1970-01-01T${newSchedule.endHour}:00`);

    return existingSchedules.some((schedule) => {
      const existingStart = new Date(`1970-01-01T${schedule.startHour}:00`);
      const existingEnd = new Date(`1970-01-01T${schedule.endHour}:00`);

      return newStart < existingEnd && newEnd > existingStart;
    });
  };

  const handleAddHours = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOverlapping(form, schedules)) {
      alert("El horario ingresado se solapa con un horario existente.");
    } else {
      setSchedules([...schedules, form]);
      setForm({
        startHour: "",
        endHour: "",
        dto: 0,
      });
    }
  };

  return (
    <div className={NewRoomStyle.container}>
      <div className={NewRoomStyle.new_room}>
        <div className={NewRoomStyle.form}>
          {
            // ****** Datos Basicos de la sala
          }
          <p>Información del Local</p>
          <div className={NewRoomStyle.container_data_room}>
            <label className={NewRoomStyle.label_data_room}>
              Titulo *:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChangeDataRoom}
              />
            </label>

            <label className={NewRoomStyle.label_data_room}>
              Typo de Sala *:
              <input
                type="text"
                name="typeRoom"
                value={formData.typeRoom}
                onChange={handleChangeDataRoom}
              />
            </label>

            <label className={NewRoomStyle.label_data_room}>
              Precio Base *:
              <input
                type="number"
                name="priceBase"
                value={formData.priceBase}
                onChange={handleChangeDataRoomNumber}
              />
            </label>
            <label className={NewRoomStyle.label_data_room}>
              Capacidad Máx. *:
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChangeDataRoomNumber}
              />
            </label>
            <label className={NewRoomStyle.label_data_room}>
              Largo *:
              <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleChangeDataRoomNumber}
              />
            </label>
            <label className={NewRoomStyle.label_data_room}>
              Ancho *:
              <input
                type="number"
                name="Width"
                value={formData.Width}
                onChange={handleChangeDataRoomNumber}
              />
            </label>
            <label className={NewRoomStyle.label_data_room}>
              Cel.:
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChangeDataRoom}
              />
            </label>
            <label className={NewRoomStyle.label_data_room}>
              Descripción:
              <textarea
                name="Descripción"
                maxLength={300}
                value={formData.description}
                onChange={handleChangeDataRoom}
              ></textarea>
            </label>
          </div>

          {formData.priceBase > 0 ? (
            <>
              {" "}
              <p>Descueto segun Horario de entrada</p>
              <div className={NewRoomStyle.container_dto_hors}>
                <div className={NewRoomStyle.container_list_dto_hors}>
                  <h3>Horarios y Descuentos</h3>
                  {schedules.map((schedule, index) => (
                    <div
                      key={index}
                      className={NewRoomStyle.contianer_dto_hors_info}
                    >
                      <div>
                        <span>
                          {schedule.startHour} - {schedule.endHour}
                        </span>

                        <div className={NewRoomStyle.dto_hors_info}>
                          <p className={NewRoomStyle.dto_hors_info_info}>
                            <strong>Descuento (%):</strong>
                            <span>{schedule.dto}%</span>
                          </p>
                          <p className={NewRoomStyle.dto_hors_info_info}>
                            <strong>Precio:</strong>
                            <span>${formData.priceBase}</span>
                          </p>
                          <p className={NewRoomStyle.dto_hors_info_info}>
                            <strong>Total de Descuento:</strong>
                            <span>
                              ${(schedule.dto / 100) * formData.priceBase}
                            </span>
                          </p>
                          <p className={NewRoomStyle.dto_hors_info_info}>
                            <strong>Total:</strong>
                            <span>
                              <strong>
                                $
                                {formData.priceBase -
                                  (schedule.dto / 100) * formData.priceBase}
                              </strong>
                            </span>
                          </p>
                        </div>
                      </div>
                      <div
                        className={NewRoomStyle.contianer_dto_hors_info_button}
                      >
                        <button onClick={() => handleDeleteHors(index)}>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={NewRoomStyle.new_dto_hors}>
                  <div>
                    <label
                      htmlFor="startHour"
                      className={NewRoomStyle.lavel_abierto}
                    >
                      Hora de Entrada:
                      <input
                        type="time"
                        id="startHour"
                        name="startHour"
                        value={form.startHour}
                        onChange={handleChangeHorus}
                        required
                      />
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="endHour"
                      className={NewRoomStyle.lavel_abierto}
                    >
                      Hora de Salida:
                      <input
                        type="time"
                        id="endHour"
                        name="endHour"
                        value={form.endHour}
                        onChange={handleChangeHorus}
                        required
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="dto" className={NewRoomStyle.lavel_abierto}>
                      Descuento (%):
                      <input
                        type="number"
                        id="dto"
                        name="dto"
                        value={form.dto}
                        onChange={handleChangeHorus}
                        min="0"
                        max="100"
                        required
                      />
                    </label>
                  </div>
                  <button onClick={handleAddHours}>Agregar</button>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          {
            // ********* Servicios que ofrece la sala
          }
          <p>Servicios</p>
          <div className={NewRoomStyle.container_service}>
            <div className={NewRoomStyle.service_list}>
              {editedServices.map((service, index) => (
                <div className={NewRoomStyle.service} key={index}>
                  <span>{service}</span>
                  <div className={NewRoomStyle.service_actions}>
                    <img
                      onClick={() => handleDeleteService(service)}
                      src={deleteImage}
                      alt=""
                    />
                    <img
                      onClick={() =>
                        handleEditService(
                          service,
                          prompt("Editar servicio:", service) || service
                        )
                      }
                      src={editImage}
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className={NewRoomStyle.new_service}>
              <input
                type="text"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                placeholder="Nuevo servicio"
              />
              <button onClick={handleOnClickAddService}>Agregar</button>
            </div>
          </div>

          {
            // ******** Imagenes
          }
          <p>Imagenes</p>
          <div className={NewRoomStyle.image_form}>
            {localImages.map((image, index) => (
              <div key={index} className={NewRoomStyle.image_form_group}>
                <div className={NewRoomStyle.container_image_info}>
                  <input
                    type="text"
                    placeholder="URL de la imagen"
                    value={image.url}
                    onChange={(e) =>
                      handleChangeImage(index, "url", e.target.value)
                    }
                  />
                  <textarea
                    value={image.description || ""}
                    onChange={(e) =>
                      handleChangeImage(index, "description", e.target.value)
                    }
                  ></textarea>
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className={NewRoomStyle.remove_button}
                  >
                    Eliminar
                  </button>
                </div>
                {image.url && (
                  <img
                    src={image.url}
                    alt="Preview"
                    width={200}
                    height={200}
                    className={NewRoomStyle.image_preview}
                  />
                )}
              </div>
            ))}
            <div>
              <button onClick={handleAddImage} className="add-button">
                Agregar Imagen
              </button>
            </div>
          </div>

          <button onClick={handleChangeSave}>Crear Sala</button>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
