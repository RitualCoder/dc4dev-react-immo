import { CategoryType, CreateCategoryDto } from "../types/category";

const ENDPOINT = `${import.meta.env.VITE_APP_API_URL}/categories`;

const create = async (credentials: CreateCategoryDto) => {
  /* utm */
  // Get access token to local storage
  const access_token = localStorage.getItem("access_token") as string;

  const request = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JSON.parse(access_token)}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return await request.json();
};

const findAll = async () => {
  const request = await fetch(ENDPOINT);

  return await request.json();
};

const findOne = async (id: string) => {
  const request = await fetch(`${ENDPOINT}/${id}`);

  return await request.json();
};

const remove = async (id: number) => {
  const access_token = localStorage.getItem("access_token") as string;
  const request = await fetch(`${ENDPOINT}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${JSON.parse(access_token)}`,
    },
  });
  return await request.json();
};

const update = async (credentials: CategoryType, id: string) => {
  const access_token = localStorage.getItem("access_token") as string;

  const request = await fetch(`${ENDPOINT}/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${JSON.parse(access_token)}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return await request.json();
};

const CategoryService = {
  create,
  findAll,
  remove,
  findOne,
  update,
};

export default CategoryService;
