import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;
const BASE_URL = 'https://youtube.googleapis.com/youtube/v3';

/**
 * [Private]
 * Fetch all videos of a playlist.
 * @param {String} playlistId Playlist id.
 * @param {String} nextPageToken Token of the next page. By default it's empty string. The function will call itself again and again unless the next page token is set to empty string.
 * @param {Array<Object>} results By default an empty array which will be updated by recursive call. This result array will be returned in the end.
 * @returns {Array<Object>} The modified result array.
 */
const _getPlaylistItems = async (
    playlistId,
    nextPageToken = '',
    results = []
) => {
    const parts = ['id', 'contentDetails', 'snippet'];
    const MAX_RESULTS = 50;
    const URL = `${BASE_URL}/playlistItems?part=${parts.join(
        '%2C'
    )}&playlistId=${playlistId}&maxResults=${MAX_RESULTS}&key=${API_KEY}&nextPageToken=${nextPageToken}`;

    const { data } = await axios.get(URL);

    results = [...results, ...data.items];

    if (data.nextPageToken) {
        results = _getPlaylistItems(playlistId, data.nextPageToken, results);
    }

    return results;
};

/**
 * [Public]
 * Fetch playlist information and its video's information by the given playlist id.
 * @param {String} playlistId Playlist id
 * @returns {Object} {
 *     channelId: String,
 *     channelTitle: String,
 *     playlistTitle: String,
 *     playlistDescription: String,
 *     playlistThumbnail: Object
 * }
 */
const getPlaylistById = async (playlistId) => {
    // TODO: Check if the playlist is already in the local storage or not.
    const parts = ['id', 'contentDetails', 'snippet'];
    const URL = `${BASE_URL}/playlists?part=${parts.join(
        '%2C'
    )}&id=${playlistId}&key=${API_KEY}`;

    const { data: playlist } = await axios.get(URL);
    try {
        const {
            channelId,
            title: playlistTitle,
            description: playlistDescription,
            thumbnails: playlistThumbnails,
            channelTitle,
        } = playlist?.items[0]?.snippet;

        const playlistItems = await _getPlaylistItems(playlistId);

        const items = playlistItems.map((item) => {
            const {
                title: videoTitle,
                description: videoDescription,
                thumbnails: { medium },
            } = item.snippet;
            const { videoId, videoPublishedAt } = item.contentDetails;
            return {
                videoId,
                videoTitle,
                videoDescription,
                thumbnail: medium,
                videoPublishedAt,
            };
        });

        return {
            playlistId,
            channelId,
            channelTitle,
            playlistTitle,
            playlistDescription,
            playlistThumbnail: playlistThumbnails.high,
            items,
        };
    } catch (err) {
        if (err instanceof TypeError) {
            // Type error means playlist is not found with the provided id.
            throw new Error('Playlist not found');
        }
        throw new Error(err.message);
    }
};

export default getPlaylistById;
