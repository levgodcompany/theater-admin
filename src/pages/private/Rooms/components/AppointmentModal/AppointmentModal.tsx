import React, { useEffect } from "react";
import Modal from "react-modal";
import "./css/AppointmentModal.css";

interface IAppointment {
  date: Date; // Fecha y hora del turno
  start: Date; // Hora de entrada
  end: Date; // Hora de salida
  title: string; // Título del turno
  description: string; // Descripción del turno
}

interface AppointmentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  appointment: IAppointment | null;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onRequestClose,
  appointment,
}) => {
  if (!appointment) return null;

  useEffect(() => {
    console.log("estado", isOpen);
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Appointment Details"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modalHeader">
        <h2 className="modalTitle">{appointment.title}</h2>
        <button className="closeButton" onClick={onRequestClose}>
          &times;
        </button>
      </div>
      <div className="modalContent">
        <p>
          <strong>Fecha:</strong> {appointment.date.toLocaleDateString()}
        </p>
        <p>
          <strong>Hora de entrada:</strong>{" "}
          {appointment.start.toLocaleTimeString()}
        </p>
        <p>
          <strong>Hora de salida:</strong>{" "}
          {appointment.end.toLocaleTimeString()}
        </p>
        <p>
          <strong>Descripción:</strong> {appointment.description}
        </p>
      </div>
      <div className="modalFooter">
        <button className="actionButton" onClick={onRequestClose}>
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default AppointmentModal;
