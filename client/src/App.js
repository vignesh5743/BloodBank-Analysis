import { BrowserRouter , Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedPage from "./components/ProtectedPage";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import Profile from "./pages/Profile";
// import Query1 from "./pages/query/query1";
// import Query2 from "./pages/query/query2";
import Query1 from "./components/Query1";
import Query2 from "./components/Query2";
import Query3 from "./components/Query3";
import Query4 from "./components/Query4";
import Query5 from "./components/Query5";
import Query6 from "./components/Query6";
import Query7 from "./components/Query7";
import Query8 from "./components/Query8";
import Query9 from "./components/Query9";
function App() {
  const {loading}=useSelector((state)=>state.loaders)
  return (
    <div>
      {loading && <Spinner/>}
      <BrowserRouter>
      <Routes>
      <Route path="/profile" element={<ProtectedPage><Profile /></ProtectedPage>}/>
        <Route path="/" element={<ProtectedPage><Home /></ProtectedPage>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>        
        {/* <Route path="/query1" element={<Query1 />}/>
        <Route path="/query2" element={<Query2 />}/>
     */}
        <Route path="/query1" element={<Query1 />}/>
        <Route path="/query2" element={<Query2 />}/>
        <Route path="/query3" element={<Query3 />}/>
        <Route path="/query4" element={<Query4 />}/>
        <Route path="/query5" element={<Query5 />}/>
        <Route path="/query6" element={<Query6 />}/>
        <Route path="/query7" element={<Query7 />}/>
        <Route path="/query8" element={<Query8 />}/>
        <Route path="/query9" element={<Query9 />}/>
      </Routes>
    </BrowserRouter>
    </div>
      
  );
}

export default App;
