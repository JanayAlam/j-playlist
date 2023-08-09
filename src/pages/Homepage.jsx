import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useStoreState } from 'easy-peasy';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Playlists from '../components/playlists';
import RecentPlaylists from '../components/recent-playlists';
import EmptyPlaylist from '../components/ui/empty-playlist';

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

const Homepage = ({ handleAddPlaylistModalOpen }) => {
    const [state, setState] = useState('playlists');
    const { data: playlistData } = useStoreState((states) => states.playlist);
    const navigate = useNavigate();

    /**
     * Navigate to the selected playlist details page,
     * @param {String} playlistId The selected playlist id
     */
    const viewPlaylistHandler = (playlistId) => {
        navigate(`/playlist/${playlistId}`);
    };

    return Object.keys(playlistData).length > 0 ? (
        <>
            <RecentPlaylists viewPlaylistHandler={viewPlaylistHandler} />
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
                viewPlaylistHandler={viewPlaylistHandler}
            />
        </>
    ) : (
        <EmptyPlaylist
            handleAddPlaylistModalOpen={handleAddPlaylistModalOpen}
        />
    );
};

Homepage.propTypes = {
    handleAddPlaylistModalOpen: PropTypes.func.isRequired,
};

export default Homepage;
