import { useStoreState } from 'easy-peasy';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Playlists from '../components/playlists';
import Empty from '../components/ui/empty';

const Favorites = ({ startPageLoadingHandler, stopPageLoadingHandler }) => {
    const { data: playlists } = useStoreState((states) => states.playlist);
    const { items: favoritePlaylistItems } = useStoreState(
        (states) => states.favoritePlaylist
    );

    const [state, setState] = useState([]);

    useEffect(() => {
        startPageLoadingHandler();
        setState(
            favoritePlaylistItems.map((playlistId) => playlists[playlistId])
        );
        stopPageLoadingHandler();
    }, [favoritePlaylistItems]);

    return favoritePlaylistItems.length > 0 ? (
        <Playlists playlistsArr={state} deletable={false} />
    ) : (
        <Empty />
    );
};

Favorites.propTypes = {
    startPageLoadingHandler: PropTypes.func.isRequired,
    stopPageLoadingHandler: PropTypes.func.isRequired,
};

export default Favorites;
