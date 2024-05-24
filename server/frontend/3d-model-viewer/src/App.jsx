import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from "./components/home/Home";
import UploadModel from "./components/uploadModel/UploadModel";
import Navbar from "./components/navbar/Navbar";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/upload" element={<UploadModel/>}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
