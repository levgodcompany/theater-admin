import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import NewEventModalStyle from "./css/AppointmentModal.module.css";
import { IAppointment } from "../../../Rooms/services/Rooms.service";

/**
 * TERMINAR DE IMPLEMENTAR LA FECHA ANTERIOR PARA PDOER HACER LA EDICION
 */
interface NewEventModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (prevSatar:Date, prevEnd: Date, event: IAppointment) => void;
  event: IAppointment;
}

const AppointmentModal: React.FC<NewEventModalProps> = ({
  isOpen,
  onRequestClose,
  onSave,
  event,
}) => {
  const [title, setTitle] = useState<string>(event.title);
  const [available, setAvailable] = useState<boolean>(event.available);
  const [description, setDescription] = useState<string>(event.description);
  const [start, setStart] = useState<Date>(event.start as Date);
  const [end, setEnd] = useState<Date>(event.end as Date);

  const [prevStart, setPrevStart] = useState<Date>(event.start as Date);
  const [prevEnd, setPrevEnd] = useState<Date>(event.end as Date);

  const handleSave = () => {
    onSave(prevStart, prevEnd, { ...event, title, start, end, description, available });
  };

  useEffect(() => {
    setTitle(event.title);
    setStart(event.start);
    setPrevEnd(event.end);
    setPrevStart(event.start);
    setEnd(event.end);
    setDescription(event.description);
    setAvailable(event.available);
  }, [event]);

  return (
    <Modal
      isOpen={isOpen}
      className={NewEventModalStyle.modal}
      overlayClassName={NewEventModalStyle.modal_overlay}
      onRequestClose={onRequestClose}
    >
      <div className={NewEventModalStyle.container}>
        <h2>Editar evento</h2>
        <div className={NewEventModalStyle.container_form}>
          <div className={NewEventModalStyle.from_title}>
            <strong>
              <label>Título</label>:
            </strong>
            <input
              type="text"
              placeholder="Titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={NewEventModalStyle.date_start}>
            <strong>
              <label>Fecha de inicio</label>:
            </strong>
            <input
              type="datetime-local"
              value={moment(start).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) => setStart(new Date(e.target.value))}
            />
          </div>
          <div className={NewEventModalStyle.date_end}>
            <strong>
              <label>Fecha de fin</label>:
            </strong>
            <input
              type="datetime-local"
              value={moment(end).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) => setEnd(new Date(e.target.value))}
            />
          </div>

          <div className={NewEventModalStyle.container_info}>
            <strong>
              <label>Descripción</label>
            </strong>
            <textarea
              value={description}
              placeholder="Descripción"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className={NewEventModalStyle.availability_label}>
              Disponible:
              <input
                type="checkbox"
                name="available"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
              />
            </label>
          </div>

          <div>
            <button type="button" onClick={handleSave}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AppointmentModal;
