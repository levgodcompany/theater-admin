import InfoLocalStyles from "./css/InfoLocal.module.css";
import './css/info.css'
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
    <div className="user-profile">
      <div className="user-image">
        <img src={image} alt={`${title}'s profile`} />
      </div>
      <div className="user-info">
        <h2>{title}</h2>
        <div className="user-info-info">
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Address:</strong> {address}</p>

        </div>
        <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel urna quam. Mauris at lectus ac libero luctus fringilla. Sed sit amet felis in nunc sodales bibendum. Curabitur imperdiet feugiat erat, ut tempor risus varius eget. Vivamus et felis id lacus bibendum laoreet. Nulla facilisi. Proin suscipit lectus ac orci consequat, ac scelerisque odio ultrices. Integer at sem et sapien volutpat lacinia sed id felis. Pellentesque sit amet accumsan velit. Donec et urna ipsum. Nulla facilisi.</p> {/* Descripción larga */}
      </div>
    </div>
  );
};

export default InfoLocal;
