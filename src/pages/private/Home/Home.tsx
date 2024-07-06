import { useEffect } from "react";
import { Header } from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { getHttpLocalID } from "../../../services/LocalID.service";
import { useAppDispatch } from "../../../redux/hooks";
import { createLocalID } from "../../../redux/slices/LocalID.slice";

const Home = () => {
  const dispatch = useAppDispatch();

  const getIdLocal = async () => {
    const res = await getHttpLocalID();
    console.log(res);
    if (res) {
      dispatch(createLocalID(res));
    }
  };

  useEffect(() => {
    getIdLocal();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Sidebar />

      </main>
    </>
  );
};

export default Home;
