
import { useEffect } from "react";
import CarouselComp from "../../../components/CourserComps/CarouselComp";
import { Header } from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Room from "./Components/Rooms/Room";

import HomeStyle from "./css/Home.module.css";
import { getHttpLocalID } from "../../../services/LocalID.service";
import { useAppDispatch } from "../../../redux/hooks";
import { createLocalID } from "../../../redux/slices/LocalID.slice";


interface CustomCard {
  title: string;
  content: string;
}

const customCards: CustomCard[] = [
  { title: 'Card 1', content: 'This is the first card' },
  { title: 'Card 2', content: 'This is the second card' },
  { title: 'Card 3', content: 'This is the third card' },
  { title: 'Card 4', content: 'This is the fourth card' },
];

const renderCustomCard = (card: CustomCard) => (
  <div className="custom-card">
    <h2>{card.title}</h2>
    <p>{card.content}</p>
  </div>
);


const Home = () => {
  const objest: {
    image: string;
    title: string;
    description: string;
  }[] = [
    {
      title: "Sala 1",
      description: "Espacio para Multi Eventos",
      image: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala1H.jpg",
    },
    {
      title: "Sala 2",
      description: "Espacio para Multi Eventos",
      image:
        "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07903-1536x1152.jpg",
    },
    {
      title: "Sala 3",
      description: "Espacio para Multi Eventos",
      image:
        "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07936-1024x768.jpg",
    },
    {
      title: "Sala 4",
      description: "Espacio para Multi Eventos",
      image: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala-4-88.jpg",
    },
    {
      title: "Sala 5",
      description: "Espacio para Multi Eventos",
      image: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala-5-5.jpg",
    },
    {
      title: "Sala 6",
      description: "Espacio para Multi Eventos",
      image:
        "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07959-1536x1152.jpg",
    },
    {
      title: "Sala 7",
      description: "Espacio para Multi Eventos",
      image:
        "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07985-1536x1152.jpg",
    },
    {
      title: "Sala 8",
      description: "Espacio para Multi Eventos",
      image: "http://eljuvenil.com/wp-content/uploads/2019/11/Sala-8-81.jpg",
    },
    {
      title: "Sala 9",
      description: "Espacio para Multi Eventos",
      image:
        "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07922-1536x1152.jpg",
    },
    {
      title: "Sala 10",
      description: "Espacio para Multi Eventos",
      image:
        "http://eljuvenil.com/wp-content/uploads/2021/11/DSC07968-1536x1152.jpg",
    },
  ];

  const dispatch = useAppDispatch();

  const getIdLocal = async ()=> {
    const res = await getHttpLocalID();
    console.log(res)
    if(res){
      dispatch(createLocalID(res))
    }
  }

  useEffect(()=> {
    getIdLocal()
  }, [])



  return (
    <>
      <Header />
      <main>

        <Sidebar />

        <div>
          <h1>Todas las Salas:</h1>
          <span>Crear una nueva sala, <button>+</button> </span>
          <div>
            <CarouselComp
              items={objest}
              renderCard={(r) => (
                <Room
                  description={r.description}
                  image={r.image}
                  title={r.title}
                />
              )}
            />
          </div>
          <div>
            
          </div>
        </div>

        <div>
        <div>

  </div>
        </div>
      </main>
    </>
  );
};

export default Home;
