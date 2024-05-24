import React from "react";
import OpeningHoursStyle from "./css/OpeningHours.module.css";
import editImage from '../../assets/edit-3-svgrepo-com.svg'

export interface IOpeningCloseHours {
  isOpen: boolean;
  open: string;
  close: string;
}

export interface IOpeningDays {
  monday: IOpeningCloseHours; // Horario de apertura los lunes
  tuesday: IOpeningCloseHours; // Horario de apertura los martes
  wednesday: IOpeningCloseHours; // Horario de apertura los miércoles
  thursday: IOpeningCloseHours; // Horario de apertura los jueves
  friday: IOpeningCloseHours; // Horario de apertura los viernes
  saturday: IOpeningCloseHours; // Horario de apertura los sábados
  sunday: IOpeningCloseHours; // Horario de apertura los domingos
}

interface OpeningHoursProps {
  openingDays: IOpeningDays;
}

const OpeningHours: React.FC<OpeningHoursProps> = ({ openingDays }) => {
  const days = [
    { name: "Lunes", value: openingDays.monday },
    { name: "Martes", value: openingDays.tuesday },
    { name: "Miércoles", value: openingDays.wednesday },
    { name: "Jueves", value: openingDays.thursday },
    { name: "Viernes", value: openingDays.friday },
    { name: "Sábado", value: openingDays.saturday },
    { name: "Domingo", value: openingDays.sunday },
  ];

  return (
    <div className={OpeningHoursStyle.opening_hours}>
      <div className={OpeningHoursStyle.header}>
        <h2>Horarios</h2>
        <img src={editImage} alt="" /> 
      </div>
      {days.map((day, index) => (
        <div key={index} className={OpeningHoursStyle.opening_hours_day}>
          <span className={OpeningHoursStyle.day_name}>{day.name}:</span>
          {day.value.isOpen ? (
            <span className={OpeningHoursStyle.hours}>
              {day.value.open} - {day.value.close}
            </span>
          ) : (
            <span className={OpeningHoursStyle.closed}>Cerrado</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default OpeningHours;
