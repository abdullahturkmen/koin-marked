import React from 'react'
import Navbar from 'layouts/Navbar';
import Footer from 'layouts/Footer';
import {TabTitle} from 'utils/functions';
import {useEffect, useState, useTimeout} from 'react';
import {useParams, useLocation, Link} from 'react-router-dom';
import axios from "axios";
import {AdvancedRealTimeChart} from "react-ts-tradingview-widgets";

const apiURL = process.env.REACT_APP_API_URL;

const CurrencyDetails = () => {


    const [currency, setCurrency] = useState([]);
    const [tableCurrencies, setTableCurrencies] = useState([]);
    const [graphicVisibility, setGraphicVisibility] = useState(false);
    const location = useLocation()
    const params = new URLSearchParams(location.search)

    let {id} = useParams();

    if (id === undefined) {
        alert(1)
    }

    console.log("id: ", useParams());
    console.log(params.get("type"))

    TabTitle(`Trade ${
        currency.fullName
    } | ${
        process.env.REACT_APP_TITLE
    }`)


    useEffect(() => {

        axios.get(apiURL).then(response => { // console.log(response.data.data)
            setTableCurrencies(response.data.data);
            response.data.data.filter(e => e.name === id).map(e => {
                console.log("datalar", e)
                setCurrency(e)
                setGraphicVisibility(true)
            })

        });


    }, [id]);


    


    return (
        <>
            <header className="header container-fluid">

                <Navbar/>

            </header>

            <main className="container-fluid main main-trade">


                <div className="row">

                    <div className='col-12 col-lg-3 col-xl-2'>
                        <div className='currencies-list thin-scrollbar'>
                            <div className='currencies-list-content'>
                                <div class="dropdown">
                                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        Select Currency
                                    </a>

                                    <ul class="dropdown-menu thin-scrollbar">
                                        {
                                        tableCurrencies.map(item => (
                                            <>
                                                <li className='currency-item'
                                                    key={
                                                        item.id
                                                }>
                                                    <Link to={
                                                        `/trade/${
                                                            item.name
                                                        }`
                                                    }>
                                                        <span> {
                                                            item.name
                                                        } </span>
                                                        <span> {
                                                            item.price
                                                        } </span>
                                                    </Link>
                                                </li>
                                            </>
                                        ))
                                    } </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='col-12 col-lg-9 col-xl-6'>
                        <div className='tradingview'>
                            <div className='advanced-chart'>
                                {
                                graphicVisibility && (
                                    <AdvancedRealTimeChart height={500}
                                        theme={'dark'}
                                        symbol={
                                            currency.name
                                        }
                                        allow_symbol_change={false}></AdvancedRealTimeChart>
                                )
                            } </div>
                        </div>
                    </div>
                    <div className='col-2'></div>
                    <div className='col-2'></div>


                </div>


            </main>


        </>
    )
}

export default CurrencyDetails
