function RightSection({imageUrl, productName, productDescription, link, linkText}) {
    return ( 
        <div className="container-xl border-top mt-5">
            <div className="row align-items-center justify-content-center">
                <div className="col-md-6 col-12 mt-5">
                    <h1>{productName}</h1>
                    <p>{productDescription}</p>
                    <div className="mb-4">
                        <a href={link} style={{textDecoration:"none"}}>{linkText} <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>

                <div className="col-md-6 col-12 d-flex align-items-center justify-content-center">
                    <img src={imageUrl} width={"90%"}/>
                </div>
            </div>
        </div>
     );
}

export default RightSection;