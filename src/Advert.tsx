import { useEffect, useState } from "react";
import AdvertList from "./components/AdvertList";
import AdvertPaginate from "./components/AdvertPaginate";
import AdvertService from "./services/advert.service";
import { Link } from "react-router-dom";

function Advert() {
  const [totalCount, setTotalCount] = useState(0);
  const [advertList, setAdvertList] = useState([]);

  const [isLogged, setIsLogged] = useState<string>(
    localStorage.getItem("access_token") as string
  );

  useEffect(() => {
    fetchAllAdverts();

    return () => {
      console.log("component will unmount");
    };
  }, []);

  const fetchAllAdverts = async () => {
    try {
      const { data, totalCount } = await AdvertService.findAll();
      setAdvertList(data);
      setTotalCount(totalCount);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!isLogged && (
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <Link to="/auth/signup">Sign up</Link>
          <Link to="/auth/signin">Sign in</Link>
        </div>
      )}
      {isLogged && (
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button
            onClick={() => {
              localStorage.removeItem("access_token");
              setIsLogged("");
            }}
          >
            Sign out
          </button>
        </div>
      )}

      <h1>Advert List</h1>

      <AdvertList advertList={advertList} fetchAllAdverts={fetchAllAdverts} />
      <Link to="/adverts/create">
        <button>Add an advert</button>
      </Link>
      <AdvertPaginate totalCount={totalCount} />
    </div>
  );
}

export default Advert;
