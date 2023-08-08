const JP_PLAYLIST_KEY = 'JP_Playlists';

/**
 * Checks local storage if the given playlist is already on the local storage or not.
 * @returns {Object} The playlist object if the playlist is present in the local storage, otherwise null.
 */
export const getPlaylistsFromLocalStorage = () => {
    const cache = localStorage.getItem(JP_PLAYLIST_KEY);
    if (cache) {
        return JSON.parse(cache);
    }
    return {};
};

/**
 * Checks local storage if the given playlist is already on the local storage or not.
 * @param {String} playlistId The playlist id of which will be checked.
 * @returns {Object} The playlist object if the playlist is present in the local storage, otherwise null.
 */
export const getPlaylistByIdFromLocalStorage = (playlistId) => {
    const playlist = getPlaylistsFromLocalStorage();
    if (!playlist) return null;
    return playlist[playlistId] ? playlist[playlistId] : null;
};

/**
 * Save the playlist data into the local storage.
 * @param {Object} playlist The whole playlist data that will be stored in the local storage.
 */
export const cachePlaylistData = (playlist) => {
    localStorage.setItem(JP_PLAYLIST_KEY, JSON.stringify(playlist));
};
