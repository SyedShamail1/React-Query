import React, {useState} from 'react';
import { useQuery  } from 'react-query';
import Planet from './planet.jsx';

const Planets = () => {
    const [ page, setPage ] = useState(1);
    const { data, status } = useQuery(['planets', page], async () => {
        const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
        return res.json();
    });

    return (
        <div>
            <h2>Planets</h2>

            {status === 'loading' && (
                <div>Loading data...</div>
            )}

            {status === 'error' && (
                <div>Error fetching data</div>
            )}

            {status === 'success' && (
                <>
                <button 
                  onClick={() => setPage(old => Math.max(old - 1, 1))} 
                  disabled={page === 1}>
                  Previous Page
                </button>
                <span>{ page }</span>
                <button 
                  onClick={() => setPage(old => (!data || !data.next ? old : old + 1))} 
                  disabled={!data.next || !data.next}>
                  Next page
                </button>
                <div>
                  { data.results.map(planet => <Planet key={planet.name} planet={planet} /> ) }
                </div>
              </>
            )}
        </div>
    );
}

export default Planets;