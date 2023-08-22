import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import ChannelInfoBox from '../shared/channel-info-box';

const PlaylistDescription = ({ playlist }) => {
    return (
        <Box sx={{ position: 'sticky', top: 75 }}>
            <img
                src={playlist.playlistThumbnail.url}
                height={playlist.playlistThumbnail.height}
                width={playlist.playlistThumbnail.width}
            />
            <ChannelInfoBox
                style={{ marginTop: 2 }}
                channelTitle={playlist.channelTitle}
                publishedAt={playlist.playlistPublishedAt}
                isPlaylist
            />
            <Typography variant="body1" component="div">
                {playlist.playlistDescription}
            </Typography>
        </Box>
    );
};

PlaylistDescription.propTypes = {
    playlist: PropTypes.object.isRequired,
};

export default PlaylistDescription;
