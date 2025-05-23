function Education() {
    return ( 
        <div className="container-xl mt-5">
            <div className="row align-items-center justify-content-center">
                <div className="col-md-6 col-12 mt-3">
                    <img src="media/images/education.svg" style={{width:"90%"}} />
                </div>
                <div className="col-md-6 col-12 mt-3">
                    <h1 className="mb-3 fs-2">Free and open market education</h1>
                    <p>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                    <a href="" className="m-3" style={{ textDecoration: "none" }}>
                        See Pricing <i className="fa-solid fa-arrow-right"></i>
                    </a>

                    <p>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                    <a href="" className="m-3" style={{ textDecoration: "none" }}>
                        TradingQ&A <i className="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
     );
}

export default Education;