import { Divider } from '@mui/material';
import { useStoreState } from 'easy-peasy';
import PropTypes from 'prop-types';
import Playlists from '../components/playlists';
import RecentPlaylists from '../components/recent-playlists';
import EmptyPlaylist from '../components/ui/empty-playlist';
import { mapObjectToArray } from '../utils/object-array-mapper';

const Homepage = ({ handleAddPlaylistModalOpen }) => {
    const { data: playlistData } = useStoreState((states) => states.playlist);

    return Object.keys(playlistData).length > 0 ? (
        <>
            <RecentPlaylists />
            <Divider />
            <Playlists playlistsArr={mapObjectToArray(playlistData)} />
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
