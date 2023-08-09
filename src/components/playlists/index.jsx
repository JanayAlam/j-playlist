import PropTypes from 'prop-types';
import PlaylistItem from './PlaylistItem';

const Playlists = ({ playlistsArr = [], viewPlaylistHandler }) => {
    return playlistsArr.map((data) => (
        <PlaylistItem
            key={data.playlistId}
            data={data}
            viewPlaylistHandler={viewPlaylistHandler}
        />
    ));
};

Playlists.propTypes = {
    playlistsArr: PropTypes.array.isRequired,
    viewPlaylistHandler: PropTypes.func.isRequired,
};

export default Playlists;
