import MovieIcon from '@mui/icons-material/Movie';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

const PlaylistItem = ({ item }) => {
    return (
        <Box sx={{ my: 2 }}>
            <Card sx={{ display: 'flex' }}>
                <CardMedia
                    component="img"
                    sx={{ width: '250px' }}
                    image={item.playlistThumbnail.url}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                    }}
                >
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography
                            component="div"
                            variant="h5"
                            sx={{ fontWeight: 'bold' }}
                        >
                            {item.playlistTitle.substring(0, 100)}
                            {item.playlistTitle.length > 100 ? '...' : ''}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                        >
                            {item.playlistDescription.substring(0, 200)}
                            {item.playlistDescription.length > 200 ? '...' : ''}
                        </Typography>
                    </CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            px: 2,
                            pb: 1,
                        }}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                component={'span'}
                                color={grey[900]}
                            >
                                <MovieIcon />
                                <Box sx={{ ml: 1 }}>{item.channelTitle}</Box>
                            </Typography>
                            <Typography
                                variant="caption"
                                component={'span'}
                                color={grey[500]}
                            >
                                {format(
                                    new Date(item.playlistPublishedAt),
                                    'MMMM dd, yyyy'
                                )}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <IconButton color="primary" size="medium">
                                {item.isFavorite ? (
                                    <StarIcon />
                                ) : (
                                    <StarBorderIcon />
                                )}
                            </IconButton>
                            <Button
                                size="medium"
                                sx={{ px: 2 }}
                                color="primary"
                                startIcon={<OpenInNewIcon />}
                            >
                                View Playlist
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

PlaylistItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default PlaylistItem;
