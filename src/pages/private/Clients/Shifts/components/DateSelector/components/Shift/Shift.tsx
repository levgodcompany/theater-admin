import { useEffect, useState } from "react";
import ShiftStyle from "./Shift.module.css";
import { IOpeningCloseHoursShiftsDTO } from "../../../../services/Shifts.service";
import CarouselComp from "../../../../../../../../components/CarouselComponents/CarouselComp";
import Modal from "react-modal";
import CapacityClientImage from "../../../../../../assets/users-svgrepo-com.svg";
import DimeImage from "../../../../../../assets/dime.svg";
import HoursImage from "../../../../../../assets/clock-svgrepo-com.svg";
import DescriptionImage from "../../../../../../assets/text-description-svgrepo-com.svg";

interface IShiftProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const Shift: React.FC<IShiftProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [openingCloseHoursTurno, setOpeningCloseHoursTurno] =
    useState<IOpeningCloseHoursShiftsDTO>({
      startHours: "",
      endHours: "",
      title: "",
      description: "",
      available: true,
    });
  const [openingCloseHoursTurnos, setOpeningCloseHoursTurnos] = useState<
    IOpeningCloseHoursShiftsDTO[]
  >([]);

  const [dtoRoom, setDtoRoom] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOpeningCloseHoursTurno({
      ...openingCloseHoursTurno,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeAvilited = (available: boolean) => {
    setOpeningCloseHoursTurno({
      ...openingCloseHoursTurno,
      available: available,
    });
  };

  const handleDeleteShift = (index: number) => {
    const updatedShifts = [...openingCloseHoursTurnos];
    updatedShifts.splice(index, 1);
    setOpeningCloseHoursTurnos(updatedShifts);
  };

  const handleEditShift = (shift: IOpeningCloseHoursShiftsDTO) => {
    setOpeningCloseHoursTurno(shift);
  };

  const handleAddShift = () => {
    setOpeningCloseHoursTurno({
      startHours: "",
      endHours: "",
      title: "",
      description: "",
      available: false,
    });
    setOpeningCloseHoursTurnos((prevShifts) => {
      return [...prevShifts, openingCloseHoursTurno];
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        className={ShiftStyle.modal}
        overlayClassName={ShiftStyle.modal_overlay}
        onRequestClose={onRequestClose}
      >
        <div className={ShiftStyle.container}>
          <div className={ShiftStyle.container_form}>
            <div className={ShiftStyle.from_title}>
              <span>Leandro Veron</span>
            </div>

            <div className={ShiftStyle.date_start}>
              <div className={ShiftStyle.container_image_hour}>
                <img
                  className={ShiftStyle.image_hour}
                  src={HoursImage}
                  alt="Clock"
                />
              </div>
              <div className={ShiftStyle.date_hour}>
                <span>
                  {`08:00`} ⋅ {`09:30`}
                </span>
              </div>
            </div>

            <div className={ShiftStyle.container_capacity_max}>
              <div className={ShiftStyle.container_image_hour}>
                <img
                  className={ShiftStyle.image_hour}
                  src={CapacityClientImage}
                  alt="users"
                />
              </div>
              <span>Capacidad para 30 personas</span>
            </div>

            <div className={ShiftStyle.container_capacity_max}>
              <div className={ShiftStyle.container_image_hour}>
                <img
                  className={ShiftStyle.image_hour}
                  src={DimeImage}
                  width={15}
                  alt="users"
                />
              </div>
              <span>
                Medidas <strong>20x30 m</strong>
              </span>
            </div>

            <div className={ShiftStyle.container_client}>
              <div className={ShiftStyle.autocomplete_select}>
                <div className={ShiftStyle.container_availability}>
                  <p className={ShiftStyle.p_dto}>
                    {dtoRoom == null ? (
                      <>
                        <strong className={ShiftStyle.dto_price}>
                          $ 15.000
                        </strong>
                      </>
                    ) : (
                      <div className={ShiftStyle.dto_value}>
                        <span className={ShiftStyle.span_dto_value}>
                          20% dto.
                        </span>

                        <div>
                          <span className={ShiftStyle.p_span_dto}>
                            $ 15.500
                          </span>{" "}
                          <strong className={ShiftStyle.dto_price}>
                            $ 12.500
                          </strong>
                        </div>
                      </div>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className={ShiftStyle.container_buttons}>
              <button type="button">Reservar</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Shift;
