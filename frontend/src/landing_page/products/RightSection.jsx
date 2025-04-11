function RightSection({imageUrl, productName, productDescription, link, linkText}) {
    return ( 
        <div className="container border-top mt-5">
            <div className="row">
                <div className="col-6 p-5 mt-5">
                    <h1>{productName}</h1>
                    <p>{productDescription}</p>
                    <div className="mb-4">
                        <a href={link} style={{textDecoration:"none"}}>{linkText} <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>

                <div className="col-6 p-5">
                    <img src={imageUrl} />
                </div>
            </div>
        </div>
     );
}

export default RightSection;