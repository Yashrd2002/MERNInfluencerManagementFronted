import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateInfluencer from "./pages/CreateInfluencer";
import UpdateForm from "./components/UpdateForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/create" element={<CreateInfluencer/>}/>
        <Route path="/update/:id" element={<UpdateForm />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
