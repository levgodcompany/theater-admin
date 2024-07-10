import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import LocalFormStyle  from "./css/LocalForm.module.css";
import { DtoRoom, IRoom, updateRoomHTTP } from "../../../services/Rooms.service";

interface FormModalProps {
  isOpen: boolean;
  idRoom: string;
  image: string;
  title: string;
  phone: string;
  capacity: number;
  description: string,
  length: string;
  Width: string;
  preice: number;
  dtos: DtoRoom[];
  typeRoom: string;
  onRequestClose: () => void;
}

interface FormData {
  image: string;
  title: string;
  email: string;
  phone: string;
  capacity: number;
  description: string;
  length: string;
  Width: string;
  price: number;
  typeRoom: string;
}

const LocalForm: React.FC<FormModalProps> = ({
  isOpen,
  idRoom,
  description,
  image,
  phone,
  capacity,
  title,
  length,
  Width,
  preice,
  dtos,
  typeRoom,
  onRequestClose
}) => {
  const [formData, setFormData] = useState<FormData>({
    image: "",
    title: "",
    email: "",
    phone: "",
    capacity: 0,
    length: "",
    Width: "",
    description: "",
    price: 0,
    typeRoom: ""
  });

  const [schedules, setSchedules] = useState<DtoRoom[]>(dtos);

  const [form, setForm] = useState<DtoRoom>({
    startHour: "",
    endHour: "",
    dto: 0,
  });

  useEffect(() => {
    setFormData({
      image: image,
      title: title,
      email: "",
      phone: phone,
      capacity: capacity,
      description: description,
      Width: Width,
      length: length,
      price: preice,
      typeRoom: typeRoom
    });
  },[image, title, phone, description, capacity]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const editetLocal = async (room: Partial<IRoom>)=> {
    await  updateRoomHTTP(idRoom, room);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editetLocal({
        name: formData.title,
        description: formData.description,
        capacity: formData.capacity,
        Width: formData.Width,
        length: formData.length,
        priceBase: formData.price,
        dtoRoomHours: schedules,
        typeRoom: formData.typeRoom,
        mainImage: {
            url: formData.image
        },
        phone: formData.phone
    })
    onRequestClose()
  };


  const handleDeleteHors = (index: number) => {
    const res = schedules.filter((_, i) => i !== index)
    setSchedules(res);
  };

  const handleChangeHorus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "dto" ? parseInt(value, 10) : value,
    });
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
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={LocalFormStyle.modal}
      overlayClassName={LocalFormStyle.overlay}
      ariaHideApp={false}
    >
      <h2>Informacion basica del Local</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Image URL *:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </label>
        <label>
          Titulo *:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Tipo de Sala *:
          <input
            type="text"
            name="typeRoom"
            value={formData.typeRoom}
            onChange={handleChange}
          />
        </label>
        <label>
          Precio Base *:
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>


        {formData.price > 0 ? (
            <>
              {" "}
              <p>Descueto segun Horario de entrada</p>
              <div className={LocalFormStyle.container_dto_hors}>
                <div className={LocalFormStyle.container_list_dto_hors}>
                  <h3>Horarios y Descuentos</h3>
                  {schedules.map((schedule, index) => (
                    <div
                      key={index}
                      className={LocalFormStyle.contianer_dto_hors_info}
                    >
                      <div>
                        <span>
                          {schedule.startHour} - {schedule.endHour}
                        </span>

                        <div className={LocalFormStyle.dto_hors_info}>
                          <p className={LocalFormStyle.dto_hors_info_info}>
                            <strong>Descuento (%):</strong>
                            <span>{schedule.dto}%</span>
                          </p>
                          <p className={LocalFormStyle.dto_hors_info_info}>
                            <strong>Precio:</strong>
                            <span>${formData.price}</span>
                          </p>
                          <p className={LocalFormStyle.dto_hors_info_info}>
                            <strong>Total de Descuento:</strong>
                            <span>
                              ${(schedule.dto / 100) * formData.price}
                            </span>
                          </p>
                          <p className={LocalFormStyle.dto_hors_info_info}>
                            <strong>Total:</strong>
                            <span>
                              <strong>
                                $
                                {formData.price -
                                  (schedule.dto / 100) * formData.price}
                              </strong>
                            </span>
                          </p>
                        </div>
                      </div>
                      <div
                        className={LocalFormStyle.contianer_dto_hors_info_button}
                      >
                        <button onClick={() => handleDeleteHors(index)}>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={LocalFormStyle.new_dto_hors}>
                  <>
                    <label
                      htmlFor="startHour"
                      className={LocalFormStyle.lavel_abierto}
                    >
                      Hora de Entrada:
                      <input
                        type="time"
                        id="startHour"
                        name="startHour"
                        value={form.startHour}
                        onChange={handleChangeHorus}
                      />
                    </label>
                  </>
                  <>
                    <label
                      htmlFor="endHour"
                      className={LocalFormStyle.lavel_abierto}
                    >
                      Hora de Salida:
                      <input
                        type="time"
                        id="endHour"
                        name="endHour"
                        value={form.endHour}
                        onChange={handleChangeHorus}
                      />
                    </label>
                  </>
                  <>
                    <label htmlFor="dto" className={LocalFormStyle.lavel_abierto}>
                      Descuento (%):
                      <input
                        type="number"
                        id="dto"
                        name="dto"
                        value={form.dto}
                        onChange={handleChangeHorus}
                        min="0"
                        max="100"
                      />
                    </label>
                  </>
                  <button onClick={handleAddHours}>Agregar</button>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

        <label>
          Largo *:
          <input
            type="text"
            name="length"
            value={formData.length}
            onChange={handleChange}
          />
        </label>

        <label>
          Ancho *:
          <input
            type="text"
            name="Width"
            value={formData.Width}
            onChange={handleChange}
          />
        </label>

        <label>
          Capacidad Máx. *:
          <input
            type="text"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
          />
        </label>

        <label>
          Cel.:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onRequestClose}>
          Cancelar
        </button>
      </form>
    </Modal>
  );
};

export default LocalForm;
