import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import RoutesWithNotFound from "../../utilities/RoutesWithNotFound.utility";
import { PrivateRoutes } from "../../routes/routes";


const Home = lazy(() => import("./Home/Home"));
const Local = lazy(() => import("./Local/Local"));
const Rooms = lazy(() => import("./Rooms/Rooms"));
const Room = lazy(() => import("./Room/Room"));

function Private() {
  return (
    <RoutesWithNotFound>
      <Route index element={<Navigate to={`${PrivateRoutes.HOME}`} />} />
      <Route path={`${PrivateRoutes.HOME}`} element={<Home />} />
      <Route path={`${PrivateRoutes.LOCAL}`} element={<Local />} />
      <Route path={`${PrivateRoutes.ROOMS}`} element={<Rooms />} />
      <Route path={`${PrivateRoutes.ROOM}/*`} element={<Room />} />
    </RoutesWithNotFound>
  );
}
export default Private;
