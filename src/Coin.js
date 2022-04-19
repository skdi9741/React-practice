import { number } from "prop-types";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then( (response) => response.json()) 
    .then( (json) => {
      setCoins(json);
      setLoading(false);
    })  
  }, []);
  const onChange = (event) => {
    setMoney(event.target.value)
  }
  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      <input type="number" onChange={onChange}></input>
      {loading ? <strong>Loading...</strong> : null}
      <ul>
        {coins.map((coin) => coin.rank < 30 ? 
        <li key={coin.id}>{coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD <strong>{ Math.round(money / coin.quotes.USD.price)}</strong></li> 
        //{money > 0 ? number(coin.quotes.USD.price) / number(money) : null }
        : null
        )}
      </ul>
    </div>
  );
}

export default App;
