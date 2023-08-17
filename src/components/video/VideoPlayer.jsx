import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';
import YouTube from 'react-youtube';
import ChannelInfoBox from '../shared/channel-info-box';

const VideoPlayer = ({ channelTitle, video }) => {
    const [isLoading, setIsLoading] = useState(true);

    const opts = {
        height: 431.5,
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };

    const onReadyHandler = (event) => {
        setIsLoading(false);
        event.target.pauseVideo();
    };

    return (
        <>
            <Box>
                <YouTube
                    videoId={video.videoId}
                    opts={opts}
                    onReady={onReadyHandler}
                />
            </Box>
            {isLoading ? (
                <>
                    <Skeleton
                        variant="rectangular"
                        width={'100%'}
                        height={20}
                    />
                    <Skeleton
                        variant="rectangular"
                        width={'100%'}
                        height={100}
                    />
                </>
            ) : (
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
            )}
        </>
    );
};

VideoPlayer.propTypes = {
    channelTitle: PropTypes.string.isRequired,
    video: PropTypes.object.isRequired,
};

export default VideoPlayer;
