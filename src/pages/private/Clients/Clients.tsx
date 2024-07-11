import React, { useEffect, useState } from "react";
import {
  getClientsHTTP,
  getLocalHTTP,
  ILocal,
} from "../Home/services/Home.service";
import { Header } from "../../../components/Header/Header";
import styles from "./Clients.module.css";
import ConfirCancelReservation from "../../../components/ConfirCancelReservation/ConfirCancelReservation";

interface IClientApps {
  id: string;
  idRoom: string;
  appId: string;
  name: string;
  email: string;
  room: string;
  start: Date;
  end: Date;
  price: number;
  dto: number;
  newPrice: number;
}

const Clients = () => {
  const [local, setLocal] = useState<ILocal | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<IClientApps[]>([]);

  const [filterId, setFilterId] = useState<string>("");
  const [filterRoom, setFilterRoom] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");
  const [filterEmail, setFilterEmail] = useState<string>("");
  const [filterMonth, setFilterMonth] = useState<string>("");
  const [filterDay, setFilterDay] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [isConfCancel, setIsConfCancel] = useState(false);
  const [confCancel, setConfCancel] = useState<{
    idRoom: string;
    idApp: string;
  }>({
    idApp: "",
    idRoom: "",
  });

  const getLocalAndClients = async () => {
    setIsConfCancel(false);
    try {
      const [localData, clientsData] = await Promise.all([
        getLocalHTTP(),
        getClientsHTTP(),
      ]);
      if (localData && clientsData) {
        const newClients = localData.rooms.flatMap((room) =>
          room.availableAppointments.flatMap((app) =>
            clientsData
              .filter((client) => client.id === app.client)
              .map((client) => ({
                id: client.id,
                name: client.name,
                idRoom: room._id,
                appId: app._id,
                email: client.email,
                room: room.name,
                start: new Date(app.start),
                end: new Date(app.end),
                price: app.price,
                dto: app.dto ? app.dto.dto : 0,
                newPrice: app.dto ? app.dto.newPrice : 0,
              }))
          )
        );
        setClients(newClients);
      }
      setLocal(localData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getLocalAndClients();
  }, []);

  const formateador = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  const formatNumberDate = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  const uniqueClientIds = [...new Set(clients.map((client) => client.id))];
  const uniqueRooms = [...new Set(clients.map((client) => client.room))];
  const uniqueYears = [
    ...new Set(clients.map((client) => client.start.getFullYear())),
  ];
  const uniqueEmail = [...new Set(clients.map((client) => client.email))];
  const uniqueMonths = [
    ...new Set(clients.map((client) => client.start.getMonth() + 1)),
  ];
  const uniqueDays = [
    ...new Set(clients.map((client) => client.start.getDate())),
  ];

  const handleFilterChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setter(e.target.value);
    };

  const filterClients = () => {
    return clients.filter((client) => {
      const matchId = filterId ? client.id === filterId : true;
      const matchEmail = filterEmail ? client.email === filterEmail : true;
      const matchRoom = filterRoom ? client.room === filterRoom : true;
      const matchYear = filterYear
        ? client.start.getFullYear().toString() === filterYear
        : true;
      const matchMonth = filterMonth
        ? (client.start.getMonth() + 1).toString() === filterMonth
        : true;
      const matchDay = filterDay
        ? client.start.getDate().toString() === filterDay
        : true;
      const matchStatus = filterStatus
        ? determineStatus(client.start) === filterStatus
        : true;
      return (
        matchId &&
        matchEmail &&
        matchRoom &&
        matchYear &&
        matchMonth &&
        matchDay &&
        matchStatus
      );
    });
  };

  const determineStatus = (start: Date) => {
    const today = new Date();
    const startDate = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate()
    );

    if (
      startDate <
      new Date(today.getFullYear(), today.getMonth(), today.getDate())
    ) {
      return "past";
    } else if (
      startDate.getTime() ===
      new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()
    ) {
      return "today";
    } else {
      return "future";
    }
  };

  const renderClientTable = () => {
    if (loading) {
      return <p className={styles.loading}>Loading...</p>;
    }

    const filteredClients = filterClients();

    const totalPrice = filteredClients.reduce((prev, acc) => {
      if (acc.dto > 0) return (prev += acc.newPrice);
      return (prev += acc.price);
    }, 0);

    const now: Date = new Date();
    const isCancel = (start: Date) => {
      let diffInMillis: number = start.getTime() - now.getTime();
      let diffInHours: number = diffInMillis / (1000 * 60 * 60);
      return diffInHours > 24;
    };

    const cancelShifts = async (idRoom: string, id: string) => {
      setConfCancel({ idApp: id, idRoom: idRoom });
      setIsConfCancel(true);
    };

    const onClickConfCancelConf = () => {
      setIsConfCancel(!isConfCancel);
    };

    return (
      <>
        <Header />
        {isConfCancel ? (
          <ConfirCancelReservation
            cancel={onClickConfCancelConf}
            load={getLocalAndClients}
            idRoom={confCancel.idRoom}
            appointmentId={confCancel.idApp}
          />
        ) : (
          <></>
        )}
        <div className={styles.container}>
          <div className={styles.filters}>
            <div className={styles.container_email_list}>
              <label
                className={styles.container_email_list_label}
                htmlFor="browser"
              >
                Email list:
              </label>
              <input
                className={styles.container_email_list_input}
                list="browsers"
                value={filterEmail}
                onChange={handleFilterChange(setFilterEmail)}
                id="browser"
              />
              <datalist
                className={styles.container_email_data_list}
                id="browsers"
              >
                <option value={""}>Todos</option>
                {uniqueEmail.map((email) => (
                  <option key={email} value={email}>
                    {email}
                  </option>
                ))}
              </datalist>
            </div>
            <select
              className={styles.select}
              value={filterId}
              onChange={handleFilterChange(setFilterId)}
            >
              <option value="">Todos los IDClientes</option>
              {uniqueClientIds.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
            <select
              className={styles.select}
              value={filterRoom}
              onChange={handleFilterChange(setFilterRoom)}
            >
              <option value="">Todas las Salas</option>
              {uniqueRooms.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>

            <select
              className={styles.select}
              value={filterStatus}
              onChange={handleFilterChange(setFilterStatus)}
            >
              <option value="">Todos los Status</option>
              <option
                className={styles.past}
                style={{ color: "#fff" }}
                value="past"
              >
                Pasados
              </option>
              <option
                className={styles.today}
                style={{ color: "#fff" }}
                value="today"
              >
                Hoy
              </option>
              <option
                className={styles.future}
                style={{ color: "#fff" }}
                value="future"
              >
                Futuros
              </option>
            </select>

            <select
              className={styles.select}
              value={filterYear}
              onChange={handleFilterChange(setFilterYear)}
            >
              <option value="">Todos los Años</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
            <select
              className={styles.select}
              value={filterMonth}
              onChange={handleFilterChange(setFilterMonth)}
              disabled={!filterYear}
            >
              <option value="">Todos los Meses</option>
              {uniqueMonths.map((month) => (
                <option key={month} value={month.toString()}>
                  {formatNumberDate(month)}
                </option>
              ))}
            </select>
            <select
              className={styles.select}
              value={filterDay}
              onChange={handleFilterChange(setFilterDay)}
              disabled={!filterYear || !filterMonth}
            >
              <option value="">Todos los Días</option>
              {uniqueDays.map((day) => (
                <option key={day} value={day.toString()}>
                  {formatNumberDate(day)}
                </option>
              ))}
            </select>
          </div>
          {local && (
            <div className={styles.container_table}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID_Cliente</th>
                    <th>Cliente</th>
                    <th>Email</th>
                    <th>Sala</th>
                    <th>Día</th>
                    <th>Hora entrada</th>
                    <th>Hora salida</th>
                    <th>Precio</th>
                    <th>Off</th>
                    <th>Nuevo Precio</th>
                    <th>Status</th>
                    <th>Cancelar reserva</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client, i) => (
                    <tr key={i}>
                      <td>{client.id}</td>
                      <td>{client.name.replace(";", " ")}</td>
                      <td>{client.email}</td>
                      <td>
                        <strong>{client.room}</strong>
                      </td>
                      <td>
                        <strong>{`${client.start.getFullYear()}-${formatNumberDate(
                          client.start.getMonth() + 1
                        )}-${formatNumberDate(
                          client.start.getDate()
                        )}`}</strong>
                      </td>
                      <td>
                        <strong>{`${formatNumberDate(
                          client.start.getHours()
                        )}:${formatNumberDate(
                          client.start.getMinutes()
                        )}`}</strong>
                      </td>
                      <td>
                        <strong>{`${formatNumberDate(
                          client.end.getHours()
                        )}:${formatNumberDate(
                          client.end.getMinutes()
                        )}`}</strong>
                      </td>
                      <td>
                        <strong>{formateador.format(client.price)}</strong>
                      </td>
                      <td>
                        <strong>{client.dto}%</strong>
                      </td>
                      <td>
                        <strong>{formateador.format(client.newPrice)}</strong>
                      </td>
                      <td>
                        <span
                          className={`${styles.status} ${
                            styles[determineStatus(client.start)]
                          }`}
                        ></span>
                      </td>

                      <td>
                        {isCancel(client.start) ? (
                          <button
                            className={styles.button_cancel}
                            onClick={() =>
                              cancelShifts(client.idRoom, client.appId)
                            }
                          >
                            Cancelar
                          </button>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p style={{ textAlign: "end" }}>
            Turnos: <strong>{filteredClients.length}</strong> | Precio Total:
            <strong
              style={{
                textAlign: "end",
                backgroundColor: "#4caf50",
                color: "#fff",
                padding: "5px",
              }}
            >
              {formateador.format(totalPrice)}
            </strong>
          </p>
        </div>
        <div>
            <p>Eliminar todos los tunos pasados</p>
        </div>
      </>
    );
  };

  return renderClientTable();
};

export default Clients;
