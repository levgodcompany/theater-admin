import { useEffect, useState } from "react";
import { getAllIdsRooms, RoomIdName } from "../../services/Shifts.service";

interface IRoomProps {
    rooms: RoomIdName[];
    setRooms: (rooms: RoomIdName[])=> void
}

const Rooms: React.FC<IRoomProps> = ({rooms, setRooms}) => {
  const [_selectRooms, setSelectRooms] = useState<RoomIdName[]>([]);
  const [selectRoom, setSelectRoom] = useState<RoomIdName>({
    id: "",
    name: ""
  });

  useEffect(() => {
    const getIds = async () => {
      const ids = await getAllIdsRooms();
      if (ids) {
        setRooms(ids);
      }
    };
    getIds();
  }, []);


  const onSelectRoom = (event: React.ChangeEvent<HTMLSelectElement>)=> {
    const sel = event.target.value.split("-/")
    setSelectRoom({
        id: sel[0],
        name: sel[1]
    })
  }

  const handleOnClickAgregar = ()=> {
    setSelectRooms((prev)=> [...prev, selectRoom])
  }

  return (
    <>
      <div>
        <p>Agregar Sala</p>
        <select onChange={onSelectRoom} value={selectRoom.id} >
          {rooms.map((room) => (
            <option  value={`${room.id}-/${room.name}`}>{room.name}</option>
          ))}
        </select>
          <button onClick={handleOnClickAgregar} >Agregar</button>

        <div>
            
        </div>
      </div>
    </>
  );
};

export default Rooms;
