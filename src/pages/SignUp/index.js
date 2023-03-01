import React from 'react'
import {useEffect, useState} from 'react';
import Navbar from "layouts/Navbar";
import Footer from "layouts/Footer";
import {TabTitle} from "utils/functions";
import {register} from "firebase-config";
import Swal from 'sweetalert2';


const SignUp = () => {

   
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const doRegister = async e => {
        e.preventDefault();

        const user = await register(email, password,username)
        
    }


    TabTitle(`Sign Up | ${
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
                        onSubmit={doRegister}>

<div className="row my-4">
                            <div className="col-12">
                                <div className="input-border">
                                    <label className="input-group-text" htmlFor="username">Name</label>
                                    <input type="text" name='username'
                                        value={username}
                                        onChange={
                                            e => setUsername(e.target.value)
                                        }
                                        className="form-control
                                                                                                                form-template-input"
                                        id="username"
                                        placeholder="John Turkmen"
                                        required=""/>
                                </div>
                            </div>

                        </div>
                        <div className="row my-4">
                            <div className="col-12">
                                <div className="input-border">
                                    <label className="input-group-text" htmlFor="email">E-mail</label>
                                    <input type="email" name='email'
                                        value={email}
                                        onChange={
                                            e => setEmail(e.target.value)
                                        }
                                        className="form-control
                                                                                                                form-template-input"
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
                                    <input type="password" name='password'
                                        value={password}
                                        onChange={
                                            e => setPassword(e.target.value)
                                        }
                                        className="form-control
                                                                                                                form-template-input"
                                        id="password"
                                        placeholder="•••••••"
                                        required=""/>
                                </div>
                            </div>

                        </div>

                        <button disabled={
                                !username ||  !email || !password || password.length < 6
                            }
                            className="w-100 btn btn-md btn-primary
                                                                            rounded-pill px-5 py-3"
                            type="submit">Sign Up</button>

                    </form>
                </div>

            </main>

            <Footer/>
        </>
    )
}

export default SignUp
