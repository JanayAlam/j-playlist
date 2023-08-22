import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { orange } from '@mui/material/colors';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const VideoItem = ({ item, playlistId, currentlyPlaying, onClickCb }) => {
    const navigate = useNavigate();

    const onClickHandler = (videoId) => {
        navigate(`/playlist/${playlistId}/v?id=${videoId}`);
        if (onClickCb) onClickCb();
    };

    return (
        <Paper
            square
            sx={{
                mb: 1,
                height: item.thumbnail.height / 2,
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor:
                    currentlyPlaying === item.videoId ? orange[50] : '#fff',
            }}
            title={item.videoTitle}
            onClick={() => onClickHandler(item.videoId)}
        >
            <img
                src={item.thumbnail.url}
                alt="Video Thumbnail"
                height={item.thumbnail.height / 2}
                width={item.thumbnail.width / 2}
            />
            <Box sx={{ px: 1 }}>
                {item.videoTitle.length > 100
                    ? item.videoTitle.substring(0, 100) + '...'
                    : item.videoTitle}
            </Box>
        </Paper>
    );
};

VideoItem.propTypes = {
    item: PropTypes.object.isRequired,
    playlistId: PropTypes.string.isRequired,
    currentlyPlaying: PropTypes.string,
    onClickCb: PropTypes.func,
};

export default VideoItem;
