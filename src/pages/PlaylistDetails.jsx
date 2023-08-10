import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorComponent from '../components/ui/error';
import LoadingPlaylist from '../components/ui/loading-playlist';
import { getPlaylistByIdFromLocalStorage } from '../utils/local-storage-cashing';

const PlaylistDetails = () => {
    const { playlistId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(getPlaylistByIdFromLocalStorage(playlistId) || null);
        setIsLoading(false);
    }, []);

    return isLoading ? (
        <LoadingPlaylist />
    ) : data ? (
        <div>{data.playlistId}</div>
    ) : (
        <ErrorComponent code={404} msg={'Playlist not found!'} />
    );
};

export default PlaylistDetails;
