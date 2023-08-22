import PropTypes from 'prop-types';
import PlaylistItem from './PlaylistItem';

const Playlists = ({ playlistsArr = [], deletable = true }) => {
    return playlistsArr.map((data) => (
        <PlaylistItem key={data.playlistId} data={data} deletable={deletable} />
    ));
};

Playlists.propTypes = {
    playlistsArr: PropTypes.array.isRequired,
    deletable: PropTypes.bool,
};

export default Playlists;
