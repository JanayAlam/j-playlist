import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../../assets/logo.png';

const Navbar = () => {
    return (
        <AppBar
            position="static"
            color="transparent"
            sx={{ borderBottom: '1px solid #D4D4D4', boxShadow: 0 }}
        >
            <Container>
                <Toolbar>
                    <Stack sx={{ flexGrow: 1 }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ textDecoration: 'none' }}
                        >
                            <Link
                                to="/"
                                sx={{ textDecoration: 'none' }}
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
                            </Link>
                        </Typography>
                    </Stack>
                    <IconButton color="primary">
                        <AddIcon />
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
