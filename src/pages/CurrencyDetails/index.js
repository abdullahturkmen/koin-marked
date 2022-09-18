import React from 'react'
import Navbar from 'layouts/Navbar';
import Footer from 'layouts/Footer';
import {TabTitle} from 'utils/functions';
import {useEffect, useState, useTimeout} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import axios from "axios";
import {AdvancedRealTimeChart} from "react-ts-tradingview-widgets";

const apiURL = process.env.REACT_APP_API_URL;

const CurrencyDetails = () => {


    const [currency, setCurrency] = useState([]);

    let {id} = useParams();

    if (id === undefined) {
        alert(1)
    }

    const location = useLocation()
    const params = new URLSearchParams(location.search)

    console.log("id: ", useParams());
    console.log(params.get("type"))

    TabTitle(`Trade ${
        currency.fullName
    } | ${
        process.env.REACT_APP_TITLE
    }`)


    useEffect(() => {

        axios.get(apiURL).then(response => { // console.log(response.data.data)

            response.data.data.filter(e => e.name === id).map(e => {
                console.log("datalar",e)
                setCurrency(e)
            })

        });


    }, [id]);


    const [hasTimeElapsed, setHasTimeElapsed] = useState(false);


    setTimeout(() => setHasTimeElapsed(true), 1000);

    return (
        <>
            <header className="header container-fluid py-5">

                <Navbar/>


            </header>

            <main className="container-fluid">


                <div className="container col-12 px-4 py-5">
                    <h1>{
                        
                        currency.name
                    }
                        - {
                        currency.symbol
                    }</h1>

                    {
                    hasTimeElapsed && (
                        <AdvancedRealTimeChart height={500}
                        theme={'dark'}
                            symbol={
                                currency.symbol
                        }></AdvancedRealTimeChart>
                    )
                }

                    <div className='tradingview'>
                        <div className='advanced-chart'></div>
                    </div>

                </div>


            </main>


            <Footer/>

        </>
    )
}

export default CurrencyDetails
