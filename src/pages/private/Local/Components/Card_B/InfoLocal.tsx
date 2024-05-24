import InfoLocalStyles from "./css/InfoLocal.module.css";
import './css/info.css'
import editImage from '../../assets/edit-3-svgrepo-com.svg'
export interface PropsCard {
  image: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}

const InfoLocal: React.FC<PropsCard> = ({ title, email, phone, address, image, description }) => {
  return (
    <div className={InfoLocalStyles.user_profile}>
      <div className={InfoLocalStyles.user_image}>
        <img src={image} alt={`${title}'s profile`} />
      </div>
      <div className={InfoLocalStyles.user_info}>
      <div className={InfoLocalStyles.header_title}>
        <h2>{title}</h2>
        <img src={editImage} alt="" /> 
      </div>
        <div className={InfoLocalStyles.user_info_info}>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Address:</strong> {address}</p>

        </div>
        <p className={InfoLocalStyles.description}>{description}</p>
      </div>
    </div>
  );
};

export default InfoLocal;
