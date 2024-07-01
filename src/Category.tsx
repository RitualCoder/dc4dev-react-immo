import { useEffect, useState } from "react";
import CategoryList from "./components/CategoryList";
import CategoryPaginate from "./components/CategoryPaginate";
import CategoryService from "./services/category.service";

function Category() {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    fetchAllCategories();

    return () => {
      console.log("component will unmount");
    };
  }, []);

  const fetchAllCategories = async () => {
    try {
      const data = await CategoryService.findAll();
      setCategoryList(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Category List</h1>
      <CategoryList
        categoryList={categoryList}
        fetchAllCategories={fetchAllCategories}
      ></CategoryList>
      <CategoryPaginate totalCount={categoryList.length} />
    </div>
  );
}

export default Category;
