import React from 'react'
import Navbar from 'layouts/Navbar';
import {TabTitle} from 'utils/functions';
import {useEffect, useState} from 'react';
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
    const paramsType = params.get("type")

    let {id} = useParams();

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

                        <div className='info-table'>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="open-orders-tab" data-bs-toggle="tab" data-bs-target="#open-orders" type="button" role="tab" aria-controls="open-orders" aria-selected="true">Open Orders</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="order-history-tab" data-bs-toggle="tab" data-bs-target="#order-history" type="button" role="tab" aria-controls="order-history" aria-selected="false">Order History</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="trade-history-tab" data-bs-toggle="tab" data-bs-target="#trade-history" type="button" role="tab" aria-controls="trade-history" aria-selected="false">Trade History</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane thin-scrollbar fade show active" id="open-orders" role="tabpanel" aria-labelledby="open-orders-tab">
                                    <table className="table table-dark table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Date</th>
                                                <th scope="col">Pair</th>
                                                <th scope="col">Type</th>
                                                <th scope="col">Side</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Filled</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr>
                                            <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                                            <tr>
                                            <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr>
                                            <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                                            <tr>
                                            <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr>
                                            <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                                            <tr>
                                            <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr>
                                            <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>
                                <div className="tab-pane thin-scrollbar fade" id="order-history" role="tabpanel" aria-labelledby="order-history-tab">
                                <table className="table table-dark table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Date</th>
                                                <th scope="col">Pair</th>
                                                <th scope="col">Type</th>
                                                <th scope="col">Side</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Filled</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr>
                                            <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                                            <tr>
                                            <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr>
                                            <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                                            <tr>
                                            <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr>
                                            <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                                            <tr>
                                            <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr>
                                            <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>
                                <div className="tab-pane thin-scrollbar fade" id="trade-history" role="tabpanel" aria-labelledby="trade-history-tab">
                                <table className="table table-dark table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Date</th>
                                                <th scope="col">Pair</th>
                                                <th scope="col">Type</th>
                                                <th scope="col">Side</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Filled</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr>
                                            <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                                            <tr>
                                            <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr>
                                            <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                                            <tr>
                                            <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr>
                                            <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                                            <tr>
                                            <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr>
                                            <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className='col-12 col-md-6 col-xxl-2 mt-3 mt-xxl-0'>
                        <ul className="nav nav-tabs" id="buysellTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="market-tab" data-bs-toggle="tab" data-bs-target="#market" type="button" role="tab" aria-controls="market" aria-selected="true">Piyasa</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="limit-tab" data-bs-toggle="tab" data-bs-target="#limit" type="button" role="tab" aria-controls="limit" aria-selected="false">Limit</button>
                            </li>

                        </ul>
                        <div className="tab-content" id="buysellTabContent">
                            <div className="tab-pane fade show active" id="market" role="tabpanel" aria-labelledby="market-tab">


                                <ul className="nav buy-sell-tabs" id="marketTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className={
                                                `nav-link ${
                                                    paramsType == null && ('active')
                                                }`
                                            }
                                            id="market-buy-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#market-buy"
                                            type="button"
                                            role="tab"
                                            aria-controls="market-buy"
                                            aria-selected="true">Alış</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className={
                                                `nav-link ${
                                                    paramsType != null && ('active')
                                                }`
                                            }
                                            id="market-sell-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#market-sell"
                                            type="button"
                                            role="tab"
                                            aria-controls="market-sell"
                                            aria-selected="false">Satış</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="marketTabContent">
                                    <div className={
                                            `tab-pane fade ${
                                                paramsType == null && ('show active')
                                            }`
                                        }
                                        id="market-buy"
                                        role="tabpanel"
                                        aria-labelledby="market-buy-tab">market alış...</div>
                                    <div className={
                                            `tab-pane fade ${
                                                paramsType != null && ('show active')
                                            }`
                                        }
                                        id="market-sell"
                                        role="tabpanel"
                                        aria-labelledby="market-sell-tab">market satış...</div>
                                </div>


                            </div>
                            <div className="tab-pane fade" id="limit" role="tabpanel" aria-labelledby="limit-tab">


                                <ul className="nav buy-sell-tabs" id="limitTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className={
                                                `nav-link ${
                                                    paramsType == null && ('active')
                                                }`
                                            }
                                            id="limit-buy-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#limit-buy"
                                            type="button"
                                            role="tab"
                                            aria-controls="limit-buy"
                                            aria-selected="true">Alış</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className={
                                                `nav-link ${
                                                    paramsType != null && ('active')
                                                }`
                                            }
                                            id="limit-sell-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#limit-sell"
                                            type="button"
                                            role="tab"
                                            aria-controls="limit-sell"
                                            aria-selected="false">Satış</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="limitTabContent">
                                    <div className={
                                            `tab-pane fade ${
                                                paramsType == null && ('show active')
                                            }`
                                        }
                                        id="limit-buy"
                                        role="tabpanel"
                                        aria-labelledby="limit-buy-tab">limit alış...</div>
                                    <div className={
                                            `tab-pane fade ${
                                                paramsType != null && ('show active')
                                            }`
                                        }
                                        id="limit-sell"
                                        role="tabpanel"
                                        aria-labelledby="limit-sell-tab">limit satış...</div>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className='col-12 col-md-6 col-xxl-2 mt-3 mt-xxl-0'>
                    <div className='order-book-table'>
                    <table className="table table-dark">
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
                                        </tbody>

                                    </table>
                    </div>
                    </div>

                </div>


            </main>


        </>
    )
}

export default CurrencyDetails
