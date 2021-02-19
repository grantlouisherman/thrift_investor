import { useEffect, useState } from 'react';
import {IonItem, IonLabel, IonList} from "@ionic/react";

interface ContainerProps { }
const COINS = [
    "BTC",
    "ETH",
    "BNB",
    "USDT",
    "DOT",
    "ADA",
    "XRP",
    "LTC",
    "LINK",
    "BCH",
    "XLM"
]
const createTodaysDate = () => {
    const todaysDate = new Date();
    let month = todaysDate.getUTCMonth() + 1 >= 10 ? todaysDate.getUTCMonth() : `0${todaysDate.getUTCMonth()+1}`;
    let day = todaysDate.getUTCDate() >= 10 ? todaysDate.getUTCDate() : `0${todaysDate.getUTCDate()}`;
    let year = todaysDate.getUTCFullYear();
    return `${year}-${month}-${day}`;
}
const cleanUpCryptoData = (coinData: any) => {
    const { symbol, close } = coinData;
    return { symbol, close };
}
const CryptoContainer: React.FC<ContainerProps> = () => {
    const [ coinPrices, setCoinPrices ] = useState([]);
    useEffect(() => {
        Promise.all(COINS.map(coin => fetch(
            `https://api.polygon.io/v1/open-close/crypto/${coin}/USD/${createTodaysDate()}?unadjusted=true&apiKey=KEY`
        ).then(data => data.json())
            .then((d: any) => {
                if(d.status === 'Error') setCoinPrices([])
                else setCoinPrices(d.map(cleanUpCryptoData));
            })));
    }, []);
    if(!coinPrices.length) return null;
    return (
        <div className="container">
            <IonList>
                { coinPrices.map(({ symbol, close }) => (
                    <IonItem>
                        <IonLabel>{symbol}</IonLabel>
                        <IonLabel>{close}</IonLabel>
                    </IonItem>
                ))}
            </IonList>
        </div>
    );
};

export default CryptoContainer;
