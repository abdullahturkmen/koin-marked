import React from 'react'
import logo from '../../assets/img/logo.svg'

const Navbar = () => {
  return (
    <>
     <nav className="navbar navbar-light navbar-expand-xl">
                <div className="container">
                    <a className="navbar-brand" href="index.html"> <img
                            src={logo} className="d-block
                            mx-lg-auto img-fluid" /></a>
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
                                <a className="nav-link text-dark"
                                    aria-current="page"
                                    href="#">Crytocurrency</a>
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
                                <a href="login.html" className="btn
                                    btn-outline-primary btn-md px-5 py-3 mb-2
                                    mb-xl-0 rounded-pill">Log
                                    In</a>
                            </li>
                            <li className="nav-item">
                                <a href="sign-up.html" className="btn btn-primary
                                    btn-md
                                    px-5 py-3 mb-2 mb-xl-0 rounded-pill">Sign Up</a>
                            </li>
                        </ul>

                    </div>

                </div>
            </nav>
        </>
  )
}

export default Navbar