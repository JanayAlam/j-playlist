import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useStoreState } from 'easy-peasy';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VideoList from '../video-list';

const VideoController = ({ item, totalVideosCount }) => {
    const { playlistId } = useParams();
    const navigate = useNavigate();

    const [viewPlaylistOpen, setViewPlaylistOpen] = useState(false);
    const playlist = useStoreState((states) => states.playlist);

    const handlePrevious = () => {
        navigate(`?sq=${item.sequence - 1}`);
    };

    const handleNext = () => {
        navigate(`?sq=${item.sequence + 1}`);
    };

    const handleViewPlaylistOpenOpen = () => {
        setViewPlaylistOpen(true);
    };

    const handleViewPlaylistOpenClose = () => {
        setViewPlaylistOpen(false);
    };

    return (
        <>
            <ButtonGroup
                variant="contained"
                size="small"
                color="inherit"
                aria-label="primary button group"
            >
                <Button disabled={item.sequence === 1} onClick={handlePrevious}>
                    <ArrowBackIosIcon fontSize="15" />
                </Button>
                <Button onClick={handleViewPlaylistOpenOpen}>
                    View Playlist
                </Button>
                <Button
                    disabled={item.sequence === totalVideosCount}
                    onClick={handleNext}
                >
                    <ArrowForwardIosIcon fontSize="15" />
                </Button>
            </ButtonGroup>
            <Dialog
                open={viewPlaylistOpen}
                onClose={handleViewPlaylistOpenClose}
                scroll={'paper'}
                aria-describedby="scroll-dialog-description"
                maxWidth="md"
            >
                <DialogContent dividers sx={{ minWidth: 900 }}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >
                        <VideoList
                            playlistId={playlistId}
                            items={playlist.data[playlistId].items}
                            currentlyPlaying={item.videoId}
                            onClickCb={() => handleViewPlaylistOpenClose()}
                        />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
};

VideoController.propTypes = {
    item: PropTypes.object.isRequired,
    totalVideosCount: PropTypes.number.isRequired,
};

export default VideoController;
