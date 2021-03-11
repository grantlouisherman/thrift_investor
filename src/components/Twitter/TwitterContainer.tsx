import { IonList, IonItem, IonContent, IonLabel, IonText } from "@ionic/react";
import { useEffect, useState, Fragment } from "react";
import { GetData } from "../hooks";

interface ContainerProps {}

const endpointUrl = "http://localhost:3000/twitter";
const TwitterContainer: React.FC<ContainerProps> = () => {
  const [twitterData, setTwitterData] = useState({});
  useEffect(() => {
    fetch(endpointUrl, {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((tweets) => {
        setTwitterData(tweets);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      {Object.keys(twitterData).map((key) => {
        const { data } = twitterData[key];
        return (
          <IonList>
          <IonItem>
            <IonLabel>{key}</IonLabel>
            {data
              .slice(0, 1)
              .map((d) => <IonLabel key={d.id}><IonText>{d.text}</IonText></IonLabel>)}
          </IonItem>
          </IonList>
        );
      })}
    </>
  );
};

export default TwitterContainer;
/*

// {Object.keys(twitterData).length && Object.keys(twitterData).map(key => (
//   <Fragment>
//     <div>{key}</div>
//     <div>{twitterData[key]["data"]}</div>
//   </Fragment>
// ))}
*/
