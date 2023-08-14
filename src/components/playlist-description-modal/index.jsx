import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import blue from '@mui/material/colors/blue';
import PropTypes from 'prop-types';
import ChannelInfoBox from '../shared/channel-info-box';

const PlaylistDescriptionModal = ({ open, handleClose, data }) => {
    return (
        <Dialog open={open} onClose={handleClose} scroll={'paper'}>
            <DialogTitle id="scroll-dialog-title">
                {data.playlistTitle}
            </DialogTitle>
            <DialogContent>
                <ChannelInfoBox
                    channelTitle={data.channelTitle}
                    publishedAt={data.playlistPublishedAt}
                />
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
