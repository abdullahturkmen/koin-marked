import React from 'react'
import Navbar from 'layouts/Navbar';
import Footer from 'layouts/Footer';
import {TabTitle} from 'utils/functions';
import {useEffect, useState} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import axios from "axios";
import {AdvancedRealTimeChart} from "react-ts-tradingview-widgets";

const apiURL = process.env.REACT_APP_API_URL;

const CurrencyDetails = () => {


    const [currency, setCurrency] = useState([]);

    let {id} = useParams();

    const location = useLocation()
    const params = new URLSearchParams(location.search)

    console.log("id: ", useParams());
    console.log(params.get("type"))

    TabTitle(`${id} Details | ${
        process.env.REACT_APP_TITLE
    }`)


    useEffect(() => {

        axios.get(apiURL).then(response => { // console.log(response.data.data)

            response.data.data.filter(e => e.name === id).map(e => {
                console.log(e)
                setCurrency(e)
            })

        });


    }, [id]);

    return (
        <>
            <header className="header header--colored-bg container-fluid py-5">

                <Navbar/>

                <div className="container col-xxl-12 px-4 py-3">
                    <div className="row flex-lg-row-reverse align-items-center g-5
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            py-5">

                        <div className="col-lg-6 col-md-10 col-12 mx-auto text-center">
                            <h1 className="display-5 fw-bold lh-1 mb-3">Today’s
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            Cryptocurrency Prices by
                                <span className="gradient-text">
                                    {
                                    process.env.REACT_APP_TITLE
                                }</span>
                            </h1>
                            <p className="py-4 text-muted">Buy and sell 200+
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            cryptocurrencies with
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            20+ flat currencies using bank transfers or your
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            credit/debit card.</p>

                        </div>
                    </div>
                </div>
            </header>

            <main className="container-fluid">


                <div className="container col-12 px-4 py-5">
                    <h1>{
                        currency.name
                    }
                        - {
                        currency.symbol
                    }</h1>

<div className='tradingview'>
    <div className='advanced-chart'>
<AdvancedRealTimeChart theme="dark"
                        height={300}
                        symbol={
                            currency.symbol
                    }></AdvancedRealTimeChart>
</div>
</div>

                </div>


            </main>


            <Footer/>

        </>
    )
}

export default CurrencyDetails
