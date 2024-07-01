import { useEffect, useState } from "react";
import CategoryService from "../services/category.service";
import { CategoryType } from "../types/category";
import { useNavigate, useParams } from "react-router-dom";

const FormCategory = () => {
  const [credentials, setCredentials] = useState<CategoryType>({
    name: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    console.log("FormAdvert component did mount : ", id);
    if (id) {
      handleFetchOneCategory();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleFetchOneCategory = async () => {
    if (!id) return;
    try {
      const data = await CategoryService.findOne(id);
      console.log("handleFetchOneAdvert data : ", data);

      setCredentials({ name: data.name });
    } catch (error) {
      console.log("handleFetchOneAdvert error : ", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (credentials.name.trim() === "") {
      return;
    }

    try {
      if (!id) {
        await CategoryService.create(credentials);
      } else {
        await CategoryService.update(credentials, id);
      }

      navigate("/categories");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Form Category</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={credentials.name}
            onChange={handleChange}
          />
        </div>
        <input type="submit" value={id ? "Update" : "Create"} />
      </form>
    </div>
  );
};

export default FormCategory;
