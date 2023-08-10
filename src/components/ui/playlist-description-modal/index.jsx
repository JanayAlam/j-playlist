import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import blue from '@mui/material/colors/blue';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

const PlaylistDescriptionModal = ({ open, handleClose, data }) => {
    return (
        <Dialog open={open} onClose={handleClose} scroll={'paper'}>
            <DialogTitle id="scroll-dialog-title">
                {data.playlistTitle}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        sx={{ bgcolor: blue[500], mr: 2 }}
                        variant="rounded"
                    >
                        {data.channelTitle.substring(0, 1)}
                    </Avatar>
                    <Box>
                        <Typography variant="h6" component="h6" sx={{ mb: 0 }}>
                            {data.channelTitle}
                        </Typography>
                        <Typography
                            variant="caption"
                            component="div"
                            sx={{ mt: 0 }}
                        >
                            Playlist published at{' '}
                            {format(new Date(data.playlistPublishedAt), 'PPpp')}
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Typography
                    variant="body1"
                    component="div"
                    color={blue[900]}
                    sx={{ mt: 2 }}
                >
                    {data.items.length} Videos
                </Typography>
                <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                    {data.playlistDescription ||
                        'Playlist description not available'}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    <CloseFullscreenIcon sx={{ mr: 1 }} /> Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

PlaylistDescriptionModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

export default PlaylistDescriptionModal;
