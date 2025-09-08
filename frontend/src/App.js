import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/landing';
import Auth from './pages/Auth';
import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'
import { Authprovider } from './controllers/Authcontrollers';
import VideoMeetComponent from './pages/VideoMeetComponent';
import HomeComponent
 from './pages/HomeComponent';
 import History from './pages/History';
function App() {
  return (
  <>
  <Router>
    <Authprovider>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/auth' element={<Auth/>}>
      </Route>
<Route path='/home' element={<HomeComponent/>}></Route>
      <Route path='/:url' element={<VideoMeetComponent/>}/>

      <Route path='/history' element={<History/>}/>
    </Routes>
    </Authprovider>
  </Router>
  </>
  );
}

export default App;
