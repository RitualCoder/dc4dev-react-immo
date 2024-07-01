import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdvertService from "../services/advert.service";
import { AdvertType } from "../types/advert";
import { Link } from "react-router-dom";

const AdvertDetails = () => {
  const { id } = useParams();
  const [advert, setAdvert] = useState<AdvertType | null>(null);

  useEffect(() => {
    fetchOneAdvert();
  }, [id]);

  const fetchOneAdvert = async () => {
    if (!id) return;

    try {
      const data = await AdvertService.findOne(id);
      setAdvert(data);
    } catch (error) {
      console.log("fetchOneAdvert error : ", error);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>{advert?.title}</h1>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h3>Description :</h3>
        <p>{advert?.description}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h3>Prix :</h3>
        <p>{advert?.price}€</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h3>Nombre de pièces :</h3>
        <p>{advert?.nb_rooms} pièces</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h3>Surface :</h3>
        <p>{advert?.surface} m2</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h3>Catégorie :</h3>
        <p>{advert?.category?.name}</p>
      </div>
      <Link to={`/adverts/${advert?.id}/edit`}>
        <button style={{ margin: "20px" }}>Update advert</button>
      </Link>
    </div>
  );
};

export default AdvertDetails;
