import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
        <>
            <Box sx={{ my: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                    onClick={() => setState('playlists')}
                    variant={state === 'favorite' ? '' : 'outlined'}
                    color="primary"
                >
                    <PlaylistPlayIcon sx={{ mr: 1 }} /> Playlists
                </Button>
                <Button
                    onClick={() => setState('favorite')}
                    variant={state === 'favorite' ? 'outlined' : ''}
                    color="primary"
                >
                    <StarIcon sx={{ mr: 1 }} /> Favorites
                </Button>
            </Box>
            <Playlists
                playlistsArr={mapObjectToArray(
                    playlistData,
                    state === 'favorite' && 'favorite'
                )}
            />
        </>
    );
};

export default Homepage;
