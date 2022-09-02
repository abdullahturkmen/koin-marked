import React from 'react'
import Navbar from '../../layouts/Navbar';
import Footer from '../../layouts/Footer';
import {useEffect, useState} from 'react';
import {TabTitle} from '../../utils/functions';
import {db, collection, getDocs} from '../../utils/firebase';
import Swal from 'sweetalert2';

const Login = () => {  const [userList , setUserList] = useState([]);

    const doLogin = (event) => { 
        event.preventDefault();

        var {
            email,
            password
        } = document.forms[0];

        const userData = userList.find((user) => user.email === email.value);

        // Compare user info
        if (userData) {
          if (userData.password !== password.value) {
            // Invalid password
            Swal.fire({
                title: 'Error!',
                text: 'Invalid password',
                icon: 'error',
                confirmButtonText: 'OK'
              })
          } else {
           // Success
          Swal.fire({
            title: 'Success!',
            text: 'Login successful',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          }
        } else {
          // Username not found
          Swal.fire({
            title: 'Error!',
            text: 'Username not found',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
    };

    async function getUsersData(db) {
        const usersCol = collection(db, 'users');
        const userSnapshot = await getDocs(usersCol);
        const userList = userSnapshot.docs.map(doc => doc.data());
        setUserList(userList);
    }


    useEffect(() => {

        getUsersData(db);

    }, []);


    TabTitle(`Login | ${
        process.env.REACT_APP_TITLE
    }`)
    return (
        <>

            <header className="header header--colored-bg container-fluid py-5">

                <Navbar/>


            </header>

            <main className="container-fluid">

                <div className="container col-12 col-md-8 col-lg-6 col-xl-4 px-4 py-5">
                    <form className="py-4 form-template"
                        onSubmit={doLogin}>
                        <div className="row my-4">
                            <div className="col-12">
                                <div className="input-border">
                                    <label className="input-group-text" htmlFor="email">E-mail</label>
                                    <input type="email" name="email" className="form-control form-template-input" id="email" placeholder="address@example.com" defaultValue="" required=""/>
                                </div>
                            </div>

                        </div>
                        <div className="row my-4">
                            <div className="col-12">
                                <div className="input-border">
                                    <label className="input-group-text" htmlFor="password">Password</label>
                                    <input type="password" name="password" className="form-control form-template-input" id="password" placeholder="•••••••" defaultValue="" required=""/>
                                </div>
                            </div>

                        </div>

                        <button className="w-100 btn btn-md btn-primary rounded-pill px-5 py-3" type="submit">Login</button>

                    </form>
                </div>

            </main>


            <Footer/>
        </>
    )
}

export default Login
