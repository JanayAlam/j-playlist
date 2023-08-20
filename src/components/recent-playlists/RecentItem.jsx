import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const RecentItem = ({ data }) => {
    const navigate = useNavigate();

    /**
     * Navigate to the selected playlist details page,
     * @param {String} playlistId The selected playlist id
     */
    const viewPlaylistHandler = (playlistId) => {
        navigate(`/playlist/${playlistId}`);
    };
    return (
        data && (
            <Card
                sx={{ maxWidth: 345, cursor: 'pointer' }}
                onClick={() => viewPlaylistHandler(data.playlistId)}
            >
                <CardMedia
                    sx={{ height: 140 }}
                    image={data?.playlistThumbnail?.url}
                    title={data.playlistTitle}
                />
                <CardContent sx={{ pb: 0 }}>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                    >
                        {data.playlistTitle.substring(0, 35)}
                        {data.playlistTitle.length > 35 ? '...' : ''}
                    </Typography>
                    <Typography variant="body2" component="div">
                        {data.channelTitle}
                    </Typography>
                </CardContent>
            </Card>
        )
    );
};

RecentItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default RecentItem;
