import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useStoreActions, useStoreState } from 'easy-peasy';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
    Link as RouterLink,
    useNavigate,
    useParams,
    useSearchParams,
} from 'react-router-dom';
import VideoPlayer from '../components/video-player';

const Video = ({ startPageLoadingHandler, stopPageLoadingHandler }) => {
    const { playlistId } = useParams();
    const [searchParams, _setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [isVideoLoading, setIsVideoLoading] = useState(true);

    const playlist = useStoreState((states) => states.playlist);
    const feedbackActions = useStoreActions((actions) => actions.feedback);

    const stopIsVideoLoading = () => {
        setIsVideoLoading(false);
    };

    useEffect(() => {
        startPageLoadingHandler();
        const playlistObj = playlist.data[playlistId];
        const videoId = searchParams.get('id');
        const videoSequence = searchParams.get('sq');

        if (!playlistObj) {
            feedbackActions.addFeedback({
                type: 'error',
                msg: 'Invalid playlist id provided',
            });
            stopPageLoadingHandler();
            return navigate('/');
        }

        if (videoId) {
            let idx = playlistObj.items.findIndex(
                (item) => item.videoId === videoId
            );
            if (idx === -1) {
                idx = 0;
                feedbackActions.addFeedback({
                    type: 'info',
                    msg: `Video with id ${videoId} not found, showing the first video of the playlist.`,
                });
            }
            setData(playlistObj.items[idx]);
        } else if (videoSequence) {
            let idx = playlistObj.items.findIndex(
                (item) => item.sequence === parseInt(videoSequence)
            );
            if (idx === -1) {
                idx = 0;
                feedbackActions.addFeedback({
                    type: 'info',
                    msg: `Video with sequence ${videoSequence} not found, showing the first video of the playlist.`,
                });
            }
            setData(playlistObj.items[idx]);
        } else {
            setData(playlistObj.items[0]);
        }
        stopPageLoadingHandler();
    }, [searchParams]);

    return (
        data && (
            <Box>
                {!isVideoLoading && (
                    <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2 }}>
                        <Link
                            underline="hover"
                            color="inherit"
                            to="/"
                            component={RouterLink}
                        >
                            All Playlists
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            to={`/playlist/${playlistId}`}
                            component={RouterLink}
                        >
                            Playlist
                        </Link>
                        <Typography color="text.primary">Video</Typography>
                    </Breadcrumbs>
                )}
                <VideoPlayer
                    channelTitle={playlist.data[playlistId].channelTitle}
                    video={data}
                    totalVideosCount={playlist.data[playlistId].items.length}
                    stopVideoLoading={stopIsVideoLoading}
                />
            </Box>
        )
    );
};

Video.propTypes = {
    startPageLoadingHandler: PropTypes.func.isRequired,
    stopPageLoadingHandler: PropTypes.func.isRequired,
};

export default Video;
