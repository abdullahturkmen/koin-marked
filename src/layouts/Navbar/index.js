import React from 'react'
import {Link} from "react-router-dom";
import logo from 'assets/img/logo.svg';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from 'firebase-config';
import {logout as logoutHandle} from 'store/auth';

const Navbar = () => {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth)

    const handleLogout = async () => {
        await logout();
        dispatch(logoutHandle())
    }

    return (
        <>
            <nav className="navbar navbar-light navbar-expand-xl">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <img src={logo}
                            className="d-block
                                                                                                                                                                                                                                                                                                                                                            mx-lg-auto img-fluid"/></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0 w-100
                                                                                                                                                                                                                                                                                                                                                            justify-content-evenly align-items-center">
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/currency-list">Cryptocurrency</Link>
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


                            {
                            user ? (
                                <>
                                    <li className="nav-item" data-bs-toggle="modal" data-bs-target="#userNavbar">
                                        <a className="btn btn-outline-primary btn-md rounded-pill p-3 dropdown-toggle">
                                            {
                                            user.displayName || user.email
                                        }</a>
                                    </li>


                                    <div className="modal fade" id="userNavbar" tabindex="-1" aria-labelledby="userNavbarLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-sm">
                                            <div className="modal-content radius-corner">

                                                <div className="modal-body">
                                                    <ul class="list-group list-group-flush">
                                                        <li class="list-group-item">
                                                            <a data-bs-dismiss="modal" className="btn btn-sm w-100">Dashboard</a>
                                                        </li>
                                                        <li class="list-group-item">
                                                            <a data-bs-dismiss="modal" className="btn btn-sm w-100">Wallet</a>
                                                        </li>
                                                        <li class="list-group-item">
                                                            <a data-bs-dismiss="modal" className="btn btn-sm w-100">Settings</a>
                                                        </li>
                                                        <li class="list-group-item">
                                                            <a data-bs-dismiss="modal" className="btn btn-sm w-100"
                                                                onClick={handleLogout}>Log Out</a>
                                                        </li>
                                                    </ul>

                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </>
                            ) : (
                                <>
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
                                </>

                            )
                        } </ul>

                    </div>

                </div>

            </nav>
        </>
    )
}

export default Navbar
