import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ChannelInfoBox from '../shared/channel-info-box';

const VideoDescription = ({
    channelTitle,
    videoTitle,
    description,
    publishedAt,
}) => {
    const [showDescription, setShowDescription] = useState(false);

    const toggleShowDescription = () => {
        setShowDescription(!showDescription);
    };

    return (
        <Box sx={{ mt: 1 }}>
            <Typography variant="h6" component="h6">
                {videoTitle}
            </Typography>
            <ChannelInfoBox
                channelTitle={channelTitle}
                publishedAt={publishedAt}
                isPlaylist={false}
            />
            <Link onClick={toggleShowDescription} sx={{ cursor: 'pointer' }}>
                {showDescription ? 'Hide Description' : 'Show Description'}
            </Link>
            {showDescription && (
                <Typography variant="body1" component="div">
                    {description || ''}
                </Typography>
            )}
        </Box>
    );
};

VideoDescription.propTypes = {
    channelTitle: PropTypes.string.isRequired,
    videoTitle: PropTypes.string.isRequired,
    description: PropTypes.string,
    publishedAt: PropTypes.string.isRequired,
};

export default VideoDescription;
