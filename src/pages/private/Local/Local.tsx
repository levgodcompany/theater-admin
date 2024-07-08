import { useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getLocal } from "./services/Local.service";
import { Header } from "../../../components/Header/Header";
import LocalStyle from "./css/Local.module.css";
import Card from "./Components/Card_B/InfoLocal";
import HighlightedImages from "./Components/HighlightedImages/HighlightedImages";
import ServicesList from "./Components/ServicesList/ServicesList";
import { createLocal } from "../../../redux/slices/Local.slice";

const Local = () => {
  const dispatch = useAppDispatch();

  //const [local, setLocal] = useState<ILocal | null>(null);

  const local = useAppSelector((state) => state.local);

  const getLocalLoad = async () => {
    const res = await getLocal();
    if (res) {;
      dispatch(createLocal(res))
  //    setLocal(res);
    }
  };

  useEffect(() => {
    getLocalLoad();
  }, []);

  return (
    <>
      <Sidebar />
      <Header />

      {local ? (
        <>
          <main className={LocalStyle.main_container}>
            <section>
              <Card
                image={local.mainImage.url}
                title={local.name}
                email={local.email}
                phone={local.phone}
                address={local.address}
                description={local.description}
              />
            </section>
            
            <section>
              <ServicesList services={local.services} />
            </section>
            <section className={LocalStyle.section_images_additional}>
              <HighlightedImages
                images={local.additionalImages}
              />
            </section>
          </main>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Local;
