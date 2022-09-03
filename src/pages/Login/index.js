import React from 'react'
import Navbar from '../../layouts/Navbar';
import Footer from '../../layouts/Footer';
import {useEffect, useState} from 'react';
import {TabTitle} from '../../utils/functions';
import {login, register} from "../../firebase";
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { login as loginHandle } from '../../store/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const doLogin = async e => {
        e.preventDefault();

        const user = await login(email, password)
       if(user){
        dispatch(loginHandle(user))
        navigate('/', {
            replace: true
        })
       }

    };


    TabTitle(`Login | ${
        process.env.REACT_APP_TITLE
    }`)
    return (
        <>

            <header className="header header--colored-bg container-fluid py-5">

                <Navbar/>


            </header>

            <main className="container-fluid">
        
                <div className="container col-12 col-md-8 col-lg-6 col-xl-4 px-4 py-5">
                    <form className="py-4 form-template"
                        onSubmit={doLogin}>
                        <div className="row my-4">
                            <div className="col-12">
                                <div className="input-border">
                                    <label className="input-group-text" htmlFor="email">E-mail</label>
                                    <input type="email" name="email"
                                        value={email}
                                        onChange={
                                            e => setEmail(e.target.value)
                                        }
                                        className="form-control form-template-input"
                                        id="email"
                                        placeholder="address@example.com"
                                        required=""/>
                                </div>
                            </div>

                        </div>
                        <div className="row my-4">
                            <div className="col-12">
                                <div className="input-border">
                                    <label className="input-group-text" htmlFor="password">Password</label>
                                    <input type="password" name="password"
                                        value={password}
                                        onChange={
                                            e => setPassword(e.target.value)
                                        }
                                        className="form-control form-template-input"
                                        id="password"
                                        placeholder="•••••••"
                                        required=""/>
                                </div>
                            </div>

                        </div>

                        <button disabled={
                                !email || !password
                            }
                            className="w-100 btn btn-md btn-primary rounded-pill px-5 py-3"
                            type="submit">Login</button>

                    </form>
                </div>

            </main>


            <Footer/>
        </>
    )
}

export default Login
