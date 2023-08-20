import AddIcon from '@mui/icons-material/Add';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';
import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png';

const Navbar = ({ handleAddPlaylistModalOpen }) => {
    const { pathname } = useLocation();

    return (
        <AppBar
            position="sticky"
            color="inherit"
            sx={{ borderBottom: '1px solid #D4D4D4', boxShadow: 0 }}
        >
            <Container>
                <Toolbar>
                    <Stack
                        sx={{ flexGrow: 1, alignItems: 'center', px: 0 }}
                        direction="row"
                        spacing={2}
                    >
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
                                    sx={{ fontWeight: 'bold' }}
                                    variant="h6"
                                    component="div"
                                >
                                    J Playlist
                                </Typography>
                            </Link>
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <Button
                                size="small"
                                color={pathname === '/' ? 'primary' : 'inherit'}
                                to={'/'}
                                component={RouterLink}
                            >
                                All Playlists
                            </Button>
                            <Button
                                size="small"
                                color={
                                    pathname === '/favorites'
                                        ? 'primary'
                                        : 'inherit'
                                }
                                to={'/favorites'}
                                component={RouterLink}
                            >
                                Favorites
                            </Button>
                        </Box>
                    </Stack>
                    <Button
                        size="small"
                        color="primary"
                        onClick={handleAddPlaylistModalOpen}
                        startIcon={<AddIcon />}
                        variant="outlined"
                    >
                        Add Playlist
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

Navbar.propTypes = {
    handleAddPlaylistModalOpen: PropTypes.func.isRequired,
};

export default Navbar;
