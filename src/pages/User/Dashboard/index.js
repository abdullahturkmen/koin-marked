import React from 'react'
import Navbar from 'layouts/Navbar';
import Footer from 'layouts/Footer';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TabTitle} from 'utils/functions';
import {useNavigate} from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();
    const {user} = useSelector(state => state.auth)

    if (!user) {
        navigate('/', {replace: true})
    }

    TabTitle(`Dashboard | ${
        process.env.REACT_APP_TITLE
    }`)
    return (
        <>

            <header className="header header--colored-bg container-fluid py-5">

                <Navbar/>


            </header>

            <main className="container-fluid">

                <div className="container col-12 col-md-8 col-lg-6 col-xl-4 px-4 py-5">
                    {
                    user && (
                        <>

                            Hi {
                            user.displayName || user.email
                        } </>
                    )
                } </div>

            </main>


            <Footer/>
        </>
    )
}

export default Dashboard
