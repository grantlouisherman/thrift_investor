import { IonList, IonSpinner, IonContent } from "@ionic/react";
import { useEffect } from 'react';

import { BEARER_TOKEN } from './secrets.json';

import { GetData } from "../hooks";

interface ContainerProps { }

const token = BEARER_TOKEN;
const TwitterAccounts = [
   'trengriffin',
   'awealthofcs',
   'ReformedBroker',
   'michaelbatnick',
   'Wu_Tang_Finance',
   'Stalingrad_Poor',
].join(',').substring(0, 5);
const endpointUrl = encodeURI('https://api.twitter.com/2/users/by?user.fields=&usernames=trengriffin,awealthofcs,ReformedBroker,michaelbatnick,Wu_Tang_Finance&tweet.fields=author_id,created_at');
const TwitterContainer: React.FC<ContainerProps> = () => {
   useEffect( () => {
      fetch(endpointUrl, {
         headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${token}`
         },
         mode: 'cors',
      }).then(res => res.json())
          .then(console.log)
          .catch(console.error);

   }, []);
   return (<div></div>)
};

export default TwitterContainer;
