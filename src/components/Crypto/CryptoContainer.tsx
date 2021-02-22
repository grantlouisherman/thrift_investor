import { useEffect, useState } from 'react';
import { IonList} from "@ionic/react";
import './CryptoContainer.css';

interface ContainerProps { }
const COINS = [
    "bitcoin",
    "bitcoin-cash",
    "ethereum",
    "litecoin",
    "algorand",
    "ripple",
    "binancecoin",
    "stellar",
    "chainlink",
    "cardano",
    "tether",
    "polkadot"
]
const CryptoContainer: React.FC<ContainerProps> = () => {
    const [ coinPrices, setCoinPrices ] = useState([]);
    useEffect(() => {
        Promise.all(COINS.map(coin => fetch(
            `https://api.coingecko.com/api/v3/coins/${coin}`
        ).then(data => data.json())))
            .then((d: any) => {
                console.log(d)
                setCoinPrices(d.map((coin: any) => {
                    const { name, tickers } = coin;
                    const { volume, last } = tickers.find((tickerInfo: any) => tickerInfo.target === 'USD');
                    return { name, volume, last };
                }))
            });
    }, []);
    if(!coinPrices.length) return null;
    return (
        <div>
            <IonList>
                { coinPrices.map(({ name, volume, last }) => (
                        <div className="cryptoContainer">
                            <div>Coin</div>
                            <h4>{name}</h4>
                            <div>Price</div>
                            <h4>{last}</h4>
                            <div>Volume</div>
                            <h4>{volume}</h4>
                        </div>
                ))}
            </IonList>
        </div>
    );
};

export default CryptoContainer;
