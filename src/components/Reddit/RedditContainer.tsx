import { useEffect, useState } from 'react';
import {IonContent, IonItem, IonLabel, IonList, IonSpinner} from '@ionic/react';

import { GetData } from '../hooks';

import './RedditContainer.css';

interface ContainerProps { }
const INVESTING_REDDIT_SUBTHREADS = [
    "CryptoCurrency",
    "CryptoMarkets",
    "Investing",
    "news",
    "wallstreetbets",
    "SecurityAnalysis",
];
const cleanUpReturnRedditObject = (item: any) => {
    const { data: { children }} = item;
    const { data: { title, permalink, subreddit }} = children.shift();
    return { title, link: `https://www.reddit.com/${permalink}`, subreddit};
}

const endPointCreator = (subreddit: string) => `https://www.reddit.com/r/${subreddit}/top/.json?limit=1`;

const RedditContainer: React.FC<ContainerProps> = () => {
    const redditNewsItems = GetData(INVESTING_REDDIT_SUBTHREADS, endPointCreator, cleanUpReturnRedditObject);
    if(!redditNewsItems){
        return (
            <IonContent>
                <IonSpinner/>
            </IonContent>
        )
    }
    return (
        <div>
            <IonList>
                { redditNewsItems.map(({ link, title, subreddit }) => (
                    <IonItem href={link}>
                        <IonLabel>{subreddit}</IonLabel>
                        <IonLabel>{title}</IonLabel>
                    </IonItem>
                ))}
            </IonList>
        </div>
    );
};

export default RedditContainer;
