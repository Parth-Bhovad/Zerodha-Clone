function Team() {
  return (
    <div className="container-xl mb-5 border-bottom">
      <div className="row">
        <div className="row border-top">
        <h1 className="text-center">People</h1>
        </div>
        <div className="col-md-6 col-12 text-center">
          <img src="\media\images\nithinKamath.jpg" alt="ceo" style={{borderRadius:"100%", width:"45%"}}/>
          <h4 className="mt-5">Nithin Kamath</h4>
          <h6>Founder, CEO</h6>
        </div>
        <div className="col-md-6 col-12 text-center">
          <p className="text-muted">
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p className="text-muted">
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p className="text-muted">Playing basketball is his zen.</p>
          <p className="text-muted">Connect on Homepage / TradingQnA / Twitter</p>
        </div>
      </div>
    </div>
  );
}

export default Team;
