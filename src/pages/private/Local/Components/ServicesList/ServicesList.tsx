import React from 'react';
import ServiceStyle from './css/ServicesList.module.css';
import editImage from '../../assets/edit-3-svgrepo-com.svg'

interface ServicesListProps {
  services: string[];
}

const ServicesList: React.FC<ServicesListProps> = ({ services }) => {
  return (
    <div className={ServiceStyle.services_list}>
      <div className={ServiceStyle.header}>
        <h2>Servicios que ofrece el local</h2>
        <img src={editImage} alt="" /> 
      </div>
      <ul>
        {services.map((service, index) => (
          <li key={index} className={ServiceStyle.service_item}>
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesList;
