import React from 'react'
import Navbar from 'layouts/Navbar';
import Footer from 'layouts/Footer';
import {TabTitle, moneyFormatter} from 'utils/functions';
import {useEffect, useState} from 'react';
import axios from "axios";
import SweetPagination from "sweetpagination";
import classNames from 'classnames';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';


const apiURL = process.env.REACT_APP_API_URL;

const CurrencyList = () => {
    const [currencies, setCurrency] = useState([]);
    const [currentPageData, setCurrentPageData] = useState([]);
    const [tags] = useState([]);
    const [selectedTag, setSelectedTag] = useState();
    const select = (tag) => () => selectedTag !== tag && setSelectedTag(tag);
   

    TabTitle(`Currency List | ${
        process.env.REACT_APP_TITLE
    }`)
    useEffect(() => {

        axios.get(apiURL).then(response => {
            setCurrency(response.data.data);
            setCurrentPageData(response.data.data);
            // console.log(response.data.data)

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
         

    }, [tags]);
     

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

                        <nav className="nav nav-pills flex-sm-row mt-1 mb-4 pb-4 px-2 border-bottom">
                            <Swiper className="swiper-currency-categories"
                               slidesPerView={"auto"}
                                spaceBetween={5}
                               >


                                <SwiperSlide>
                                    <button className={
                                            classNames("fs-6 text-sm-center nav-link rounded-pill cursor-pointer", {
                                                active: !selectedTag || selectedTag === 'all'
                                            })
                                        }
                                        onClick={
                                            select('all')
                                    }>
                                        All
                                    </button>
                                </SwiperSlide>
                 
                                {
                                Object.entries(tags).map((tag) => (

                                    <SwiperSlide>
                                        <button key={tag}
                                            className={
                                                classNames("fs-6 text-sm-center nav-link rounded-pill cursor-pointer", {
                                                    active: selectedTag === tag[1].info.tag
                                                })
                                            }
                                            onClick={
                                                select(tag[1].info.tag)
                                        }>
                                            {tag[1].info.display} </button>
                                    </SwiperSlide>

                                ))
                            } </Swiper>
                        </nav>


                        <Swiper slidesPerView={1}
                            spaceBetween={10}
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
                            <SwiperSlide className='p-2'>
                                <h5><img class="me-2" src="https://cryptologos.cc/logos/thumbs/bitcoin.png" width="20px" alt="bitcoin"/>Bitcoin
                                    <span className='ms-2 text-muted'>BTC</span>
                                </h5>
                                <h4 className='fw-bold'>USD 45,435.13</h4>
                                <span className='fs-6 text-muted'>24h | +USD 3248.13<small className='ms-1 price price-up'>15.20%</small>
                                </span>
                            </SwiperSlide>
                            <SwiperSlide className='p-2'>
                                <h5><img class="me-2" src="https://cryptologos.cc/logos/thumbs/ethereum.png" width="20px" alt="ethereum"/>Ethereum
                                    <span className='ms-2 text-muted'>ETH</span>
                                </h5>
                                <h4 className='fw-bold'>USD 3,480.65</h4>
                                <span className='fs-6 text-muted'>24h | -USD 286.43
                                    <small className='ms-1 price price-down'>5.80%</small>
                                </span>
                            </SwiperSlide>
                            <SwiperSlide className='p-2'>
                                <h5><img class="me-2" src="https://cryptologos.cc/logos/thumbs/solana.png" width="20px" alt="solana"/>Solana
                                    <span className='ms-2 text-muted'>SOL</span>
                                </h5>
                                <h4 className='fw-bold'>USD 150.20</h4>
                                <span className='fs-6 text-muted'>24h | +USD 124.12
                                    <small className='ms-1 price price-up'>4.08%</small>
                                </span>
                            </SwiperSlide>
                            <SwiperSlide className='p-2'>
                                <h5><img class="me-2" src="https://cryptologos.cc/logos/thumbs/dogecoin.png" width="20px" alt="dogecoin"/>Dogecoin
                                    <span className='ms-2 text-muted'>DOGE</span>
                                </h5>
                                <h4 className='fw-bold'>USD 0,1572</h4>
                                <span className='fs-6 text-muted'>24h | -USD 289.6
                                    <small className='ms-1 price price-down'>3.22%</small>
                                </span>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>


                <div className="container col-12 px-4 py-5">
                    <table className="table currency-list-table">
                        <thead>
                            <tr>
                                <th scope="col">Token Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">24s %</th>
                                <th scope="col" className='d-none d-md-table-cell'>24s Volume</th>
                                <th scope="col" className='d-none d-md-table-cell'>Market Cap</th>
                                <th scope="col" className='d-none d-sm-table-cell'>Action</th>
                            </tr>
                        </thead>
                        <tbody> {
                            currentPageData.map((item, index) => {
                                return (

                                    <tr key={
                                        item.id
                                    }>
                                        <td><img className='me-2'
                                                src={
                                                    `https://cryptologos.cc/logos/thumbs/${
                                                        item.slug
                                                    }.png`
                                                }
                                                width="20px" alt={
                                                    item.name
                                                }/> {
                                            item.name
                                        }
                                            <small className='text-muted ms-2 d-none d-md-inline-block'>
                                                {
                                                item.fullName
                                            }</small>
                                        </td>
                                        <td>${
                                            item.price
                                        }</td>
                                        <td>
                                            <div className={
                                                `price ${item.dayChange < 0 ? ('price-down') : ('price-up')}`
                                            }>
                                                {
                                                Number(item.dayChange).toFixed(2)
                                            }
                                                %</div>
                                        </td>
                                        <td className='d-none d-md-table-cell'>${
                                            moneyFormatter.format(item.volume)
                                        }</td>
                                        <td className='d-none d-md-table-cell'>${
                                            moneyFormatter.format(item.marketCap)
                                        }</td>
                                        <td className='d-none d-sm-table-cell'>
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
