import React, { useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import NewEventModalStyle from "./NewEventModal.module.css";
import { IAppointment } from "../../../../Rooms/services/Rooms.service";
import HoursImage from "../../../../../../assets/clock-svgrepo-com.svg"
import DescriptionImage from "../../../../../../assets/text-description-svgrepo-com.svg"

interface NewEventModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (prevStart: Date, prevEnd: Date, event: IAppointment) => void;
  event: IAppointment;
}

const NewEventModal: React.FC<NewEventModalProps> = ({
  isOpen,
  onRequestClose,
  onSave,
  event,
}) => {
  const [title, setTitle] = useState(`${event.title}` || "");
  const [available, setAvailable] = useState<boolean>(event.available);
  const [description, setDescription] = useState(event.description || "");
  const [start, setStart] = useState(event.start as Date);
  const [end, setEnd] = useState(event.end as Date);

  const handleSave = () => {
    onSave(start, end, { ...event, title, start, end, description, available });
  };

  return (
    <Modal
      isOpen={isOpen}
      className={NewEventModalStyle.modal}
      overlayClassName={NewEventModalStyle.modal_overlay}
      onRequestClose={onRequestClose}
    >
      <div className={NewEventModalStyle.container}>
        <div className={NewEventModalStyle.container_form}>
          <div className={NewEventModalStyle.from_title}>

            <input
              type="text"
              placeholder="Añade un titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={NewEventModalStyle.date_start}>

            <div className={NewEventModalStyle.container_image_hour}>

              <img className={NewEventModalStyle.image_hour} src={HoursImage} alt="" />

            </div>
            <div className={NewEventModalStyle.date_hour}>
              <input
                type="datetime-local"
                value={moment(start).format("YYYY-MM-DDTHH:mm")}
                onChange={(e) => setStart(new Date(e.target.value))}
              />
              <span>-</span>
              <input
                type="datetime-local"
                value={moment(end).format("YYYY-MM-DDTHH:mm")}
                onChange={(e) => setEnd(new Date(e.target.value))}
              />

            </div>

          </div>


          <div className={NewEventModalStyle.container_info}>
            <div className={NewEventModalStyle.container_image_description}>
              <img className={NewEventModalStyle.image_description} src={DescriptionImage} alt="" />

            </div>
            <div className={NewEventModalStyle.container_info_description}>
              <textarea
                value={description}
                placeholder="Descripción"
                onChange={(e) => setDescription(e.target.value)}
              />

            </div>
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

export default NewEventModal;
