function LeftSection({ imageUrl, productName, productDescription, tryDemo, learnMore, googlePlay, appStore }) {
    return (
        <div className="container-xl border-top mt-5">
            <div className="row align-items-center justify-content-center">
                <div className="col-md-6 col-12 d-flex align-items-center justify-content-center">
                    <img src={imageUrl} width={"90%"} />
                </div>
                <div className="col-md-6 col-12 mt-5 ">
                    <h1>{productName}</h1>
                    <p>{productDescription}</p>
                    <div className="mb-4">
                        <a href={tryDemo} style={{textDecoration:"none"}}>Try Demo <i className="fa-solid fa-arrow-right"></i></a>
                        <a href={learnMore} style={{marginLeft:"3rem", textDecoration:"none"}}>Learn More <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                    <div>
                        <a href={googlePlay}><img src="media/images/googlePlayBadge.svg" /></a>
                        <a href={appStore} style={{marginLeft:"1rem"}}><img src="media/images/appstoreBadge.svg" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftSection;