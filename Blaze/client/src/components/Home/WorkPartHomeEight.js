import React from "react";
import workThumb from "../../assets/images/how-it-work-thumb.png";

function WorkPartHomeEight() {
  return (
    <>
      <div className="appie-how-it-work-area pt-10 pb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="how-it-work-thumb text-center">
                <img src={workThumb} alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="appie-how-it-work-content">
                <h2 className="title">How to Vote</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor
                </p>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="how-it-work-box">
                      <span>1</span>
                      <h5 className="title">
                        Open the <br />
                        app
                      </h5>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="how-it-work-box">
                      <span>2</span>
                      <h5 className="title">
                        Connect to <br />
                        your account Wallet
                      </h5>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="how-it-work-box">
                      <span>3</span>
                      <h5 className="title">
                        Register <br />
                        Yourself as a Voter
                      </h5>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="how-it-work-box">
                      <span>4</span>
                      <h5 className="title">
                        Vote for <br />
                        your Candidate
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkPartHomeEight;
