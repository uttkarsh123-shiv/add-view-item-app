import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home"
import AddItem from "./pages/AddItem"
import GetItems from "./pages/GetItems";
const App = () => {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/additem" element={<AddItem />} />
      <Route path="/getitems" element={<GetItems />} />
    </Routes>
   </Router>
  )
}

export default App;
