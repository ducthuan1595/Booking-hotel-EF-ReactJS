import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Form from "./components/Form/Form";
import Booking from "./pages/booking/Booking";
import Transactions from "./pages/transaction/Transactions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/form/:params' element={<Form />} />
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path='/transaction' element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
