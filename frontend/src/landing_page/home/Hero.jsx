function Hero() {
    return (
        <div className="container-xl p-5 text-center mb-5">
            <div className="row align-items-center justify-content-center">
                <img src="media/images/homeHero.png" alt="homeHero" className="mb-5" />
                <h1 className="mt-5">Invest In Everything</h1>
                <p>Online platform to invest in stocks, derivatives ,mutual funds and more</p>
                <div className="col-auto">
                    <button className="p-2 btn btn-primary fs-5">Signup for free</button>
                </div>
            </div>
        </div>
    );
}

export default Hero;