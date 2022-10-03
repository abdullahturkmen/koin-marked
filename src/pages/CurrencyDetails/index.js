import React from 'react'
import Navbar from 'layouts/Navbar';
import Footer from 'layouts/Footer';
import {TabTitle} from 'utils/functions';
import {useEffect, useState, useTimeout} from 'react';
import {useParams, useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
import {AdvancedRealTimeChart} from "react-ts-tradingview-widgets";

const apiURL = process.env.REACT_APP_API_URL;

const CurrencyDetails = () => {

    const navigate = useNavigate();
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

    TabTitle(`${
        currency.name && currency.tickers[0].last
    } | ${
        currency.name
    } | ${
        process.env.REACT_APP_TITLE
    }`)


    useEffect(() => {

        axios.get(`${apiURL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000`).then(response => { // console.log(response.data.data)
            setTableCurrencies(response.data);
            console.log("datalar", response.data)
        });

        axios.get(`${apiURL}/coins/${id}`).then(response => {
            console.log("data ", response.data)

            setCurrency(response.data)
            setTimeout(() => setGraphicVisibility(true), 500);

        });

    }, [id]);

    const changeCurrency = (id) => {
        setGraphicVisibility(false)
        navigate(`/trade/${id}`, {replace: true})
    }


    return (
        <>
            <header className="header container-fluid">

                <Navbar/>

            </header>

            <main className="container-fluid main main-trade">


                <div className="row">

                    <div className='col-12 col-lg-3 col-xl-3 col-xxl-2'>
                        <div className='currencies-list thin-scrollbar'>
                            <div className='currencies-list-content'>
                                <div className="dropdown">
                                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        {
                                        currency.name ? currency.name : 'Select Currency'
                                    }</a>

                                    <ul className="dropdown-menu thin-scrollbar">
                                        {
                                        tableCurrencies.map(item => (
                                            <>
                                                <li className='currency-item'
                                                    key={
                                                        item.id
                                                }>
                                                    <a onClick={
                                                        e => changeCurrency(item.id)
                                                    }>
                                                        <img src={
                                                                item.image
                                                            }
                                                            alt={
                                                                item.name
                                                            }/>
                                                        <span className='currency-item-name text-uppercase'>
                                                            {
                                                            item.symbol
                                                        }USDT
                                                        </span>
                                                        <span>{
                                                            item.current_price
                                                        }</span>
                                                    </a>
                                                </li>
                                            </>
                                        ))
                                    }</ul>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='col-12 col-lg-9 col-xl-9 col-xxl-6'>
                        <div className='tradingview'>
                            <div className='advanced-chart'>
                                {
                                graphicVisibility && (
                                    <AdvancedRealTimeChart height={500}
                                        theme={'dark'}
                                        symbol={
                                            currency.symbol
                                        }
                                        allow_symbol_change={false}></AdvancedRealTimeChart>
                                )
                            }</div>
                        </div>

                        <table class="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td colspan="2">Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>

                    <div className='col-2'>sdfgsdfg</div>

                    <div className='col-2'>
                        <ul class="nav nav-tabs" id="buysellTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="market-tab" data-bs-toggle="tab" data-bs-target="#market" type="button" role="tab" aria-controls="market" aria-selected="true">Piyasa</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="limit-tab" data-bs-toggle="tab" data-bs-target="#limit" type="button" role="tab" aria-controls="limit" aria-selected="false">Limit</button>
                            </li>

                        </ul>
                        <div class="tab-content" id="buysellTabContent">
                            <div class="tab-pane fade show active" id="market" role="tabpanel" aria-labelledby="market-tab">


                                <ul class="nav nav-tabs" id="marketTab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active" id="market-buy-tab" data-bs-toggle="tab" data-bs-target="#market-buy" type="button" role="tab" aria-controls="market-buy" aria-selected="true">Alış</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="market-sell-tab" data-bs-toggle="tab" data-bs-target="#market-sell" type="button" role="tab" aria-controls="market-sell" aria-selected="false">Satış</button>
                                    </li>
                                </ul>
                                <div class="tab-content" id="marketTabContent">
                                    <div class="tab-pane fade show active" id="market-buy" role="tabpanel" aria-labelledby="market-buy-tab">market alış...</div>
                                    <div class="tab-pane fade" id="market-sell" role="tabpanel" aria-labelledby="market-sell-tab">market satış...</div>
                                </div>


                            </div>
                            <div class="tab-pane fade" id="limit" role="tabpanel" aria-labelledby="limit-tab">


                                <ul class="nav nav-tabs" id="limitTab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active" id="limit-buy-tab" data-bs-toggle="tab" data-bs-target="#limit-buy" type="button" role="tab" aria-controls="limit-buy" aria-selected="true">Alış</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="limit-sell-tab" data-bs-toggle="tab" data-bs-target="#limit-sell" type="button" role="tab" aria-controls="limit-sell" aria-selected="false">Satış</button>
                                    </li>
                                </ul>
                                <div class="tab-content" id="limitTabContent">
                                    <div class="tab-pane fade show active" id="limit-buy" role="tabpanel" aria-labelledby="limit-buy-tab">limit alış...</div>
                                    <div class="tab-pane fade" id="limit-sell" role="tabpanel" aria-labelledby="limit-sell-tab">limit satış...</div>
                                </div>


                            </div>
                        </div>
                    </div>


                </div>


            </main>


        </>
    )
}

export default CurrencyDetails
