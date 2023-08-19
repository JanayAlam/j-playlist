import AddIcon from '@mui/icons-material/Add';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../../assets/logo.png';

const Navbar = ({ handleAddPlaylistModalOpen }) => {
    return (
        <AppBar
            position="static"
            color="transparent"
            sx={{ borderBottom: '1px solid #D4D4D4', boxShadow: 0 }}
        >
            <Container maxWidth="lg">
                <Toolbar>
                    <Stack sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="div">
                            <Link
                                to="/"
                                sx={{
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                component={RouterLink}
                                color={grey[900]}
                            >
                                <img
                                    src={logo}
                                    alt="Logo"
                                    style={{
                                        height: '50px',
                                        marginRight: '0.5rem',
                                    }}
                                />
                                <Typography
                                    sx={{ ml: 1, fontWeight: 'bold' }}
                                    variant="h6"
                                    component="div"
                                >
                                    J Playlist
                                </Typography>
                            </Link>
                        </Typography>
                    </Stack>
                    <IconButton
                        color="primary"
                        onClick={handleAddPlaylistModalOpen}
                    >
                        <AddIcon />
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

Navbar.propTypes = {
    handleAddPlaylistModalOpen: PropTypes.func.isRequired,
};

export default Navbar;
