import { useEffect, useState } from "react";
import AdvertService from "../services/advert.service";
import CategoryService from "../services/category.service";
import { AdvertType } from "../types/advert";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryType } from "../types/category";

const FormAdvert = () => {
  const [credentials, setCredentials] = useState<AdvertType>({
    title: "",
    description: "",
    nb_rooms: 0,
    price: 0,
    surface: 0,
    category: { id: undefined, name: "" },
  });
  const { id } = useParams();

  const [categories, setCategories] = useState<CategoryType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("FormAdvert component did mount : ", id);
    if (id) {
      handleFetchOneAdvert();
    }
    handleFetchCategories();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const category: CategoryType | undefined = categories.find(
      (category: CategoryType) => category.id === parseInt(value)
    );
    setCredentials({
      ...credentials,
      category: {
        id: value,
        name: category?.name as string,
      },
    });
  };

  const handleFetchCategories = async () => {
    try {
      const data = await CategoryService.findAll();
      setCategories(data);
    } catch (error) {
      console.log("handleFetchCategories error : ", error);
    }
  };

  const handleFetchOneAdvert = async () => {
    if (!id) return;
    try {
      const data = await AdvertService.findOne(id);
      console.log("handleFetchOneAdvert data : ", data);
      setCredentials({
        title: data.title,
        description: data.description,
        nb_rooms: data.nb_rooms,
        price: data.price,
        surface: data.surface,
        category: { id: data.category.id, name: data.category.name },
      });
    } catch (error) {
      console.log("handleFetchOneAdvert error : ", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let redirectPath = "";

    try {
      if (!id) {
        const data = await AdvertService.create(credentials);
        redirectPath = `/adverts/${data.id}`;
      } else {
        await AdvertService.update(credentials, id);
        redirectPath = `/adverts/${id}`;
      }

      navigate(redirectPath);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Form Advert</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <div>
          <input
            onChange={handleChange}
            type="text"
            placeholder="title"
            name="title"
            value={credentials.title}
          />
        </div>
        <div>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Description"
            name="description"
            value={credentials.description}
          />
        </div>
        <div>
          <input
            onChange={handleChange}
            type="number"
            placeholder="Number of rooms"
            name="nb_rooms"
            value={credentials.nb_rooms}
          />
        </div>
        <div>
          <input
            onChange={handleChange}
            type="number"
            placeholder="Price"
            name="price"
            value={credentials.price}
          />
        </div>
        <div>
          <input
            onChange={handleChange}
            type="number"
            placeholder="Surface"
            name="surface"
            value={credentials.surface}
          />
        </div>
        <select onChange={handleChangeSelect}>
          <option value="">Choose a category</option>
          {categories.map((category: CategoryType) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input type="submit" value={id ? "Update" : "Create"} />
      </form>
    </div>
  );
};

export default FormAdvert;
