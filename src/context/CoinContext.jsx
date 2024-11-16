import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CoinContext=createContext();

const CoinContextProvider=(props)=>{

    const [allCoin,setAllCoin]=useState([]);

    const [currency,setCurrency]=useState({
        name:"usd",
        symbol:"$"
    })

    const fetchAllCoin=async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-LkG7rWjHbDJ2HJMV5Kh8r3td'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(res => res.json())
            .then(res => setAllCoin(res))
            .catch(err => console.error(err));

    }

    useEffect(()=>{
        fetchAllCoin();
    },[currency.symbol])
     
    const contextValue={
        allCoin,
        currency,
        setCurrency
    }

    return(
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )

}

export default CoinContextProvider;