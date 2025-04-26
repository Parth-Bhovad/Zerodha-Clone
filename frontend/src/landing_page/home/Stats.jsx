function Stats() {
    return ( 
       <div className="container-xl">
        <div className="row align-items-center justify-content-center">
            <div className="col-md-6 col-12">
                <h1 className="fs-2 mb-5">Trust with confidence</h1>

                <h2 className="fs-4">Customer-first always</h2>
                <p className="text-muted">That's why 1.5+ crore customers trust Zerodha with ₹4.5+ lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.</p>

                <h2 className="fs-4">No spam or gimmickss</h2>
                <p className="text-muted">No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like.</p>

                <h2 className="fs-4">The Zerodha universe</h2>
                <p className="text-muted">Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>

                <h2 className="fs-4">Do better with money</h2>
                <p className="text-muted">With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.</p>
            </div>
            <div className="col-md-6 col-12">
                <img src="media/images/ecosystem.png" alt="" style={{width:"90%"}}/>
                <div className="text-center  p-5">
                    <a href="" className="m-3" style={{textDecoration:"none"}}>Explore our products <i className="fa-solid fa-arrow-right"></i></a>
                    <a href="" className="m-3" style={{textDecoration:"none"}}>Try Kite demo <i className="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
       </div>
     );
}

export default Stats;