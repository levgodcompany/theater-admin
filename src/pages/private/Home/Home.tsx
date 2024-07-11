import { useEffect, useState } from "react";
import { Header } from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { getHttpLocalID } from "../../../services/LocalID.service";
import { useAppDispatch } from "../../../redux/hooks";
import { createLocalID } from "../../../redux/slices/LocalID.slice";
import {
  ClientDTO,
  getClientsHTTP,
  getLocalHTTP,
  ILocal,
} from "./services/Home.service";
import styles from "./css/Home.module.css"; // Estilos




const Home = () => {
  const dispatch = useAppDispatch();

  const [local, setLocal] = useState<ILocal | undefined>(undefined);
  const [totalClients, setTotalClients] = useState<ClientDTO[]>([]);
  const [bookingsByMonth, setBookingsByMonth] = useState<{
    [key: string]: number;
  }>({});
  const [earningsByMonth, setEarningsByMonth] = useState<{
    [key: string]: number;
  }>({});

  const getIdLocal = async () => {
    const res = await getHttpLocalID();
    if (res) {
      dispatch(createLocalID(res));
    }
  };

  const getLocal = async () => {
    const res = await getLocalHTTP();
    setLocal(res);
    const resCl = await getClientsHTTP();
    if (resCl) {
      setTotalClients(resCl);
    }
  };

  useEffect(() => {
    getIdLocal();
    getLocal();
  }, []);

  const calculateTotalBookings = () => {
    return (
      local?.rooms.reduce(
        (acc, room) => acc + room.availableAppointments.length,
        0
      ) || 0
    );
  };

  const getCurrentMonthAppointments = () => {
    const currentMonth = new Date().getMonth();
    return (
      local?.rooms.flatMap((room) =>
        room.availableAppointments.filter(
          (appointment) =>
            new Date(appointment.date).getMonth() === currentMonth
        )
      ) || []
    );
  };

  const calculateBookingsAndEarningsByMonth = () => {
    const bookings: { [key: string]: number } = {};
    const earnings: { [key: string]: number } = {};

    local?.rooms.forEach((room) => {
      room.availableAppointments.forEach((appointment) => {
        if (appointment.client != null) {
          const date = new Date(appointment.date);
          const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
          if (!bookings[monthKey]) {
            bookings[monthKey] = 0;
          }
          if (!earnings[monthKey]) {
            earnings[monthKey] = 0;
          }
          bookings[monthKey]++;
          earnings[monthKey] += appointment.dto
            ? appointment.dto.newPrice
            : appointment.price;
        }
      });
    });

    return { bookings, earnings };
  };

  useEffect(() => {
    if (local) {
      const { bookings, earnings } = calculateBookingsAndEarningsByMonth();
      setBookingsByMonth(bookings);
      setEarningsByMonth(earnings);
    }
  }, [local]);

  const totalRooms = local?.rooms.length || 0;
  const totalBookings = calculateTotalBookings();
  const currentMonthAppointments = getCurrentMonthAppointments();

  const info = (prop: string, value: string) => {
    return (
      <div className={styles.container_info}>
        <div className={styles.info_header}>
          <h2>{prop}</h2>
        </div>
        <div className={styles.info_body}>
          <p>{value}</p>
        </div>
      </div>
    );
  };

  const formateador = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <div className={styles.dashboardContainer}>
          {local ? (
            <div className={styles.dashboard}>
              {info(`Total de Clientes`, `${totalClients.length}`)}

              {info(`Total de Salas`, `${totalRooms}`)}

              {info(
                `Turnos del Mes Actual`,
                `${currentMonthAppointments.length}`
              )}

              {info(`Total de Turnos`, `${totalBookings}`)}

              <div>
                <h2>Turnos y Ganancias por Mes</h2>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Mes</th>
                      <th>Turnos</th>
                      <th>Ganancias</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(bookingsByMonth).map(([month, count]) => (
                      <tr key={month}>
                        <td>{month}</td>
                        <td>
                          <strong>{count}</strong>
                        </td>
                        <td>
                          <strong>
                            {formateador.format(earningsByMonth[month])}
                          </strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
