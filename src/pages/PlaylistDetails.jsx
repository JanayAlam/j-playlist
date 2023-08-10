import InfoIcon from '@mui/icons-material/Info';
import Star from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import blue from '@mui/material/colors/blue';
import { useStoreActions } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorComponent from '../components/ui/error';
import LoadingPlaylist from '../components/ui/loading-playlist';
import PlaylistDescriptionModal from '../components/ui/playlist-description-modal';
import { getPlaylistByIdFromLocalStorage } from '../utils/local-storage-cashing';

const PlaylistDetails = () => {
    const { playlistId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);

    const playlist = useStoreActions((actions) => actions.playlist);

    /**
     * Toggle favorite playlist handler.
     * @param {String} playlistId The playlist id which will be added or removed from the favorite list.
     */
    const toggleAddToFavorite = (playlistId) => {
        playlist.toggleFavorite(playlistId);
        setData(getPlaylistByIdFromLocalStorage(playlistId));
    };

    const handleModalClose = () => {
        setDescriptionModalOpen(false);
    };

    useEffect(() => {
        setData(getPlaylistByIdFromLocalStorage(playlistId) || null);
        setIsLoading(false);
    }, []);

    return isLoading ? (
        <LoadingPlaylist />
    ) : data ? (
        <>
            <Box sx={{ mt: 2 }}>
                <Typography variant="h4" component="h4">
                    {data.playlistTitle}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                        variant="caption"
                        color={blue[700]}
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {data.channelTitle}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            onClick={() => toggleAddToFavorite(data.playlistId)}
                        >
                            {data.isFavorite ? <Star /> : <StarOutlineIcon />}
                        </IconButton>
                        <Button
                            color="inherit"
                            onClick={() => setDescriptionModalOpen(true)}
                        >
                            <InfoIcon sx={{ mr: 1 }} /> Description
                        </Button>
                    </Box>
                </Box>
            </Box>
            <PlaylistDescriptionModal
                open={descriptionModalOpen}
                handleClose={handleModalClose}
                data={data}
            />
        </>
    ) : (
        <ErrorComponent code={404} msg={'Playlist not found!'} />
    );
};

export default PlaylistDetails;
