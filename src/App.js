import './App.css';
import {BrowserRouter,Routes, Route} from 'react-router-dom'

// custome Import for Component
import Register from './Pages/Register';
import Login from './Pages/Login';
import Homepage from './Pages/Homepage';
import Protect from './components/Protect';
import VideoPlayer from './Pages/VideoPlayer'
import NotFound from './Pages/NotFound';
import Landingpage from './Pages/Landingpage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Landingpage/>}/>
            <Route path='/login' element={<Login/>}/>
            {/* <Route path='/Register' element={<Register/>}/> */}
            <Route path='/homepage' element={
              <Protect>
                  <Homepage/>
              </Protect>
            }/>
            <Route path='/videoPlayer/:id' element={
              <Protect>
                  <VideoPlayer/>
              </Protect>
            }/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
