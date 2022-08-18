import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import Login from "./login";
import Signup from "./signup";
import Private from "./private-component/private"
import Contacts from "./Table/contact";


function App() {
return (
  <>
  <BrowserRouter>
  <Routes>
  <Route exact path="/" element={<Login/>}></Route>
  <Route exact path ="/signup" element={<Signup/>}></Route>
  <Route element={<Private/>}>
        <Route path='/dashboard' element={<Contacts/>}></Route>
        </Route>
  </Routes>
  </BrowserRouter>
  </>
)
}

export default App;
