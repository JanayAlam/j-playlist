import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { useStoreState } from 'easy-peasy';
import PropTypes from 'prop-types';
import RecentItem from './RecentItem';

const RecentPlaylists = ({ viewPlaylistHandler }) => {
    const { items: recentPlaylists } = useStoreState(
        (states) => states.recentPlaylist
    );
    const { data: playlists } = useStoreState((states) => states.playlist);

    return (
        recentPlaylists.length > 0 && (
            <>
                <Typography
                    variant="h5"
                    component="div"
                    color={blue[700]}
                    sx={{ fontSize: '1.2rem', mt: 2, fontWeight: 'bold' }}
                >
                    Recent Playlists
                </Typography>
                <Grid
                    container
                    columnSpacing={{ xs: 2, sm: 4, md: 8 }}
                    sx={{ my: 2 }}
                >
                    {recentPlaylists.map((playlistId) => (
                        <Grid item md={4} xs={4} key={playlistId}>
                            <RecentItem
                                data={playlists[playlistId]}
                                viewPlaylistHandler={viewPlaylistHandler}
                            />
                        </Grid>
                    ))}
                </Grid>
            </>
        )
    );
};

RecentPlaylists.propTypes = {
    viewPlaylistHandler: PropTypes.func.isRequired,
};

export default RecentPlaylists;
