import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PlaylistDetails = () => {
    const { playlistId } = useParams();

    useEffect(() => {
        console.log(playlistId);
    }, []);

    return <div>Playlist</div>;
};

export default PlaylistDetails;
