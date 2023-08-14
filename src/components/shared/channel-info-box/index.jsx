import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import blue from '@mui/material/colors/blue';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

const ChannelInfoBox = ({ channelTitle, publishedAt, isPlaylist = true }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: blue[500], mr: 2 }} variant="rounded">
                {channelTitle.substring(0, 1)}
            </Avatar>
            <Box>
                <Typography variant="h6" component="h6" sx={{ mb: 0 }}>
                    {channelTitle}
                </Typography>
                <Typography variant="caption" component="div" sx={{ mt: 0 }}>
                    {isPlaylist ? 'Playlist ' : 'Video '}
                    {'published at '}
                    {format(new Date(publishedAt), 'PPpp')}
                </Typography>
            </Box>
        </Box>
    );
};

ChannelInfoBox.propTypes = {
    channelTitle: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    isPlaylist: PropTypes.bool,
};

export default ChannelInfoBox;
