import { IonList, IonSpinner, IonContent } from "@ionic/react";

import { GetData } from "../hooks";
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
];
const coinMapper = (coin:any) => {
    const { name, tickers } = coin;
    const { volume, last } = tickers.find((tickerInfo: any) => tickerInfo.target === 'USD');
    return { name, volume, last };
}

const endPointCreator = (coin: string) => `https://api.coingecko.com/api/v3/coins/${coin}`;
const CryptoContainer: React.FC<ContainerProps> = () => {
    const coinPrices = GetData(COINS, endPointCreator, coinMapper);
    if(!coinPrices.length) return(
        <IonContent>
            <IonSpinner/>
        </IonContent>
    );
    return (
        <div>
            <IonList>
                { coinPrices.map(({ name, volume, last }) => (
                        <div className="cryptoContainer" key={name}>
                            <h4>{name}</h4>
                            <h4>{last}</h4>
                            <h4>{volume}</h4>
                        </div>
                ))}
            </IonList>
        </div>
    );
};

export default CryptoContainer;
