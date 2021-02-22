import { useEffect, useState } from 'react';
import {IonItem, IonLabel, IonList} from '@ionic/react';

import './RedditContainer.css';

interface ContainerProps { }
const INVESTING_REDDIT_SUBTHREADS = [
    "CryptoCurrency",
    "CryptoMarkets",
    "Investing",
    "news",
    "wallstreetbets",
];
const cleanUpReturnRedditObject = (item: any) => {
    const { data: { children }} = item;
    const { data: { title, permalink, subreddit }} = children.shift();
    return { title, link: `https://www.reddit.com/${permalink}`, subreddit};
}
const RedditContainer: React.FC<ContainerProps> = () => {
    const [ redditNewsItems, setRedditNewsItems ] = useState([]);
    useEffect(() => {
        Promise.all(INVESTING_REDDIT_SUBTHREADS.map(subreddit =>
            fetch(`https://www.reddit.com/r/${subreddit}/top/.json?limit=1`)
            .then((data) => data.json())))
            .then((d:any) => {
                setRedditNewsItems(d.map(cleanUpReturnRedditObject));
            })

    }, []);
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
