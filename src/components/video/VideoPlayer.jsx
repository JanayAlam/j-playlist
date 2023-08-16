import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import ChannelInfoBox from '../shared/channel-info-box';

const VideoPlayer = ({ channelTitle, video }) => {
    const opts = {
        height: 431.5,
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };

    const onReadyHandler = (event) => {
        event.target.pauseVideo();
    };

    return (
        <Box>
            <Box>
                <YouTube
                    videoId={video.videoId}
                    opts={opts}
                    onReady={onReadyHandler}
                />
            </Box>
            <Box>
                <Typography variant="h6" component="h6">
                    {video.videoTitle}
                </Typography>
                <ChannelInfoBox
                    channelTitle={channelTitle}
                    publishedAt={video.videoPublishedAt}
                    isPlaylist={false}
                />
                <Typography variant="body1" component="div">
                    {video.videoDescription}
                </Typography>
            </Box>
        </Box>
    );
};

VideoPlayer.propTypes = {
    channelTitle: PropTypes.string.isRequired,
    video: PropTypes.object.isRequired,
};

export default VideoPlayer;