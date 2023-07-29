import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useStoreActions } from 'easy-peasy';
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

    const playlist = useStoreActions((actions) => actions.playlist);

    const onSubmitHandler = (data) => {
        const playlistId = getPlaylistIdFromString(data.playlistLinkOrId);
        reset();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Playlist</DialogTitle>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <DialogContent>
                    <DialogContentText sx={{ textAlign: 'justify' }}>
                        To add a new playlist please insert the playlist id or
                        playlist link. Please make sure the list is correct.
                        Otherwise we won't able to fetch the playlist
                        information.
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
                    <Button onClick={handleClose}>Close</Button>
                    <Button type="submit">Add Playlist</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

AddPlaylistModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default AddPlaylistModal;
