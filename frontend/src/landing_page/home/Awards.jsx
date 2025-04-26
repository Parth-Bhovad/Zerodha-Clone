function Awards() {
    return (
        <div className="container-xl mt-5 mb-5">
            <div className="row align-items-center">
                <div className="col-md-6 col-12 p-5">
                    <img src="media/images/largestBroker.svg" alt="" style={{width:"90%"}}/>
                </div>
                <div className="col-md-6 col-12 p-5">
                    <h1>Largest stock broker in India</h1>
                    <p>2+ million Zerodha clients contribute to over 15% of all retail order volumes in India daily by trading and investing in:</p>
                    <div className="row">
                        <div className="col-6">
                            <ul>
                                <li>Futures and Options</li>
                                <li>Commodity derivatives</li>
                                <li>Currency derivatives</li>
                            </ul>
                        </div>
                        <div className="col-6">
                            <ul>
                                <li>Stocks & IPOs</li>
                                <li>Direct mutual funds</li>
                                <li>Bonds and Govt. Securities</li>
                            </ul>
                        </div>
                    </div>
                    <img src="media/images/pressLogos.png" alt="" style={{width:"90%"}}/>
                </div>
            </div>
        </div>
    );
}

export default Awards;