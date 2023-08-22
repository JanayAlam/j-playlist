import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useState } from 'react';
import YouTube from 'react-youtube';
import VideoController from './VideoController';
import VideoDescription from './VideoDescription';
import styles from './video-player.module.css';

const VideoPlayer = ({
    channelTitle,
    video,
    totalVideosCount,
    stopVideoLoading,
}) => {
    const [isLoading, setIsLoading] = useState(true);

    const onReadyHandler = (event) => {
        setIsLoading(false);
        stopVideoLoading();
        event.target.pauseVideo();
    };

    return (
        <Box sx={{ mt: 1, mb: 5 }}>
            <Box className={!isLoading ? '' : styles.hide}>
                <YouTube
                    videoId={video.videoId}
                    opts={{
                        playerVars: {
                            autoplay: 0,
                        },
                    }}
                    onReady={onReadyHandler}
                    className={styles.videoResponsive}
                />
            </Box>
            {isLoading ? (
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ mt: 1 }}>
                    <VideoController
                        item={video}
                        totalVideosCount={totalVideosCount}
                    />
                    <VideoDescription
                        channelTitle={channelTitle}
                        videoTitle={video.videoTitle}
                        description={video.videoDescription}
                        publishedAt={video.videoPublishedAt}
                    />
                </Box>
            )}
        </Box>
    );
};

VideoPlayer.propTypes = {
    channelTitle: PropTypes.string.isRequired,
    video: PropTypes.object.isRequired,
    totalVideosCount: PropTypes.number.isRequired,
    stopVideoLoading: PropTypes.func,
};

export default VideoPlayer;
