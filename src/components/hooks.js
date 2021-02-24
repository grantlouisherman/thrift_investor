import { useEffect, useState } from 'react';

export function GetData(items, endpointFn, mapperFunction){
    const [entries, setEntries] = useState([]);
    useEffect(() => {
        Promise.all(items.map(item =>
            fetch(endpointFn(item))
                .then((data) => data.json())))
            .then((d) => {
                setEntries(d.map(mapperFunction));
            })
    }, []);
    return entries;
}
