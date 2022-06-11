import Home from './pages/Home';
import CurrencyList from './pages/CurrencyList';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
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
