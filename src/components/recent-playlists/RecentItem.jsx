import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const RecentItem = ({ data }) => {
    return (
        data && (
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={data?.playlistThumbnail?.url}
                    title={data.playlistTitle}
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                    >
                        {data.playlistTitle.substring(0, 30)}
                        {data.playlistTitle.length > 30 ? '...' : ''}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Visit playlist</Button>
                </CardActions>
            </Card>
        )
    );
};

RecentItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default RecentItem;
