import React from 'react'
import Navbar from 'layouts/Navbar';
import Footer from 'layouts/Footer';
import {TabTitle} from 'utils/functions';
import {useEffect, useState, useRef} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';


const apiURL = process.env.REACT_APP_API_URL;

const Home = () =>{

    const [currencies, setCurrency] = useState([]);
    const [trending, setTrending] = useState([]);
    const [amount, setAmount] = useState(1);
    const [amountName, setAmountName] = useState('Bitcoin');
    const [price, setPrice] = useState(1);
    const [priceName, setPriceName] = useState('Tether');
    const amountRef = useRef(null);
    const priceRef = useRef(null);


    useEffect(() =>{

        axios.get(`${apiURL}/coins/markets?vs_currency=usd&per_page=1000`).then(response =>{
            setCurrency(response.data);
            response.data.filter(e => e.name == "Bitcoin").map(e => setPrice(e.current_price))
        });

        axios.get(`${apiURL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4`).then(response =>{
            setTrending(response.data)
        });

    }, []);

    TabTitle(process.env.REACT_APP_TITLE)

    const numberValidation = /^[0-9]+$/;

    const changeAmount = (e) =>{
        if (e == null) 
            e = 0;
        


        if (e.match(numberValidation)) {
            e = Math.abs(e)
            setAmount(e)
            setPrice(e * amountRef.current.value / priceRef.current.value)
        }
    }

    const changePrice = (e) =>{
        if (e == null) 
            e = 0;
        


        if (e.match(numberValidation)) {
            e = Math.abs(e)
            setPrice(e)
            setAmount(e * priceRef.current.value / amountRef.current.value)
        }
    }

    const changeAmountName = () =>{
        setAmountName(amountRef.current.selectedOptions[0].label)
        setPrice(amount * amountRef.current.value / priceRef.current.value)
    }

    const changePriceName = () =>{
        setPriceName(priceRef.current.selectedOptions[0].label)
        setPrice(amount * amountRef.current.value / priceRef.current.value)
    }

    const swapCurrency = () =>{
        setAmountName(priceName)
        setPriceName(amountName)
        setPrice(amount * priceRef.current.value / amountRef.current.value)
    }

    return (
        <>

            <header className="header header--colored-bg container-fluid py-5">

                <Navbar/>

                <div className="container col-xxl-12 px-4 py-5">
                    <div className="row flex-lg-row-reverse align-items-center g-5
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                py-5">
                        <div className="col-10 col-lg-6 mx-auto">
                            <img src={
                                    require("../../assets/img/head-bitcoin-img.png")
                                }
                                className="d-block
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    mx-lg-auto img-fluid head-img-scale"
                                loading="lazy"/>
                        </div>
                        <div className="col-lg-6">
                            <span className="text-primary text-uppercase fw-bold pb-4
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                d-block">SIGN UP TODAY</span>
                            <h1 className="display-2 fw-bold lh-1 mb-3">The World’s
                                <span className="gradient-text">Fastest Growing</span>
                                Crypto Web App</h1>
                            <p className="py-4 text-muted">Buy and sell 200+
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                cryptocurrencies with
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                20+ flat currencies using bank transfers or your
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                credit/debit card.</p>
                            <div className="d-grid gap-2 d-md-flex
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        justify-content-md-start">
                                <button type="button" className="btn btn-primary btn-md
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            me-md-2 rounded-pill px-5 py-4">Get Started</button>
                                <button type="button" className="btn
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            btn-outline-primary btn-md rounded-pill px-5
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            py-4">Download App</button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container-fluid">


                <div className="container col-12 col-xl-10 p-4 bg-white shadow-light
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    minus-margin radius-corner hero-tables">
                    <div className="row">

                        <div className="col-12 col-lg-4 px-4 border-end mb-5 mb-lg-0">
                            <div className='d-flex justify-content-between'>
                                <h6 className='mb-0'>Trending</h6>
                                <Link to="/markets" className='fs-6'>
                                    <small>More</small>
                                </Link>
                            </div>
                            <table className="table align-middle fs-6">
                                <thead>
                                    <tr>
                                        <td className='text-secondary'>
                                            <small>Name</small>
                                        </td>
                                        <td className='text-secondary'>
                                            <small>Price</small>
                                        </td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>{
                                    trending.map(item => (
                                        <tr key={
                                            item.id
                                        }>
                                            <td><img className="me-2"
                                                    src={

                                                        item.image
                                                    }
                                                    width="20px"
                                                    alt={
                                                        item.name
                                                    }/>{
                                                item.name
                                            }</td>
                                            <td>{
                                                item.current_price
                                            }</td>
                                            <td>
                                                <Link to={
                                                    `/trade/${
                                                        item.id
                                                    }`
                                                }>
                                                    <i className='fa fa-chevron-right'></i>
                                                </Link>
                                            </td>
                                        </tr>

                                    ))
                                }</tbody>
                            </table>
                        </div>

                        <div className="col-12 col-lg-4 px-4 border-end mb-5 mb-lg-0">
                            <div className='d-flex justify-content-between'>
                                <h6 className='mb-0'>Top Gainers</h6>
                                <Link to="/markets" className='fs-6'>
                                    <small>More</small>
                                </Link>
                            </div>
                            <table className="table align-middle fs-6">
                                <thead>
                                    <tr>
                                        <td className='text-secondary'>
                                            <small>Name</small>
                                        </td>
                                        <td className='text-secondary'>
                                            <small>Price</small>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><img className="me-2" src="https://cryptologos.cc/logos/thumbs/bitcoin.png" width="20px" alt="bitcoin"/>Bitcoin</td>
                                        <td>+48,103.12</td>
                                    </tr>
                                    <tr>
                                        <td><img className="me-2" src="https://cryptologos.cc/logos/thumbs/ethereum.png" width="20px" alt="ethereum"/>Ethereum</td>
                                        <td>+48,103.12</td>
                                    </tr>
                                    <tr>
                                        <td><img className="me-2" src="https://cryptologos.cc/logos/thumbs/solana.png" width="20px" alt="solana"/>Solana</td>
                                        <td>+48,103.12</td>
                                    </tr>
                                    <tr>
                                        <td><img className="me-2" src="https://cryptologos.cc/logos/thumbs/dogecoin.png" width="20px" alt="dogecoin"/>Dogecoin</td>
                                        <td>+48,103.12</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="col-12 col-lg-4 px-4">
                            <div className='d-flex justify-content-between'>
                                <h6 className='mb-0'>Recently Added</h6>
                                <Link to="/markets" className='fs-6'>
                                    <small>More</small>
                                </Link>
                            </div>
                            <table className="table align-middle fs-6">
                                <thead>
                                    <tr>
                                        <td className='text-secondary'>
                                            <small>Name</small>
                                        </td>
                                        <td className='text-secondary'>
                                            <small>Price</small>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><img className="me-2" src="https://cryptologos.cc/logos/thumbs/bitcoin.png" width="20px" alt="bitcoin"/>Bitcoin</td>
                                        <td>+48,103.12</td>
                                    </tr>
                                    <tr>
                                        <td><img className="me-2" src="https://cryptologos.cc/logos/thumbs/ethereum.png" width="20px" alt="ethereum"/>Ethereum</td>
                                        <td>+48,103.12</td>
                                    </tr>
                                    <tr>
                                        <td><img className="me-2" src="https://cryptologos.cc/logos/thumbs/solana.png" width="20px" alt="solana"/>Solana</td>
                                        <td>+48,103.12</td>
                                    </tr>
                                    <tr>
                                        <td><img className="me-2" src="https://cryptologos.cc/logos/thumbs/dogecoin.png" width="20px" alt="dogecoin"/>Dogecoin</td>
                                        <td>+48,103.12</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

                <div className="container col-12 px-4 py-5">
                    <div className="row align-items-center g-lg-5 py-5">
                        <div className="col-md-10 mx-auto col-lg-5">
                            <span className="fw-bold pb-4 d-block display-6">Buy & trade
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                on the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                original crypto exchange.</span>
                            <p className="text-muted">
                                Buy now and get 40% extra bonus Minimum pre-sale
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                amount 25 Crypto Coin. We accept BTC crypto-currency
                            </p>
                            <form className="py-4 form-template">
                                <div className='input-content'>
                                    <div className="row my-4">
                                        <div className="col-7">
                                            <div className="input-border">
                                                <label className="input-group-text" htmlFor="amount">Amount</label>
                                                <input type="text"
                                                    onChange={
                                                        e => changeAmount(e.target.value)
                                                    }
                                                    className="form-control
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                form-template-input text-end"
                                                    id="amount"
                                                    placeholder="5,000"
                                                    value={amount}
                                                    required=""/>
                                            </div>
                                        </div>

                                        <div className="col-5">
                                            <div className="input-border">
                                                <select onChange={changeAmountName}
                                                    ref={amountRef}
                                                    className="form-select
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                form-template-select"
                                                    id="inputGroupSelect02">
                                                    <option value="DEFAULT" disabled>Choose...</option>

                                                    {
                                                    currencies.map(e => (
                                                        <option key={
                                                                e.name
                                                            }
                                                            value={
                                                                e.current_price
                                                            }
                                                            selected={
                                                                (e.name == amountName) && (
                                                                    <>selected</>
                                                                )
                                                        }>
                                                            {
                                                            e.name
                                                        }</option>

                                                    ))
                                                }</select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row my-4">
                                        <div className="col-7">
                                            <div className="input-border">
                                                <label className="input-group-text" htmlFor="get">Get</label>
                                                <input type="text"
                                                    onChange={
                                                        e => changePrice(e.target.value)
                                                    }
                                                    className="form-control
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                form-template-input text-end"
                                                    id="get"
                                                    placeholder="0.10901"
                                                    value={price}
                                                    required=""/>
                                            </div>
                                        </div>

                                        <div className="col-5">
                                            <div className="input-border">
                                                <select onChange={changePriceName}
                                                    ref={priceRef}
                                                    className="form-select
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            form-template-select"
                                                    id="inputGroupSelect02">
                                                    <option value="DEFAULT" disabled>Choose...</option>
                                                    {
                                                    currencies.map(e => (
                                                        <option key={
                                                                e.name
                                                            }
                                                            value={
                                                                e.current_price
                                                            }
                                                            selected={
                                                                (e.name == priceName) && (
                                                                    <>selected</>
                                                                )
                                                        }>
                                                            {
                                                            e.name
                                                        }</option>

                                                    ))
                                                }</select>
                                            </div>
                                        </div>
                                    </div>
                                    <span className='swap-currency-btn'
                                        onClick={swapCurrency}><i className="fa fa-arrow-right-arrow-left"></i></span>

                                </div>

                                <button className="w-100 btn btn-md btn-primary
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            rounded-pill px-5 py-3" type="submit">Buy Now</button>

                            </form>
                        </div>
                        <div className="col-10 col-lg-6 mx-auto">
                            <img src={
                                    require("../../assets/img/crypto-exchange-img.png")
                                }
                                className="d-block
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    mx-lg-auto img-fluid"
                                alt="Bootstrap Themes"
                                width="700"
                                height="500"
                                loading="lazy"/>
                        </div>
                    </div>
                </div>


                <div className="container col-12 px-4 py-5 wall-texture
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    radius-corner
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    text-center">
                    <h3>Trusted Partners Worldwide</h3>
                    <div className="col-lg-12">
                        <p className="text-muted mb-4 col-lg-8 mx-auto">We're partners
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    with countless major organisations around the globe</p>
                        <div className="col-12 mx-auto py-2">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-3"><img src={
                                            require("../../assets/img/logoipsum-logo-8.svg").default
                                        }
                                        className="mw-100"
                                        alt=""/></div>
                                <div className="col-12 col-sm-6 col-md-3"><img src={
                                            require("../../assets/img/logoipsum-logo-7.svg").default
                                        }
                                        className="mw-100"
                                        alt=""/></div>
                                <div className="col-12 col-sm-6 col-md-3"><img src={
                                            require("../../assets/img/logoipsum-logo-6.svg").default
                                        }
                                        className="mw-100"
                                        alt=""/></div>
                                <div className="col-12 col-sm-6 col-md-3"><img src={
                                            require("../../assets/img/logoipsum-logo-1.svg").default
                                        }
                                        className="mw-100"
                                        alt=""/></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container col-12 px-4 py-5">
                    <div className="row align-items-center g-lg-5 py-5">
                        <div className="col-10 col-lg-6 mx-auto">
                            <img src={
                                    require("../../assets/img/cc-img.png")
                                }
                                className="d-block
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    mx-lg-auto img-fluid"
                                alt="Bootstrap Themes"
                                width="700"
                                height="500"
                                loading="lazy"/>
                        </div>
                        <div className="col-md-10 mx-auto col-lg-6">
                            <h3 className="display-6 fw-bold lh-1 mb-5">Introducing the
                                <span className="gradient-text">NEFA</span>
                                Credit Card</h3>
                            <small className="text-muted mb-3 d-block">Subject to
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                cardholder and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                rewards terms which will be available at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                application.</small>
                            <div className="d-flex align-items-center py-2">
                                <span className="check-circle"></span>
                                <span>Up to 3% back on purchases</span>
                            </div>
                            <div className="d-flex align-items-center py-2">
                                <span className="check-circle"></span>
                                <span>Earn rewards in bitcoin or any crypto on NEFA</span>
                            </div>
                            <div className="d-flex align-items-center py-2">
                                <span className="check-circle"></span>
                                <span>No annual fee</span>
                            </div>
                            <div className="d-grid my-5 d-md-flex
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        justify-content-md-start">
                                <button type="button" className="btn
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            btn-outline-primary btn-md rounded-pill px-5
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            py-4">Join the waitlist</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container col-12 px-4 py-5 wall-texture
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    radius-corner">
                    <div className="row align-items-center g-lg-5 py-5">
                        <div className="col-md-10 mx-auto col-lg-5">
                            <h3 className="display-6 fw-bold lh-1 mb-5">Advanced Trading
                                <span className="gradient-text">Tools</span>
                            </h3>
                            <span className="mb-2 mt-4 d-block">Professional Access,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Non-stop
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Availability</span>
                            <p className="text-muted fs-6">We provide premium access to
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                crypto trading for both individuals and institutions
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                through high liquidity, reliable order execution and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                constant uptime.</p>
                            <span className="mb-2 mt-4 d-block">A Range of Powerful Apis</span>
                            <p className="text-muted fs-6">Set up your own trading
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                interface or deploy your algorithmic strategy with
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                our high-performance FIX and HTTP APIs. Connect to
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                our WebSocket for real-time data streaming.</p>
                            <span className="mb-2 mt-4 d-block">Customer Support</span>
                            <p className="text-muted fs-6">Premium 24/7 support
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                available to all customers worldwide by phone or
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                email. Dedicated account managers for partners.</p>
                            <div className="d-grid my-5 d-md-flex
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        justify-content-md-start">
                                <button type="button" className="btn
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            btn-outline-primary btn-md rounded-pill px-5
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            py-4">Get Started</button>
                                <a href="" className="px-5 py-4
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            text-decoration-underline text-center">Learn
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            More</a>
                            </div>
                        </div>
                        <div className="col-10 col-lg-6 mx-auto">
                            <img src={
                                    require("../../assets/img/advanced-tools-img.png")
                                }
                                className="d-block
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    mx-lg-auto img-fluid"
                                alt="Bootstrap Themes"
                                width="700"
                                height="500"
                                loading="lazy"/>
                        </div>
                    </div>
                </div>


                <div className="container col-12 px-4 py-5">
                    <div className="row align-items-center g-lg-5 py-5">
                        <div className="col-10 col-lg-6 mx-auto">
                            <img src={
                                    require("../../assets/img/security-img.png")
                                }
                                className="d-block
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    mx-lg-auto img-fluid"
                                alt="Bootstrap Themes"
                                width="700"
                                height="500"
                                loading="lazy"/>
                        </div>
                        <div className="col-md-10 mx-auto col-lg-5">
                            <h3 className="display-6 fw-bold lh-1 mb-5">Industry-leading
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                security from day one</h3>
                            <div className="mb-2 mt-4 d-flex align-items-center">
                                <span className="check-circle"></span>
                                Safety, security
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                and compliance</div>
                            <p className="text-muted fs-6">NEFA is a licensed New York
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                trust company that undergoes regular bank exams and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                is subject to the cybersecurity audits conducted by
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                the New York Department of Financial Services. Learn
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                more about our commitment to security.
                            </p>
                            <div className="mb-2 mt-4 d-flex align-items-center">
                                <span className="check-circle"></span>Hardware security
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        keys</div>
                            <p className="text-muted fs-6">With NEFA you can secure your
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                account with a hardware security key via WebAuthn.</p>
                            <div className="mb-2 mt-4 d-flex align-items-center">
                                <span className="check-circle"></span>SOC Certifications</div>
                            <p className="text-muted fs-6">NEFA is SOC 1 Type 2 and SOC
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                2 Type 2 compliant. We are the world’s first
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                cryptocurrency exchange and custodian to complete
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                these exams.</p>
                        </div>
                    </div>
                </div>

                <div className="container px-4 py-5 text-center wall-texture
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    radius-corner">
                    <h2 className="pb-2 display-6">Get started in just a few minutes</h2>
                    <div className="row g-4 pt-5 row-cols-1 row-cols-lg-3">
                        <div className="feature col col-sm-8 mx-auto">
                            <div className="feature-icon text-center">
                                <img src={
                                        require("../../assets/img/features/signup.png")
                                    }
                                    className="img-fluid"/>
                            </div>
                            <h4 className="my-3">Sign Up</h4>
                            <p className="text-muted fs-6 px-5">Buy Bitcoin or Ethereum,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                then
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                securely store it in your Wallet or send it on
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                easily to friends</p>
                        </div>
                        <div className="feature col col-sm-8 mx-auto">
                            <div className="feature-icon text-center">

                                <img src={
                                        require("../../assets/img/features/fund.png")
                                    }
                                    className="img-fluid"/>

                            </div>
                            <h4 className="my-3">Fund</h4>
                            <p className="text-muted fs-6 px-5">Choose your preferred
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                payment
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                method such as bank transfer or credit card to top
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                up your NEFA Wallet</p>
                        </div>
                        <div className="feature col col-sm-8 mx-auto">
                            <div className="feature-icon text-center">

                                <img src={
                                        require("../../assets/img/features/crypto.png")
                                    }
                                    className="img-fluid"/>

                            </div>
                            <h4 className="my-3">Buy Crypto</h4>
                            <p className="text-muted fs-6 px-5">Sign up for your free
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                NEFA
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Wallet on web, iOS or Android and follow our easy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                process to set up your profile</p>
                        </div>
                    </div>
                </div>

                <div className="container col-12 px-4 py-5">
                    <div className="row align-items-center g-lg-5 py-5">
                        <div className="col-10 col-sm-8 col-lg-5 mx-auto">
                            <img src={
                                    require("../../assets/img/faq-img.png")
                                }
                                className="d-block
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    mx-auto img-fluid"
                                alt="Bootstrap Themes"
                                width="700"
                                height="500"
                                loading="lazy"/>
                        </div>
                        <div className="col-md-10 mx-auto col-lg-7">
                            <span className="text-primary text-uppercase pb-2 d-block">SUPPORT</span>
                            <h1 className="display-6 fw-bold lh-1 mb-3">Frequently asked
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                questions</h1>

                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item border-0 border-bottom">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button px-0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Why should I choose NEFA?
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body text-muted px-0">
                                            We're industry pioneers, having been in
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    the cryptocurrency industry since 2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    We've facilitated more than 21 billion
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    USD worth of transactions on our
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    exchange for customers in over 40
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    countries. Today, we're trusted by over
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    8 million customers around the world and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    have received praise for our easy-to-use
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    app, secure wallet, and range of
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    features.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0 border-bottom">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button px-0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            How secure is NEFA?
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body text-muted px-0">
                                            We're industry pioneers, having been in
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    the cryptocurrency industry since 2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    We've facilitated more than 21 billion
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    USD worth of transactions on our
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    exchange for customers in over 40
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    countries. Today, we're trusted by over
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    8 million customers around the world and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    have received praise for our easy-to-use
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    app, secure wallet, and range of
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    features.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0 border-bottom">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button px-0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Do I have to buy a whole Bitcoin?
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div className="accordion-body text-muted px-0">
                                            We're industry pioneers, having been in
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    the cryptocurrency industry since 2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    We've facilitated more than 21 billion
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    USD worth of transactions on our
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    exchange for customers in over 40
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    countries. Today, we're trusted by over
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    8 million customers around the world and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    have received praise for our easy-to-use
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    app, secure wallet, and range of
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    features.
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            </main>


            <Footer/>

        </>
    )
}

export default Home
