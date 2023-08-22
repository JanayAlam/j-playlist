import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Empty from '../ui/empty';
import VideoItem from './VideoItem';

const VideoList = ({ items = [], playlistId, currentlyPlaying, onClickCb }) => {
    return items.length === 0 ? (
        <Typography variant="h6" component="h6" sx={{ textAlign: 'center' }}>
            <Empty />
        </Typography>
    ) : (
        items.map((item) => (
            <VideoItem
                key={item.videoId}
                item={item}
                playlistId={playlistId}
                currentlyPlaying={currentlyPlaying}
                onClickCb={onClickCb}
            />
        ))
    );
};

VideoList.propTypes = {
    items: PropTypes.array.isRequired,
    playlistId: PropTypes.string.isRequired,
    currentlyPlaying: PropTypes.string,
    onClickCb: PropTypes.func,
};

export default VideoList;
