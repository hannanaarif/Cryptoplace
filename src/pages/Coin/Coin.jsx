import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart.jsx';
const Coin = () => {

  const {coinId}=useParams();
  const [coinData,setCoinData]=useState();
  const [historicalData,setHistoricalData]=useState('');
  const {currency}=useContext(CoinContext);




  const fetchCoinData=async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-LkG7rWjHbDJ2HJMV5Kh8r3td'}
    };
    console.log(currency);
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => res.json())
      .then(res => setCoinData(res))
      .catch(err => console.error(err));

  }

  const fetchHistoricaldata=()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-LkG7rWjHbDJ2HJMV5Kh8r3td'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  }

  useEffect(()=>{
    fetchCoinData();
    fetchHistoricaldata();
  },[currency]);
  




if(coinData && historicalData){
  return (
    <div className='coin'>
      <div className="coin-name">
        <img src={coinData.image.large} alt='coin image'/>
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>
      <div className='coin-chart'>
        <LineChart historicalData={historicalData}/>
      </div>
      <div className='coin-info'>
        <ul>
          <li>Crypto market rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          {/* <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li> */}
          {currency.symbol} {coinData.market_data.current_price[currency.name] 
    ? coinData.market_data.current_price[currency.name].toLocaleString()
    : 'Loading...'}
        </ul>

        <ul>
          <li>Market cap</li>
          <li>{currency.symbol} {coinData.market_data.market_cap[currency.name] 
                        ? coinData.market_data.market_cap[currency.name].toLocaleString()
                        : 'Loading...'}
          </li>
        </ul>

        <ul>
          <li>24 Hour high</li>
          <li>{currency.symbol} {coinData.market_data.high_24h[currency.name] 
                        ? coinData.market_data.high_24h[currency.name].toLocaleString()
                        : 'Loading...'}
          </li>
        </ul>

        <ul>
          <li>24 Hour low</li>
          <li>{currency.symbol} {coinData.market_data.low_24h[currency.name] 
                        ? coinData.market_data.low_24h[currency.name].toLocaleString()
                        : 'Loading...'}
          </li>
        </ul>
        




      </div>
    </div>
  )
 } 
 else{
  return(
    <div className='spinner'>
    <div className="spin">

    </div>
  </div>
  )
 }
}

export default Coin
