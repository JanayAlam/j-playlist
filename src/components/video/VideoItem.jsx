import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { formatDistance } from 'date-fns';
import PropTypes from 'prop-types';

const VideoItem = ({ item, nowPlaying, clickHandler }) => {
    return (
        <Card
            onClick={() => clickHandler(item)}
            sx={{ cursor: 'pointer' }}
            title={item.videoTitle}
        >
            <Box
                sx={{
                    display: 'flex',
                    backgroundColor:
                        nowPlaying.videoId === item.videoId && '#0c70d3',
                    color: nowPlaying.videoId === item.videoId && '#fff',
                }}
            >
                <CardMedia
                    component="img"
                    sx={{ width: 120 }}
                    image={item.thumbnail.url}
                    alt={item.videoTitle}
                />
                <CardContent>
                    <Typography
                        variant="body1"
                        component="div"
                        sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}
                    >
                        {item.videoTitle.length > 30
                            ? item.videoTitle.substring(0, 30) + '...'
                            : item.videoTitle}
                    </Typography>
                    <Typography
                        variant="caption"
                        component="div"
                        sx={{ textTransform: 'capitalize' }}
                    >
                        {formatDistance(
                            new Date(item.videoPublishedAt),
                            new Date(),
                            { addSuffix: true }
                        )}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
};

VideoItem.propTypes = {
    item: PropTypes.object.isRequired,
    nowPlaying: PropTypes.object.isRequired,
    clickHandler: PropTypes.func.isRequired,
};

export default VideoItem;
