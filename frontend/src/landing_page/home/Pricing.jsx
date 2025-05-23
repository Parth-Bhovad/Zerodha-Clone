function Pricing() {
    return (
        <div className="container-xl mb-5">
            <div className="row mb-1">
                <div className="col-md-5 col-12">
                    <h1 className="mb-3 fs-2">Unbeatable Pricing</h1>
                    <p>
                        We pioneered the concept of discount broking and price transparency
                        in India. Flat fees and no hidden charges.
                    </p>
                </div>
                <div className="col-md-7 col-12">
                    <div className="row text-center">
                        <div className="col p-3 border">
                            <h1 className="mb-3">₹0</h1>
                            <p>Free equity delivery and<br/>direct mutual funds</p>
                        </div>
                        <div className="col p-3 border">
                            <h1 className="mb-3">₹20</h1>
                            <p>Intraday and F&O</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                <a href="" className="m-3" style={{ textDecoration: "none" }}>
                        See Pricing <i className="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}
export default Pricing;