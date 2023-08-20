import Grid from '@mui/material/Grid';
import { useStoreState } from 'easy-peasy';
import RecentItem from './RecentItem';

const RecentPlaylists = () => {
    const { items: recentPlaylists } = useStoreState(
        (states) => states.recentPlaylist
    );
    const { data: playlists } = useStoreState((states) => states.playlist);

    return (
        recentPlaylists.length > 0 && (
            <Grid
                container
                columnSpacing={{ xs: 2, sm: 4, md: 8 }}
                sx={{ my: 2 }}
            >
                {recentPlaylists.map((playlistId) => (
                    <Grid item md={4} xs={4} key={playlistId}>
                        <RecentItem data={playlists[playlistId]} />
                    </Grid>
                ))}
            </Grid>
        )
    );
};

export default RecentPlaylists;
