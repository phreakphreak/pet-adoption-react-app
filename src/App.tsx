import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavHeader from "./components/NavHeader";
import { PetProvider } from "./context/PetContext";
import Pets from "./pages/Animal";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App(): JSX.Element {
  return (
    <div className="min-h-screen w-full p-12 flex flex-col bg-[#EDE9E0]">
      <BrowserRouter>
        <PetProvider>
          <NavHeader className="flex justify-between pb-10" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/pets" element={<Pets />} />
          </Routes>
        </PetProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
