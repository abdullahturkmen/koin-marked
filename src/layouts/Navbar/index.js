import React from 'react'
import {Link} from "react-router-dom";
import logo from 'assets/img/logo.svg'

const Navbar = () => {
  return (
    <>
     <nav className="navbar navbar-light navbar-expand-xl">
                <div className="container">
                    <Link to="/" className="navbar-brand"> <img
                            src={logo} className="d-block
                            mx-lg-auto img-fluid" /></Link>
                    <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0 w-100
                            justify-content-evenly align-items-center">
                            <li className="nav-item">
                                <Link className="nav-link text-dark"
                                    to="/currency-list">Crytocurrency</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="#">Exchanges</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="#">Watchlist</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="#">NFT</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="#">Portfolio</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="#">Products</a>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="btn
                                    btn-outline-primary btn-md px-5 py-3 mb-2
                                    mb-xl-0 rounded-pill">Log
                                    In</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/sign-up" className="btn btn-primary
                                    btn-md
                                    px-5 py-3 mb-2 mb-xl-0 rounded-pill">Sign Up</Link>
                            </li>
                        </ul>

                    </div>

                </div>
            </nav>
        </>
  )
}

export default Navbar