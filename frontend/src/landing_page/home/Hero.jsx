function Hero() {
    return ( 
        <div className="container p-5 text-center mb-5">
            <div className="row">
                    <img src="media/images/homeHero.png" alt="homeHero" className="mb-5"/>
                    <h1 className="mt-5">Invest In Everything</h1>
                    <p>Online platform to invest in stocks, derivatives ,mutual funds and more</p>
                    <button className="p-2 btn btn-primary fs-5" style={{width:"20%", margin:"0 auto"}}>Signup Now</button>
            </div>
        </div>
     );
}

export default Hero;