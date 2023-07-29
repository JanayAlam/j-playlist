import PropTypes from 'prop-types';
import PlaylistItem from './PlaylistItem';

const Playlists = ({ playlistsArr = [] }) => {
    return playlistsArr.map((item) => (
        <PlaylistItem key={item.playlistId} item={item} />
    ));
};

Playlists.propTypes = {
    playlistsArr: PropTypes.array.isRequired,
};

export default Playlists;
