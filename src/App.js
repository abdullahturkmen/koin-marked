import Home from './pages/Home';
import Home from './pages/CurrencyList';
import Home from './pages/Login';
import Home from './pages/SignUp';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link
} from 'react-router-dom';
import SignUp from './pages/SignUp';


function App() {
  return (
      <Router>
          <div className="App"></div>

          <Routes>
              <Route exact  path='/'
                  element={<Home/>}/>
              <Route path='/currency-list'
                  element={<CurrencyList/>}/>
                  <Route path='/login'
                  element={<Login/>}/>
                  <Route path='/sign-up'
                  element={<SignUp/>}/>
          </Routes>
      </Router>
  );
}



export default App;
