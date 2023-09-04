import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom"
 
function Footer() {
  return (
    <footer className=" text-white pt-5 pb-4 mx-3">

	<div className="fluid-container text-center text-md-start">

		<div className="row align-items-center mx-3">

			<div className="col-md-7 col-lg-8">
				<p>	Copyright ©2021 All rights reserved by:
					<a href="#" style={{ textDecoration: "none"}}>
						<strong style={{color: "#ff1744"}} > The Blitzkreig</strong>
					</a></p>
			</div>

			<div className="col-md-5 col-lg-4">
				<div className="text-center text-md-end">

                <ul className="list-unstyled list-inline">
						<li className="list-inline-item">
							<Link to="/game" className="btn-floating btn-sm text-white" style={{fontSize: "23px"}}><i className="fas fa-gamepad"></i></Link>
						</li>
						<li className="list-inline-item">
							<Link to="/leaderboard" className="btn-floating btn-sm text-white" style={{fontSize: "23px"}}><i className="fas fa-chart-bar"></i></Link>
						</li>
						<li className="list-inline-item">
							<Link to="/market" className="btn-floating btn-sm text-white" style={{fontSize: "23px"}}><i className="fas fa-shopping-cart"></i></Link>
						</li>
						<li className="list-inline-item">
							<Link to="#" className="btn-floating btn-sm text-white" style={{fontSize: "23px"}}><i className="fab fa-app-store-ios"></i></Link>
						</li>
						<li className="list-inline-item">
							<Link to="/faq" className="btn-floating btn-sm text-white" style={{fontSize: "23px"}}><i className="fas fa-question-circle"></i></Link>
						</li>
					</ul>
					
				</div>
				
			</div>
			
		</div>

	</div>
	
</footer>
  );
}

export default Footer;
