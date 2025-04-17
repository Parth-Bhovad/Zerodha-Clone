import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid) => {},
  closeSellWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [price, setPrice] = useState(0.0);

  const handleOpenBuyWindow = (uid, price) => {
    console.log("Opening buy window for:", uid, price);
    
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    setPrice(price);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setPrice(0.0);
  };

  const handleOpenSellWindow = (uid, price) => {
    console.log("Opening sell window for:", uid, price);
    
    setIsSellWindowOpen(true);
    setSelectedStockUID(uid);
    setPrice(price);
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
    setPrice(0.0);
  }

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} price={price} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} price={price} />} {/* Replace with SellActionWindow */}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;