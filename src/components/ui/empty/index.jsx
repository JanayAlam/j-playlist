import AddLinkIcon from '@mui/icons-material/AddLink';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import EmptyBox from '../../../assets/empty-box.png';

const EmptyPlaylist = ({ handleAddPlaylistModalOpen }) => (
    <Stack spacing={2} sx={{ my: 3 }}>
        <Box sx={{ mx: 'auto' }}>
            <img src={EmptyBox} alt="Empty logo" height={300} width={300} />
        </Box>
        {handleAddPlaylistModalOpen && (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Button
                    variant="contained"
                    startIcon={<AddLinkIcon />}
                    onClick={handleAddPlaylistModalOpen}
                >
                    Add Playlist
                </Button>
            </Box>
        )}
    </Stack>
);

EmptyPlaylist.propTypes = {
    handleAddPlaylistModalOpen: PropTypes.func,
};

export default EmptyPlaylist;
