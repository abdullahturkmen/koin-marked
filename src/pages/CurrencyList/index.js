import React from 'react'
import Navbar from 'layouts/Navbar';
import Footer from 'layouts/Footer';
import {TabTitle} from 'utils/functions';
import {useEffect, useState} from 'react';
import axios from "axios";
import SweetPagination from "sweetpagination";


const apiURL = process.env.REACT_APP_API_URL;

const CurrencyList = () => {
    const [currencies, setCurrency] = useState([]);
    const [currentPageData, setCurrentPageData] = useState([]);

    TabTitle(`Currency List | ${
        process.env.REACT_APP_TITLE
    }`)
    useEffect(() => {

        axios.get(apiURL).then(response => {
            setCurrency(response.data.data);
            setCurrentPageData(response.data.data);
            console.log(response.data.data)
        });

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
                        <div className="col-12 col-lg-4 border-end">
                            <table className="table">
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
                                        <td>Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="col-12 col-lg-4 border-end">
                            <table className="table">
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
                                        <td>Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12 col-lg-4">
                            <table className="table">
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
                                        <td>Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div className="container col-12 px-4 py-5">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">İsim</th>
                                <th scope="col"></th>
                                <th scope="col">Fiyat</th>
                                <th scope="col">24s Değişim</th>
                                <th scope="col">24s Hacim</th>
                                <th scope="col">Piyasa Değeri</th>
                            </tr>
                        </thead>
                        <tbody> {
                            currentPageData.map((item, index) => {
                                return (

                                    <tr key={
                                        item.id
                                    }>
                                        <td><img src={`https://cryptologos.cc/logos/thumbs/${
                                                    item.slug
                                                }.png`}
                                                width="20px"/></td>
                                        <td scope="row">
                                            {
                                            item.name
                                        }</td>
                                        <td>
                                            <small className='text-muted'>
                                                {
                                                item.fullName
                                            }</small>
                                        </td>
                                        <td>${
                                            item.price
                                        }</td>
                                        <td className={
                                            item.dayChange < 0 ? ('text-danger') : ('text-success')
                                        }>{Number(item.dayChange).toFixed(2)}
                                            %</td>
                                        <td>${
                                            item.volume
                                        }</td>
                                        <td>${
                                            item.marketCap
                                        }</td>
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
