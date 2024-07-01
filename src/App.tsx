import "./App.css";
import Advert from "./Advert";
import Category from "./Category";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdvertDetails from "./components/AdvertDetails";
import FormAdvert from "./components/FormAdvert";
import FormCategory from "./components/FormCategory";
import Signup from "./components/Signup";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import Signin from "./components/Signin";

function App() {
  const { user, login, logout, setUser } = useAuth();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Advert />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/adverts/create" element={<FormAdvert />} />
          <Route path="/categories/create" element={<FormCategory />} />
          <Route path="/categories/:id/edit" element={<FormCategory />} />
          <Route path="/adverts/:id/edit" element={<FormAdvert />} />
          <Route path="/adverts/:id" element={<AdvertDetails />} />
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
