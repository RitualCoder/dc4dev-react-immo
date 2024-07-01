import { CategoryType } from "../types/category";
import CategoryService from "../services/category.service";
import { Link } from "react-router-dom";

type PropsCategoryList = {
  categoryList: CategoryType[];
  fetchAllCategories: () => void;
};

const CategoryList = ({
  categoryList,
  fetchAllCategories,
}: PropsCategoryList) => {
  const handleDelete = async (id: number) => {
    try {
      await CategoryService.remove(id);
      fetchAllCategories();
    } catch (error) {
      console.log("handleDelete error : ", error);
    }
  };

  return (
    <ul>
      {categoryList &&
        categoryList.map((category: CategoryType) => (
          <li
            key={category.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              margin: "1rem",
            }}
          >
            {category.name}

            <Link to={`/categories/${category.id}/edit`}>Learn more</Link>

            <button onClick={() => category.id && handleDelete(category.id)}>
              delete
            </button>
          </li>
        ))}
    </ul>
  );
};

export default CategoryList;
