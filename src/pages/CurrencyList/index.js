import React from 'react'
import Navbar from 'layouts/Navbar';
import Footer from 'layouts/Footer';
import { TabTitle, moneyFormatter } from 'utils/functions';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Pagination from 'rc-pagination';
import { categoriesDataList } from './categoriesDataList';


const apiURL = process.env.REACT_APP_API_URL;

const CurrencyList = () => {
    const [itemPerPageStart, setItemPerPageStart] = useState(0);
    const [itemPerPageEnd, setItemPerPageEnd] = useState(10);
    const [tableCurrencies, setTableCurrencies] = useState([]);
    const [swiperCurrencies, setSwiperCurrencies] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [tableCurrencyFilter, setTableCurrencyFilter] = useState([]);
    const [selectedTag, setSelectedTag] = useState();

    TabTitle(`Currency List | ${process.env.REACT_APP_TITLE
        }`)

    useEffect(() => {
        categoriesDataList().then(setCategoriesList);
    }, []);

    let categoryParams;
    useEffect(() => {

        if (!selectedTag || selectedTag === "all")
            categoryParams = ''
        else
            categoryParams = `&category=${selectedTag}`



        axios.get(`${apiURL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000${categoryParams}`).then(response => {
            setTableCurrencies(response.data);
            setTableCurrencyFilter(response.data)
        });

    }, [selectedTag]);

    useEffect(() => {

        if (!selectedTag || selectedTag === "all")
            categoryParams = ''
        else
            categoryParams = `&category=${selectedTag}`



        axios.get(`${apiURL}/coins/markets?vs_currency=usd&order=market_cap_desc${categoryParams}`).then(response => {
            setSwiperCurrencies(response.data)
            console.log(response.data)
        });

    }, [selectedTag]);

    const currencyFilter = (e) => {

        if (e !== '') {
            const results = tableCurrencies.filter((user) => {
                return user.name.toLowerCase().startsWith(e.toLowerCase());
            });
            setTableCurrencyFilter(results);
            setItemPerPageStart(0)
        } else {
            setTableCurrencyFilter(tableCurrencies);
        }

    }

    const changeTablePage = (pageNumber) => {

        setItemPerPageStart(((pageNumber - 1) * 10))
        setItemPerPageEnd(((pageNumber) * 10))

    }

    const changeCategory = (tag) => () => {
        selectedTag !== tag && setSelectedTag(tag)
    };


    return (<>

        <header className="header header--colored-bg container-fluid py-5">

            <Navbar />

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


            <div className="container col-12 col-xl-10 p-4 bg-white shadow-light
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            minus-margin radius-corner">
                <div className="row">

                    <nav className="nav nav-pills flex-sm-row mt-1 mb-4 pb-4 px-2 border-bottom">
                        <Swiper className="swiper-currency-categories"
                            slidesPerView={"auto"}
                            spaceBetween={5}>


                            <SwiperSlide>
                                <button className={
                                    classNames("fs-6 text-sm-center nav-link rounded-pill cursor-pointer", {
                                        active: !selectedTag || selectedTag === 'all'
                                    })
                                }
                                    onClick={
                                        changeCategory('all')
                                    }>
                                    All
                                </button>
                            </SwiperSlide>

                            {
                                categoriesList.map((category) => (

                                    <SwiperSlide key={
                                        category.category_id
                                    }>
                                        <button
                                            className={
                                                classNames("fs-6 text-sm-center nav-link rounded-pill cursor-pointer", {
                                                    active: selectedTag === category.category_id
                                                })
                                            }
                                            onClick={
                                                changeCategory(category.category_id)
                                            }>{
                                                category.name
                                            }</button>
                                    </SwiperSlide>

                                ))
                            }</Swiper>
                    </nav>


                    <Swiper slidesPerView={1}
                        spaceBetween={10}
                        loop={true}
                        breakpoints={{
                            575: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            992: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                            1400: {
                                slidesPerView: 4,
                                spaceBetween: 50,
                            },
                        }}
                        className="currency-list-swiper">
                        {
                            swiperCurrencies.slice(0, 4).map(item => (
                                <SwiperSlide className='p-2' key={item.id}>
                                    <h5><img className="me-2"
                                        src={

                                            item.image
                                        }
                                        width="20px"
                                        alt={
                                            item.symbol
                                        } />{
                                            item.name
                                        }
                                        <span className='ms-2 text-muted text-uppercase'>
                                            {
                                                item.symbol
                                            }</span>
                                    </h5>
                                    <h4 className='fw-bold'>USD {
                                        item.current_price
                                    }</h4>
                                    <span className='fs-6 text-muted'>24h | USD {Number(item.price_change_24h).toFixed(8).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')}
                                        <small className={
                                            `ms-1 price ${item.price_change_percentage_24h < 0 ? ('price-down') : ('price-up')
                                            }`
                                        }>
                                            {
                                                Number(item.price_change_percentage_24h).toFixed(2)
                                            }%</small>
                                    </span>
                                </SwiperSlide>
                            ))
                        }</Swiper>
                </div>
            </div>

            <div className="container col-12 px-4 py-5">
                <div className='col-12 col-sm-7 col-md-5 col-lg-3 float-end'>
                    <input className='form-control rounded-pill border-primary' type="text"
                        onChange={
                            e => currencyFilter(e.target.value)
                        }
                        placeholder='Search currency' /></div>
                <table className="table currency-list-table">
                    <thead>
                        <tr>
                            <th scope="col">Token Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">24s %</th>
                            <th scope="col" className='d-none d-md-table-cell'>24s Volume</th>
                            <th scope="col" className='d-none d-md-table-cell'>Market Cap</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>{
                        // currentPageData.filter(item => item.name == "AAVE").map((item, index) =>{
                        tableCurrencyFilter.slice(itemPerPageStart, itemPerPageEnd).map(item => {
                            return (

                                <tr key={
                                    item.id
                                }>
                                    <td><img className='me-2'
                                        src={

                                            item.image
                                        }
                                        width="20px" />
                                        <span className="text-uppercase">
                                            {
                                                item.symbol
                                            }</span>
                                        <small className='text-muted ms-2 d-none d-md-inline-block'>
                                            {
                                                item.name
                                            }</small>
                                    </td>
                                    <td>${
                                        item.current_price
                                    }</td>
                                    <td>
                                        <div className={
                                            `price ${item.price_change_percentage_24h < 0 ? ('price-down') : ('price-up')
                                            }`
                                        }>
                                            {
                                                Number(item.price_change_percentage_24h).toFixed(2)
                                            }
                                            %</div>
                                    </td>
                                    <td className='d-none d-md-table-cell'>${
                                        moneyFormatter.format(item.total_volume)
                                    }</td>
                                    <td className='d-none d-md-table-cell'>${
                                        moneyFormatter.format(item.market_cap)
                                    }</td>
                                    <td>
                                        <Link className="d-none d-sm-inline-block btn btn-sm btn-outline-primary radius-corner me-2"
                                            to={
                                                `/trade/${item.id
                                                }`
                                            }>Buy</Link>
                                        <Link className="d-none d-sm-inline-block btn btn-sm btn-outline-secondary radius-corner"
                                            to={
                                                `/trade/${item.id
                                                }?type=sell`
                                            }>Sell</Link>
                                        <Link className="d-inline-block d-sm-none btn btn-sm btn-outline-primary radius-corner"
                                            to={
                                                `/trade/${item.id
                                                }`
                                            }>⇆</Link>
                                    </td>
                                </tr>
                            );
                        })
                    }</tbody>

                </table>

                <Pagination className="currency-pagination"

                    total={
                        tableCurrencyFilter.length
                    }
                    onChange={
                        e => changeTablePage(e)
                    }
                    showTitle={false} />

            </div>


        </main>


        <Footer />

    </>
    )
}

export default CurrencyList
