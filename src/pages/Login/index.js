import React from 'react'
import Navbar from '../../layouts/Navbar';
import Footer from '../../layouts/Footer';


const Login = () => {
  return (
    <>
    
    <header className="header header--colored-bg container-fluid py-5">

<Navbar/>


</header>

<main className="container-fluid">

<div className="container col-12 col-md-8 col-lg-6 col-xl-4 px-4 py-5">
    <form className="py-4 form-template">
        <div className="row my-4">
            <div className="col-12">
                <div className="input-border">
                    <label className="input-group-text" for="email">E-mail</label>
                    <input type="email" className="form-control
                        form-template-input" id="email"
                        placeholder="address@example.com" value=""
                        required=""/>
                </div>
            </div>

        </div>
        <div className="row my-4">
            <div className="col-12">
                <div className="input-border">
                    <label className="input-group-text" for="password">Password</label>
                    <input type="password" className="form-control
                        form-template-input" id="password"
                        placeholder="•••••••" value=""
                        required=""/>
                </div>
            </div>

        </div>

        <button className="w-100 btn btn-md btn-primary
            rounded-pill px-5 py-3"
            type="submit">Login</button>

    </form>
</div>

</main>


<Footer/>
    </>
  )
}

export default Login