import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import NewEventModalStyle from "./css/AppointmentModal.module.css";
import { IAppointment } from "../../../Rooms/services/Rooms.service";
import {
  ClientDTO,
  getClientsHTTP,
  getClientsRegisterHTTP,
  postNotClientsHTTP,
} from "../../service/Room.service";
import HoursImage from "../../../../../assets/clock-svgrepo-com.svg";
import DescriptionImage from "../../../../../assets/text-description-svgrepo-com.svg";
import UsersImage from "../../../../../assets/users.svg";
import UserImage from "../../../../../assets/user-1-svgrepo-com.svg";
import ReactQuill from "react-quill";

interface NewEventModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (event: IAppointment) => void;
  onDelet: (IAppointment: string) => void;
  onPrint: ()=> void;
  capacity: number;
  event: IAppointment;
}

const AppointmentModal: React.FC<NewEventModalProps> = ({
  isOpen,
  onRequestClose,
  onSave,
  onDelet,
  onPrint,
  event,
  capacity
}) => {
  // State hooks for form fields
  const [title, setTitle] = useState(event.title);
  const [available, setAvailable] = useState<boolean>(event.available);
  const [description, setDescription] = useState(event.description);
  const [start, setStart] = useState(event.start as Date);
  const [end, setEnd] = useState(event.end as Date);

  // State hooks for client management
  const [inputValue, setInputValue] = useState<string>("");
  const [inputValueOrganizer, setInputValueOrganizer] = useState<string>("");
  const [selectedClients, setSelectedClients] = useState<ClientDTO[]>([]);
  const [selectedClientOrganizer, setSelectedClientOrganizer] =
    useState<ClientDTO>({
      id: "",
      name: "",
      email: "",
      phone: "",
      isRegister: true,
    });

  const [isOpenNewNotClient, setIsOpenNewNotClient] = useState<boolean>(false);
  const [newNotClient, setNewNotClient] = useState<ClientDTO>({
    id: "",
    name: "",
    email: "",
    phone: "",
    isRegister: false,
  });

  const [clients, setClients] = useState<ClientDTO[]>([]);
  const [clientsRegister, setClientsRegister] = useState<ClientDTO[]>([]);

  // Effect to sync event data with state
  useEffect(() => {
    setTitle(event.title);
    setAvailable(event.available);
    setDescription(event.description);
    setStart(event.start as Date);
    setEnd(event.end as Date);

    if (event.client) {
      const organizerIndex = clientsRegister.findIndex(
        (cl) => cl.id === event.client
      );
      if (organizerIndex !== -1) {
        setSelectedClientOrganizer(clientsRegister[organizerIndex]);
      } else {
        setSelectedClientOrganizer({
          id: "",
          name: "",
          email: "",
          phone: "",
          isRegister: true,
        });
      }
    } else {
      setSelectedClientOrganizer({
        id: "",
        name: "",
        email: "",
        phone: "",
        isRegister: true,
      });
    }

    const selectedEventClients: ClientDTO[] = [];
    if (event.GuestListClient.length > 0) {
      clients.forEach((client) => {
        if (event.GuestListClient.includes(client.id)) {
          selectedEventClients.push(client);
        }
      });
    }

    if (event.GuestListNotClient.length > 0) {
      clientsRegister.forEach((client) => {
        if (event.GuestListNotClient.includes(client.id)) {
          selectedEventClients.push(client);
        }
      });
    }
    setSelectedClients(selectedEventClients);
  }, [event, clients, clientsRegister]);

  // Effect to fetch clients data
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const [clientsData, clientsRegisterData] = await Promise.all([
          getClientsHTTP(),
          getClientsRegisterHTTP(),
        ]);
        setClients(clientsData || []);
        setClientsRegister(clientsRegisterData || []);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
  }, []);

  // Handlers for form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);
  const handleInputOrganizerChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValueOrganizer(e.target.value);

  // Handler for selecting clients from the list
  const handleOptionClick = (client: ClientDTO) => {
    if (
      !selectedClients.some((selectedClient) => selectedClient.id === client.id)
    ) {
      setSelectedClients((prev) => [...prev, client]);
    }
    setInputValue("");
  };

  const handleOptionOrganizerClick = (client: ClientDTO) => {
    setSelectedClientOrganizer(client);
    setInputValueOrganizer("");
  };

  const handleRemoveOption = (client: ClientDTO) => {
    setSelectedClients((prev) =>
      prev.filter((selectedClient) => selectedClient.email !== client.email)
    );
  };

  const handleRemoveOrganizerOption = () => {
    setSelectedClientOrganizer({
      id: "",
      name: "",
      email: "",
      phone: "",
      isRegister: true,
    });
  };

  // Filter clients based on input values
  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      client.email.toLowerCase().includes(inputValue.toLowerCase())
  );

  const filteredClientsRegister = clientsRegister.filter(
    (client) =>
      client.name.toLowerCase().includes(inputValueOrganizer.toLowerCase()) ||
      client.email.toLowerCase().includes(inputValueOrganizer.toLowerCase())
  );

  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleAddNewClient = () => {
    if (isValidEmail(inputValue)) {
      const newClient: ClientDTO = {
        id: "",
        name: "",
        email: inputValue,
        phone: "",
        isRegister: false,
      };

      if (
        selectedClients.some(
          (client) => client.email.toLowerCase() === inputValue.toLowerCase()
        )
      ) {
        alert("El correo ya está registrado en la lista");
      } else {
        setSelectedClients((prev) => [...prev, newClient]);
        setInputValue("");
      }
    } else {
      alert("Correo electrónico no válido");
    }
  };

  // Save handler for the modal
  const handleSave = () => {
    const organizerId =
      selectedClientOrganizer.id === "" ? null : selectedClientOrganizer.id;
    const selectedClientIds: string[] = [];
    const selectedNotClientIds: string[] = [];

    selectedClients.forEach((client) => {
      if (client.isRegister) {
        selectedClientIds.push(client.id);
      } else {
        selectedNotClientIds.push(client.id);
      }
    });

    if (
      organizerId === null &&
      (selectedClientIds.length > 0 || selectedNotClientIds.length > 0)
    ) {
      alert(
        "Tienes que agregar a un organizador para poder invitar a más gente"
      );
    } else {
      onSave({
        ...event,
        title,
        start,
        end,
        description,
        available,
        client: organizerId,
        GuestListClient: selectedClientIds,
        GuestListNotClient: selectedNotClientIds,
      });
    }
  };

  // Save handler for the modal
  const handleDelete = () => {
    onDelet(event._id);
  };

  // Handlers for new non-registered client info
  const addInfoNotClient = (client: ClientDTO) => {
    setIsOpenNewNotClient(true);
    setNewNotClient(client);
  };

  const saveNewNotClient = async () => {
    try {
      await postNotClientsHTTP(newNotClient);
      setSelectedClients((prev) =>
        prev.map((client) =>
          client.email === newNotClient.email ? newNotClient : client
        )
      );
      setClients((prev) => [...prev, newNotClient]);
      setIsOpenNewNotClient(false);
    } catch (error) {
      console.error("Error saving new client:", error);
    }
  };

  const handleInputNameNewNotClient = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewNotClient((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleOpenPrint = () => {

    onPrint()
  };

  const handleDescriptionChange = (value:string) => {
    setDescription(value);
  };


  return (
    <>
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
                placeholder="Añade un título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className={NewEventModalStyle.date_start}>
              <div className={NewEventModalStyle.container_image_hour}>
                <img
                  className={NewEventModalStyle.image_hour}
                  src={HoursImage}
                  alt="Clock"
                />
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
                <img
                  className={NewEventModalStyle.image_description}
                  src={DescriptionImage}
                  alt="Description"
                />
              </div>
              <div className={NewEventModalStyle.container_info_description}>
              <ReactQuill
                className={NewEventModalStyle.container_info_description_des}
                value={description}
                onChange={handleDescriptionChange}
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link"],
                    ["clean"],
                  ],
                }}
                formats={[
                  "bold",
                  "italic",
                  "underline",
                  "list",
                  "bullet",
                  "link",
                ]}
              />
              </div>
            </div>

            <div></div>

            <div className={NewEventModalStyle.container_capacity_max}>
            <span>
              Capacidad máx. de Personas: <strong>{capacity}</strong>
            </span>
          </div>


            <div className={NewEventModalStyle.container_client}>
              <div className={NewEventModalStyle.container_image_client}>
                <img
                  className={NewEventModalStyle.image_client}
                  src={UserImage}
                  alt="User"
                />
              </div>
              <div className={NewEventModalStyle.autocomplete_select}>
                <input
                  type="text"
                  value={inputValueOrganizer}
                  onChange={handleInputOrganizerChange}
                  placeholder="Añade organizador"
                  className={NewEventModalStyle.input}
                />
                {inputValueOrganizer && (
                  <ul className={NewEventModalStyle.options_list}>
                    {filteredClientsRegister.map((client) => (
                      <li
                        key={client.id}
                        onClick={() => handleOptionOrganizerClick(client)}
                      >
                        <span>{client.name}</span>
                        <span>{client.email}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {selectedClientOrganizer.id && (
                  <ul className={NewEventModalStyle.selected_options}>
                    <li className={NewEventModalStyle.selected_option}>
                      <>
                        <span>{selectedClientOrganizer.name} *</span>
                        <button
                          onClick={handleRemoveOrganizerOption}
                          className={NewEventModalStyle.remove_button}
                        >
                          Remove
                        </button>
                      </>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            <div className={NewEventModalStyle.container_client}>
              <div className={NewEventModalStyle.container_image_client}>
                <img
                  className={NewEventModalStyle.image_client}
                  src={UsersImage}
                  alt="Users"
                />
              </div>
              <div className={NewEventModalStyle.autocomplete_select}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Añade invitados"
                  className={NewEventModalStyle.input}
                />
                {inputValue && (
                  <ul className={NewEventModalStyle.options_list}>
                    {filteredClients.length > 0 ? (
                      filteredClients.map((client) => (
                        <li
                          key={client.id}
                          onClick={() => handleOptionClick(client)}
                          className={
                            selectedClients.some(
                              (selectedClient) =>
                                selectedClient.id === client.id
                            )
                              ? NewEventModalStyle.disabled_option
                              : ""
                          }
                        >
                          <span>{client.name}</span>
                          <span>{client.email}</span>
                        </li>
                      ))
                    ) : (
                      <li
                        onClick={handleAddNewClient}
                        className={NewEventModalStyle.add_option}
                      >
                        Add "{inputValue}"
                      </li>
                    )}
                  </ul>
                )}
                <ul className={NewEventModalStyle.selected_options}>
                  {selectedClients.map((client) => (
                    <li
                      key={client.id}
                      className={NewEventModalStyle.selected_option}
                    >
                      {client.name === "" ? (
                        <>
                          {isOpenNewNotClient ? (
                            <div
                              className={NewEventModalStyle.container_addinfo}
                            >
                              <div>
                                <input
                                  type="text"
                                  placeholder="Nombre completo"
                                  onChange={handleInputNameNewNotClient}
                                  value={newNotClient.name}
                                />
                                <button onClick={saveNewNotClient}>
                                  Guardar
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <span>{client.email} *</span>
                              <button
                                onClick={() => addInfoNotClient(client)}
                                className={NewEventModalStyle.remove_button}
                              >
                                Add Info
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleRemoveOption(client)}
                            className={NewEventModalStyle.remove_button}
                          >
                            Remove
                          </button>
                        </>
                      ) : (
                        <>
                          <span>{client.name} *</span>
                          <button
                            onClick={() => handleRemoveOption(client)}
                            className={NewEventModalStyle.remove_button}
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={NewEventModalStyle.container_availability}>
              <label className={NewEventModalStyle.availability_label}>
                Disponible:
              </label>
              <input
                type="checkbox"
                name="available"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
              />
            </div>
            <div className={NewEventModalStyle.container_buttons}>
              <button type="button" onClick={handleDelete}>
                Eliminar
              </button>
              <button type="button" onClick={handleSave}>
                Editar
              </button>
            </div>
          </div>
        </div>

        <button onClick={handleOpenPrint}>Imprimir</button>
      </Modal>

    </>
  );
};

export default AppointmentModal;
