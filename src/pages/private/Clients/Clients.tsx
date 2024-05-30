import { useState } from "react";
import { Header } from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import './css/Clients.css'
import Modal from 'react-modal';

export interface IClient {
    name: string; // Nombre del cliente
    email: string; // Correo electrónico del cliente
    password: string; // Contraseña del cliente
    phone: string; // Número de teléfono del cliente
    token: string; // Token del usuario (Esto se tiene que modificar a toda costa, esto no se hace de esta forma)
    bookedAppointments: IAppointmentClient[]; // Lista de turnos reservados por el cliente
  }

  export interface IAppointmentClient {
    roomId: string;
    nameRoom: string;
    date: Date; // Fecha y hora del turno
    start: Date; // Hora de entrada
    end: Date; // Hora de salida
    title: string; // Título del turno
    description: string; // Descripción del turno
  }

  interface Props {
    clients: IClient[]
  }

const Clients = ()=> {

    const clients: IClient[] = [
        {
          name: 'Juan Pérez',
          email: 'juan.perez@example.com',
          password: 'password123',
          phone: '123-456-7890',
          token: 'some_token_1',
          bookedAppointments: [
            {
              roomId: '1',
              nameRoom: 'Sala 1',
              date: new Date('2023-06-01'),
              start: new Date('2023-06-01T10:00:00'),
              end: new Date('2023-06-01T12:00:00'),
              title: 'Reunión de equipo',
              description: 'Reunión para discutir el proyecto.',
            },
          ],
        },
        {
          name: 'María García',
          email: 'maria.garcia@example.com',
          password: 'password456',
          phone: '987-654-3210',
          token: 'some_token_2',
          bookedAppointments: [
            {
              roomId: '2',
              nameRoom: 'Sala 2',
              date: new Date('2023-06-02'),
              start: new Date('2023-06-02T11:00:00'),
              end: new Date('2023-06-02T13:00:00'),
              title: 'Consulta de proyecto',
              description: 'Consulta sobre el avance del proyecto.',
            },
          ],
        },
        {
          name: 'Carlos López',
          email: 'carlos.lopez@example.com',
          password: 'password789',
          phone: '555-555-5555',
          token: 'some_token_3',
          bookedAppointments: [
            {
              roomId: '3',
              nameRoom: 'Sala 3',
              date: new Date('2023-06-03'),
              start: new Date('2023-06-03T12:00:00'),
              end: new Date('2023-06-03T14:00:00'),
              title: 'Presentación de resultados',
              description: 'Presentación de los resultados del proyecto.',
            },
          ],
        },
        {
            name: 'Juan Pérez',
            email: 'juan.perez@example.com',
            password: 'password123',
            phone: '123-456-7890',
            token: 'some_token_1',
            bookedAppointments: [
              {
                roomId: '1',
                nameRoom: 'Sala 1',
                date: new Date('2023-06-01'),
                start: new Date('2023-06-01T10:00:00'),
                end: new Date('2023-06-01T12:00:00'),
                title: 'Reunión de equipo',
                description: 'Reunión para discutir el proyecto.',
              },
            ],
          },
          {
            name: 'María García',
            email: 'maria.garcia@example.com',
            password: 'password456',
            phone: '987-654-3210',
            token: 'some_token_2',
            bookedAppointments: [
              {
                roomId: '2',
                nameRoom: 'Sala 2',
                date: new Date('2023-06-02'),
                start: new Date('2023-06-02T11:00:00'),
                end: new Date('2023-06-02T13:00:00'),
                title: 'Consulta de proyecto',
                description: 'Consulta sobre el avance del proyecto.',
              },
            ],
          },
          {
            name: 'Carlos López',
            email: 'carlos.lopez@example.com',
            password: 'password789',
            phone: '555-555-5555',
            token: 'some_token_3',
            bookedAppointments: [
              {
                roomId: '3',
                nameRoom: 'Sala 3',
                date: new Date('2023-06-03'),
                start: new Date('2023-06-03T12:00:00'),
                end: new Date('2023-06-03T14:00:00'),
                title: 'Presentación de resultados',
                description: 'Presentación de los resultados del proyecto.',
              },
            ],
          },
          {
            name: 'Juan Pérez',
            email: 'juan.perez@example.com',
            password: 'password123',
            phone: '123-456-7890',
            token: 'some_token_1',
            bookedAppointments: [
              {
                roomId: '1',
                nameRoom: 'Sala 1',
                date: new Date('2023-06-01'),
                start: new Date('2023-06-01T10:00:00'),
                end: new Date('2023-06-01T12:00:00'),
                title: 'Reunión de equipo',
                description: 'Reunión para discutir el proyecto.',
              },
            ],
          },
          {
            name: 'María García',
            email: 'maria.garcia@example.com',
            password: 'password456',
            phone: '987-654-3210',
            token: 'some_token_2',
            bookedAppointments: [
              {
                roomId: '2',
                nameRoom: 'Sala 2',
                date: new Date('2023-06-02'),
                start: new Date('2023-06-02T11:00:00'),
                end: new Date('2023-06-02T13:00:00'),
                title: 'Consulta de proyecto',
                description: 'Consulta sobre el avance del proyecto.',
              },
            ],
          },
          {
            name: 'Carlos López',
            email: 'carlos.lopez@example.com',
            password: 'password789',
            phone: '555-555-5555',
            token: 'some_token_3',
            bookedAppointments: [
              {
                roomId: '3',
                nameRoom: 'Sala 3',
                date: new Date('2023-06-03'),
                start: new Date('2023-06-03T12:00:00'),
                end: new Date('2023-06-03T14:00:00'),
                title: 'Presentación de resultados',
                description: 'Presentación de los resultados del proyecto.',
              },
            ],
          },
          {
            name: 'Juan Pérez',
            email: 'juan.perez@example.com',
            password: 'password123',
            phone: '123-456-7890',
            token: 'some_token_1',
            bookedAppointments: [
              {
                roomId: '1',
                nameRoom: 'Sala 1',
                date: new Date('2023-06-01'),
                start: new Date('2023-06-01T10:00:00'),
                end: new Date('2023-06-01T12:00:00'),
                title: 'Reunión de equipo',
                description: 'Reunión para discutir el proyecto.',
              },
            ],
          },
          {
            name: 'María García',
            email: 'maria.garcia@example.com',
            password: 'password456',
            phone: '987-654-3210',
            token: 'some_token_2',
            bookedAppointments: [
              {
                roomId: '2',
                nameRoom: 'Sala 2',
                date: new Date('2023-06-02'),
                start: new Date('2023-06-02T11:00:00'),
                end: new Date('2023-06-02T13:00:00'),
                title: 'Consulta de proyecto',
                description: 'Consulta sobre el avance del proyecto.',
              },
            ],
          },
          {
            name: 'Carlos López',
            email: 'carlos.lopez@example.com',
            password: 'password789',
            phone: '555-555-5555',
            token: 'some_token_3',
            bookedAppointments: [
              {
                roomId: '3',
                nameRoom: 'Sala 3',
                date: new Date('2023-06-03'),
                start: new Date('2023-06-03T12:00:00'),
                end: new Date('2023-06-03T14:00:00'),
                title: 'Presentación de resultados',
                description: 'Presentación de los resultados del proyecto.',
              },
            ],
          },
          {
            name: 'Juan Pérez',
            email: 'juan.perez@example.com',
            password: 'password123',
            phone: '123-456-7890',
            token: 'some_token_1',
            bookedAppointments: [
              {
                roomId: '1',
                nameRoom: 'Sala 1',
                date: new Date('2023-06-01'),
                start: new Date('2023-06-01T10:00:00'),
                end: new Date('2023-06-01T12:00:00'),
                title: 'Reunión de equipo',
                description: 'Reunión para discutir el proyecto.',
              },
            ],
          },
          {
            name: 'María García',
            email: 'maria.garcia@example.com',
            password: 'password456',
            phone: '987-654-3210',
            token: 'some_token_2',
            bookedAppointments: [
              {
                roomId: '2',
                nameRoom: 'Sala 2',
                date: new Date('2023-06-02'),
                start: new Date('2023-06-02T11:00:00'),
                end: new Date('2023-06-02T13:00:00'),
                title: 'Consulta de proyecto',
                description: 'Consulta sobre el avance del proyecto.',
              },
            ],
          },
          {
            name: 'Carlos López',
            email: 'carlos.lopez@example.com',
            password: 'password789',
            phone: '555-555-5555',
            token: 'some_token_3',
            bookedAppointments: [
              {
                roomId: '3',
                nameRoom: 'Sala 3',
                date: new Date('2023-06-03'),
                start: new Date('2023-06-03T12:00:00'),
                end: new Date('2023-06-03T14:00:00'),
                title: 'Presentación de resultados',
                description: 'Presentación de los resultados del proyecto.',
              },
            ],
          },
          {
            name: 'Juan Pérez',
            email: 'juan.perez@example.com',
            password: 'password123',
            phone: '123-456-7890',
            token: 'some_token_1',
            bookedAppointments: [
              {
                roomId: '1',
                nameRoom: 'Sala 1',
                date: new Date('2023-06-01'),
                start: new Date('2023-06-01T10:00:00'),
                end: new Date('2023-06-01T12:00:00'),
                title: 'Reunión de equipo',
                description: 'Reunión para discutir el proyecto.',
              },
            ],
          },
          {
            name: 'María García',
            email: 'maria.garcia@example.com',
            password: 'password456',
            phone: '987-654-3210',
            token: 'some_token_2',
            bookedAppointments: [
              {
                roomId: '2',
                nameRoom: 'Sala 2',
                date: new Date('2023-06-02'),
                start: new Date('2023-06-02T11:00:00'),
                end: new Date('2023-06-02T13:00:00'),
                title: 'Consulta de proyecto',
                description: 'Consulta sobre el avance del proyecto.',
              },
            ],
          },
          {
            name: 'Carlos López 5',
            email: 'carlos.lopez@example.com',
            password: 'password789',
            phone: '555-555-5555',
            token: 'some_token_3',
            bookedAppointments: [
              {
                roomId: '3',
                nameRoom: 'Sala 3',
                date: new Date('2023-06-03'),
                start: new Date('2023-06-03T12:00:00'),
                end: new Date('2023-06-03T14:00:00'),
                title: 'Presentación de resultados',
                description: 'Presentación de los resultados del proyecto.',
              },
              {
                roomId: '3',
                nameRoom: 'Sala 3',
                date: new Date('2023-06-03'),
                start: new Date('2023-06-03T12:00:00'),
                end: new Date('2023-06-03T14:00:00'),
                title: 'Presentación de resultados',
                description: 'Presentación de los resultados del proyecto.',
              },
              {
                roomId: '3',
                nameRoom: 'Sala 3',
                date: new Date('2023-06-03'),
                start: new Date('2023-06-03T12:00:00'),
                end: new Date('2023-06-03T14:00:00'),
                title: 'Presentación de resultados',
                description: 'Presentación de los resultados del proyecto.',
              },
              {
                roomId: '3',
                nameRoom: 'Sala 3',
                date: new Date('2023-06-03'),
                start: new Date('2023-06-03T12:00:00'),
                end: new Date('2023-06-03T14:00:00'),
                title: 'Presentación de resultados',
                description: 'Presentación de los resultados del proyecto.',
              },
              {
                roomId: '3',
                nameRoom: 'Sala 3',
                date: new Date('2023-06-03'),
                start: new Date('2023-06-03T12:00:00'),
                end: new Date('2023-06-03T14:00:00'),
                title: 'Presentación de resultados',
                description: 'Presentación de los resultados del proyecto.',
              },
              {
                roomId: '3',
                nameRoom: 'Sala 3',
                date: new Date('2023-06-03'),
                start: new Date('2023-06-03T12:00:00'),
                end: new Date('2023-06-03T14:00:00'),
                title: 'Presentación de resultados',
                description: 'Presentación de los resultados del proyecto.',
              },
            ],
          },
      ];
      

    const [selectedClient, setSelectedClient] = useState<IClient | null>(null);

    const [selectedAppointment, setSelectedAppointment] = useState<IAppointmentClient | null>(null);


    return <>
    <Header />
    <Sidebar />

    <div className="client-table-container">
      <table className="client-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.email} onClick={() => setSelectedClient(client)}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedClient && (
        <Modal
          isOpen={!!selectedClient}
          onRequestClose={() => setSelectedClient(null)}
          className="modal"
          overlayClassName="overlay"
        >
          <h2>Turnos de {selectedClient.name}</h2>
          <ul>
            {selectedClient.bookedAppointments.map((appointment, index) => (
              <li key={index} className="appointment-item">
                <h3>{appointment.title}</h3>
                <p><strong>Sala:</strong> {appointment.nameRoom}</p>
                <p><strong>Fecha:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                <p><strong>Hora de entrada:</strong> {new Date(appointment.start).toLocaleTimeString()}</p>
                <p><strong>Hora de salida:</strong> {new Date(appointment.end).toLocaleTimeString()}</p>
                <p><strong>Descripción:</strong> {appointment.description}</p>
              </li>
            ))}
          </ul>
          <button onClick={() => setSelectedClient(null)} className="close-button">Cerrar</button>
        </Modal>
      )}
    </div>


    </>
}

export default Clients;