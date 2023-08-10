import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

const variants = ['h1', 'h3', 'body1', 'caption'];

const LoadingPlaylist = () => (
    <div>
        {variants.map((variant) => (
            <Typography component="div" key={variant} variant={variant}>
                <Skeleton />
            </Typography>
        ))}
        <Grid container columnSpacing={2}>
            <Grid item xs={8} sx={{ pt: 0 }}>
                <Skeleton sx={{ height: '300px', width: '100%' }} />
            </Grid>
            <Grid item xs={4}>
                <Skeleton sx={{ height: '300px' }} />
            </Grid>
        </Grid>
    </div>
);

export default LoadingPlaylist;
