import { useStoreState } from 'easy-peasy';
import { useState } from 'react';
import Playlists from '../components/playlists';

const mapObjectToArray = (obj, filter = '') => {
    const arr = [];
    if (Object.keys(obj).length === 0) return arr;
    Object.keys(obj).forEach((key) => {
        if (filter === 'favorite') {
            if (obj[key].isFavorite) arr.push(obj[key]);
        } else {
            arr.push(obj[key]);
        }
    });
    return arr;
};

const Homepage = () => {
    const [state, setState] = useState('playlists');
    const { data: playlistData } = useStoreState((states) => states.playlist);

    return (
        <div>
            <div>
                <button onClick={() => setState('playlists')}>Playlist</button>
                <button onClick={() => setState('favorite')}>Favorite</button>
            </div>
            <Playlists
                playlistsArr={mapObjectToArray(
                    playlistData,
                    state === 'favorite' && 'favorite'
                )}
            />
        </div>
    );
};

export default Homepage;
