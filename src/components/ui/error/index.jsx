import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import PropTypes from 'prop-types';

const ErrorComponent = ({ code = 500, msg = 'Something went wrong!' }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 5,
        }}
    >
        <Typography
            variant="h1"
            component="h1"
            color={red[700]}
            sx={{ fontWeight: 'bold', fontSize: '10rem' }}
        >
            {code}
        </Typography>
        <Typography variant="caption" component="div" sx={{ fontSize: '2rem' }}>
            {msg}
        </Typography>
    </Box>
);

ErrorComponent.propTypes = {
    code: PropTypes.number,
    msg: PropTypes.string,
};

export default ErrorComponent;
