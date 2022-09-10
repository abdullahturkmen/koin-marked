import React from 'react'
import Navbar from 'layouts/Navbar';
import Footer from 'layouts/Footer';
import {TabTitle, moneyFormatter} from 'utils/functions';
import {useEffect, useState} from 'react';
import axios from "axios";
import SweetPagination from "sweetpagination";
import classNames from 'classnames';
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode} from "swiper";
import 'swiper/css';
import "swiper/css/free-mode";


const apiURL = process.env.REACT_APP_API_URL;

const CurrencyList = () => {
    const [currencies, setCurrency] = useState([]);
    const [currentPageData, setCurrentPageData] = useState([]);


    const [tags, setDataState] = useState([]);
    const [selectedTag, setSelectedTag] = useState();
    const select = (tag) => () => selectedTag != tag && setSelectedTag(tag);
    const info = selectedTag && tags[selectedTag] ? tags[selectedTag].info : "Select token cat first";


    TabTitle(`Currency List | ${
        process.env.REACT_APP_TITLE
    }`)
    useEffect(() => {

        axios.get(apiURL).then(response => {
            setCurrency(response.data.data);
            setCurrentPageData(response.data.data);
            //console.log(response.data.data)


            response.data.data.map(i => {

                i.tags.map((tag, j) => {
                    if (!tags[tag]) {
                        tags[tag] = {
                            info: i.tagInfos[j],
                            items: []
                        }

                    }

                    tags[tag].items.push(i.id)

                })

                delete i.tags
                delete i.tagInfos
                // items[i.id] = i;

            });
        });
        // console.log(tags)

    }, []);


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


                <div className="container col-12 col-xl-10 p-4 bg-white shadow-light
                                                                                                                                                                                                                                                                                                                                                                            minus-margin radius-corner">
                    <div className="row">

                        <nav className="nav nav-pills flex-sm-row mt-1 mb-5 pb-4 px-2 border-bottom">
                            <Swiper className="currency-categories"
                                freeMode={true}
                                spaceBetween={5}

                                modules={
                                    [FreeMode]
                            }>


                                <SwiperSlide>
                                    <a className={
                                            classNames("fs-6 text-sm-center nav-link rounded-pill cursor-pointer", {
                                                active: !selectedTag || selectedTag === 'all'
                                            })
                                        }
                                        onClick={
                                            select('all')
                                    }>
                                        All
                                    </a>
                                </SwiperSlide>

                                {
                                Object.keys(tags).map((tag) => (

                                    <SwiperSlide>
                                        <a key={tag}
                                            className={
                                                classNames("fs-6 text-sm-center nav-link rounded-pill cursor-pointer", {
                                                    active: selectedTag === tag
                                                })
                                            }
                                            onClick={
                                                select(tag)
                                        }>
                                            {tag} </a>
                                    </SwiperSlide>

                                ))
                            } </Swiper>
                        </nav>

                    </div>
                </div>


                <div className="container col-12 px-4 py-5">
                    <table className="table currency-list-table">
                        <thead>
                            <tr>
                                
                                <th scope="col">Token Name</th>
                               
                                <th scope="col">Price</th>
                                <th scope="col">24s %</th>
                                <th scope="col">24s Volume</th>
                                <th scope="col">Market Cap</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody> {
                            currentPageData.map((item, index) => {
                                return (

                                    <tr key={
                                        item.id
                                    }>
                                        <td><img className='me-2' src={
                                                    `https://cryptologos.cc/logos/thumbs/${
                                                        item.slug
                                                    }.png`
                                                }
                                                width="20px"/>
                                            {
                                            item.name
                                        }
                                            <small className='text-muted ms-2'>
                                                {
                                                item.fullName
                                            }</small>
                                        </td>
                                        <td>${
                                            item.price
                                        }</td>
                                        <td><div className={
                                            item.dayChange < 0 ? ('price price-down') : ('price price-up')
                                        }>
                                            {
                                            Number(item.dayChange).toFixed(2)
                                        }
                                            %</div></td>
                                        <td>${
                                            moneyFormatter.format(item.volume)
                                        }</td>
                                        <td>${
                                            moneyFormatter.format(item.marketCap)
                                        }</td>
                                        <td>
                                            <button type="button" className="btn btn-sm btn-outline-primary radius-corner me-2">Buy</button>
                                            <button type="button" className="btn btn-sm btn-outline-secondary radius-corner">Trade</button>
                                        </td>
                                    </tr>
                                );
                            })
                        } </tbody>

                    </table>
                    <SweetPagination currentPageData={setCurrentPageData}
                        getData={currencies}
                        dataPerPage={10}
                        navigation={true}
                        getStyle={'currency-pagination'}/>
                </div>


            </main>


            <Footer/>

        </>
    )
}

export default CurrencyList
