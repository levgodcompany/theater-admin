import InfoLocalStyles from "./css/InfoLocal.module.css";
import editImage from "../../../Local/assets/edit-3-svgrepo-com.svg";
import { useState } from "react";
import LocalForm from "../Forms/LocalForm/LocalForm";
import { DtoRoom } from "../../services/Rooms.service";
export interface PropsCard {
  image: string;
  title: string;
  capacity: string | number;
  phone: string;
  description: string;
  price: number
  idRoom: string;
  length: string;
  Width: string;
  dtos: DtoRoom[];
  typeRoom: string;
  loadRoom: ()=> void
}

const InfoRoom: React.FC<PropsCard> = ({
  title,
  idRoom,
  capacity,
  phone,
  image,
  description,
  price,
  length,
  Width,
  dtos,
  typeRoom,
  loadRoom
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    loadRoom()
  };


  const info = (prop: string, value: string | number) => {
    return (
      <div className={InfoLocalStyles.detail}>
        <span className={InfoLocalStyles.detail_prop}>{prop}</span>
        <span>
          <strong className={InfoLocalStyles.detail_value}>{value}</strong>
        </span>
      </div>
    );
  };

  return (
    <div className={InfoLocalStyles.user_profile}>
      <div className={InfoLocalStyles.user_image}>
        {
          image.length > 0 ? <img src={image} alt={`${title}'s profile`} /> : <></>

        }
      </div>
      <div className={InfoLocalStyles.user_info}>
        <div className={InfoLocalStyles.header_title}>
          <h2>{title}</h2>
          <img onClick={handleOpenModal} src={editImage} alt="" />
          <LocalForm typeRoom={typeRoom} dtos={dtos} preice={price} Width={Width} length={length} capacity={Number.parseInt(`${capacity}`)} description={description} image={image} phone={phone} title={title} idRoom={idRoom} isOpen={isModalOpen} onRequestClose={handleCloseModal} />
        </div>
        <div className={InfoLocalStyles.user_info_info}>
          {info("Tipo de sala:", typeRoom)}
          {info("Capacidad:", capacity)}
          {info("Precio:", price)}
          {info("Medidas:", length == Width ? `${length}m²` : `${length}x${Width}mt`)}
          {phone.length > 0 ? info("Tel.:", phone) : <></> }
          
          <div className={InfoLocalStyles.container_dto}>
            <span>Dtos.</span>
          {
            dtos.map(dto => <div className={InfoLocalStyles.cont_dto}>
            <span className={InfoLocalStyles.dto}>{dto.dto}%</span>
            <span className={InfoLocalStyles.dto_horus}>{dto.startHour}/{dto.endHour}</span>
            </div>)
          }
          </div>
          

        </div>
        <p className={InfoLocalStyles.description}>{description}</p>
      </div>

    </div>
  );
};

export default InfoRoom;
