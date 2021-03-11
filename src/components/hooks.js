import { useEffect, useState } from 'react';

export function GetData(items, endpointFn, mapperFunction){
    const [entries, setEntries] = useState([]);
    useEffect(() => {
        async function callData(){
          try {
              const d = await Promise.all(items.map(item =>
                  fetch(endpointFn(item))
                      .then((data) => data.json())))
              setEntries(d.map(mapperFunction));
          } catch(err){
              console.error(err);
          }
        }
        callData();
    });
    return entries;
}
