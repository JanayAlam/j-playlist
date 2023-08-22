import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useStoreActions } from 'easy-peasy';
import PropTypes from 'prop-types';
import { useState } from 'react';

const DeletePlaylistBox = ({
    playlistId,
    open,
    handleClose,
    handleSubmitCb,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const playlistAction = useStoreActions((actions) => actions.playlist);
    const recentPlaylistAction = useStoreActions(
        (actions) => actions.recentPlaylist
    );
    const favoritePlaylistAction = useStoreActions(
        (actions) => actions.favoritePlaylist
    );

    const handleDelete = () => {
        setIsLoading(true);
        playlistAction.removePlaylist(playlistId);
        recentPlaylistAction.removeFromRecentItems(playlistId);
        favoritePlaylistAction.removeFromFavoriteItems(playlistId);
        setIsLoading(false);
        if (handleSubmitCb) handleSubmitCb();
    };

    return (
        <Dialog
            open={open}
            onClose={isLoading ? () => {} : handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {'Delete playlist?'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure that you want to delete this playlist?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    color="inherit"
                    disabled={isLoading}
                >
                    Close
                </Button>
                {isLoading ? (
                    <Button
                        variant="contained"
                        color="inherit"
                        disabled
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        <CircularProgress size={15} color="inherit" />
                        <Box>Deleting</Box>
                    </Button>
                ) : (
                    <Button
                        onClick={handleDelete}
                        autoFocus
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

DeletePlaylistBox.propTypes = {
    playlistId: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmitCb: PropTypes.func,
};

export default DeletePlaylistBox;
