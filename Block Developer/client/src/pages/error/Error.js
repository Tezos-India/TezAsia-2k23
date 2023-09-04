import React from 'react'
import Err from '../../logo.svg'

function Error(props) {
    return (
        <section id="learn" className="p-sm-5 py-5">
        <div className="container">
            <div className="row align-items-center justify-content-between">
                <div className="col-md">
                    <img src={Err} className="img-fluid" alt="" />
                </div>
                <div className="col-md p-5">
                    <h2>404</h2>
                    <p className="lead">
                       Page Not Found
                    </p>
                    <p>
                    Are you sure this was the link cause nothing was found here !!
                    </p>
                    <a href="/" className="btn btn-light mt-3">
                        <i className="bi bi-chevron-right"></i>Go Back Home
                    </a>
                </div>
            </div>
        </div>
    </section>
    )
}


export default Error

