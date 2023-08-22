import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { orange } from '@mui/material/colors';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PlaylistDescription from '../components/playlist-description';
import DeletePlaylistBox from '../components/shared/delete-playlist-modal';
import ErrorComponent from '../components/ui/error';
import VideoList from '../components/video-list';
import { getPlaylistByIdFromLocalStorage } from '../utils/local-storage-cashing';

const PlaylistDetails = () => {
    const { playlistId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const { items: favoriteItems } = useStoreState(
        (states) => states.favoritePlaylist
    );

    const recentPlaylistAction = useStoreActions(
        (actions) => actions.recentPlaylist
    );
    const favoritePlaylistAction = useStoreActions(
        (actions) => actions.favoritePlaylist
    );

    useEffect(() => {
        setData(getPlaylistByIdFromLocalStorage(playlistId) || null);
        setIsLoading(false);
        recentPlaylistAction.addToRecentItems(playlistId);
    }, []);

    const handleDeleteModalOpen = () => {
        setDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setDeleteModalOpen(false);
    };

    const handleDeleteCb = () => {
        navigate('/');
    };

    const toggleFavorite = () => {
        const playlistId = data.playlistId;
        if (favoriteItems.includes(playlistId)) {
            return favoritePlaylistAction.removeFromFavoriteItems(playlistId);
        }
        favoritePlaylistAction.addToFavoriteItems(playlistId);
    };

    return isLoading ? (
        <Box sx={{ textAlign: 'center' }}>
            <CircularProgress />
        </Box>
    ) : data ? (
        <Box>
            <Grid container columnSpacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4">
                        {data.playlistTitle}
                    </Typography>

                    <Stack
                        direction={'row'}
                        spacing={2}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant="body1"
                            component="div"
                            color="primary"
                        >
                            {data.items.length} Videos
                        </Typography>
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            spacing={1}
                        >
                            <IconButton
                                aria-label="favorite"
                                color="primary"
                                size="medium"
                                variant="contained"
                                onClick={toggleFavorite}
                            >
                                {favoriteItems.includes(data.playlistId) ? (
                                    <StarIcon sx={{ color: orange[500] }} />
                                ) : (
                                    <StarBorderIcon
                                        sx={{ color: orange[500] }}
                                    />
                                )}
                            </IconButton>
                            <IconButton
                                aria-label="delete"
                                color="error"
                                variant="contained"
                                onClick={handleDeleteModalOpen}
                            >
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
            <Grid container columnSpacing={2} rowGap={2} sx={{ mt: 2 }}>
                <Grid item md={5} sm={12}>
                    <PlaylistDescription
                        playlist={{
                            playlistDescription: data.playlistDescription,
                            playlistThumbnail: data.playlistThumbnail,
                            playlistPublishedAt: data.playlistPublishedAt,
                            channelTitle: data.channelTitle,
                        }}
                    />
                </Grid>
                <Grid item md={7} sm={12}>
                    <VideoList
                        items={data.items}
                        playlistId={data.playlistId}
                    />
                </Grid>
            </Grid>
            <DeletePlaylistBox
                playlistId={data.playlistId}
                open={deleteModalOpen}
                handleClose={handleDeleteModalClose}
                handleSubmitCb={handleDeleteCb}
            />
        </Box>
    ) : (
        <ErrorComponent code={404} msg={'Playlist not found!'} />
    );
};

export default PlaylistDetails;
