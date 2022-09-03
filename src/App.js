import Home from './pages/Home';
import CurrencyList from './pages/CurrencyList';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import {Toaster} from 'react-hot-toast';

import {
    Routes,
    Route
} from 'react-router-dom';


function App() {
    
    return (
        <>
        <Toaster/>
       
            <Routes>
                <Route exact path='/'
                    element={<Home/>}/>
                <Route path='/currency-list'
                    element={<CurrencyList/>}/>
                <Route path='/login'
                    element={<Login/>}/>
                <Route path='/sign-up'
                    element={<SignUp/>}/>
            </Routes>
        
        </>
    );
}


export default App;
