import { Link } from "react-router-dom";
import { AdvertType } from "../types/advert";
import AdvertService from "../services/advert.service";

type PropsAdvertList = {
  advertList: AdvertType[];
  fetchAllAdverts: () => void;
};

const AdvertList = ({ advertList, fetchAllAdverts }: PropsAdvertList) => {
  const handleDelete = async (id: number) => {
    try {
      await AdvertService.remove(id);
      fetchAllAdverts();
    } catch (error) {
      console.log("handleDelete error : ", error);
    }
  };

  return (
    <ul>
      {advertList.map((advert: AdvertType) => (
        <li
          key={advert.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            margin: "1rem",
          }}
        >
          {advert.title}
          <button onClick={() => advert.id && handleDelete(advert.id)}>
            delete
          </button>
          <Link to={`/adverts/${advert.id}`}>Learn more</Link>
        </li>
      ))}
    </ul>
  );
};

export default AdvertList;
