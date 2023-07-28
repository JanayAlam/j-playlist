import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    playlistLinkOrId: Yup.string()
        .label('Playlist link or id')
        .trim()
        .required(),
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

    const onSubmitHandler = (data) => {
        console.log(data);
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
