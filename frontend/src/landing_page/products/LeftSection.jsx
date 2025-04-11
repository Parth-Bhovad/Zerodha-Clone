function LeftSection({ imageUrl, productName, productDescription, tryDemo, learnMore, googlePlay, appStore }) {
    return (
        <div className="container border-top mt-5">
            <div className="row">
                <div className="col-6 p-5">
                    <img src={imageUrl} />
                </div>
                <div className="col-6 p-5 mt-5">
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