import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Container } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import { useStoreActions, useStoreState } from 'easy-peasy';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { getPlaylistIdFromString } from '../../utils/playlist-id-parser';

Yup.addMethod(Yup.string, 'validPlaylistLinkOrId', function (errorMessage) {
    // https://stackoverflow.com/a/63769828
    return this.test(
        `valid-playlist-link-or-id`,
        errorMessage,
        function (value) {
            const { path, createError } = this;
            return (
                getPlaylistIdFromString(value) ||
                createError({ path, message: errorMessage })
            );
        }
    );
});

const validationSchema = Yup.object().shape({
    playlistLinkOrId: Yup.string()
        .label('Playlist link or id')
        .trim()
        .required()
        .validPlaylistLinkOrId(
            'Please enter a valid youtube playlist link or id'
        ),
});

const AddPlaylistModal = ({ open, handleClose }) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            playlistLinkOrId: '',
        },
        mode: 'onSubmit',
        resolver: yupResolver(validationSchema),
    });

    const { error: playlistError, isFetchPlaylistLoading } = useStoreState(
        (states) => states.playlist
    );
    const playlistActions = useStoreActions((actions) => actions.playlist);
    const recentPlaylistActions = useStoreActions(
        (actions) => actions.recentPlaylist
    );

    const clearErrorMessage = () => {
        playlistActions.setError('');
    };

    const onSubmitHandler = async (data) => {
        const playlistId = getPlaylistIdFromString(data.playlistLinkOrId);
        await playlistActions.fetchPlaylist(playlistId);
        recentPlaylistActions.addToRecentItems(playlistId);
        reset();
        handleClose();
    };

    return (
        <>
            {playlistError && (
                <Container maxWidth="lg" sx={{ my: '0.5rem' }}>
                    <Alert severity="error" onClose={clearErrorMessage}>
                        {playlistError}
                    </Alert>
                </Container>
            )}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Playlist</DialogTitle>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <DialogContent>
                        <DialogContentText sx={{ textAlign: 'justify' }}>
                            To add a new playlist please insert the playlist id
                            or playlist link. Please make sure the list is
                            correct. Otherwise we won't able to fetch the
                            playlist information.
                        </DialogContentText>
                        <Controller
                            name="playlistLinkOrId"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="playlistLinkOrId"
                                    label="Playlist Link or ID"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    disabled={isFetchPlaylistLoading}
                                    {...field}
                                    error={!!errors.playlistLinkOrId}
                                    helperText={
                                        errors.playlistLinkOrId &&
                                        `${errors.playlistLinkOrId.message}`
                                    }
                                />
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        {isFetchPlaylistLoading ? (
                            <Button
                                variant="text"
                                color="primary"
                                sx={{ width: '100%', px: '1rem' }}
                            >
                                <Box sx={{ width: '100%' }}>
                                    <LinearProgress />
                                </Box>
                            </Button>
                        ) : (
                            <>
                                <Button onClick={handleClose}>Close</Button>
                                <Button type="submit">Add Playlist</Button>
                            </>
                        )}
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

AddPlaylistModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default AddPlaylistModal;
