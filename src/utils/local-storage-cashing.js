/**
 * Checks local storage if the given data is already on the local storage or not.
 * @param {String} key The key of the local storage's value.
 * @returns {Object} A object if the data is present in the local storage, otherwise null.
 */
export const getDataFromLocalStorage = (key) => {
    const cache = localStorage.getItem(key);
    if (cache) {
        return JSON.parse(cache);
    }
    return null;
};

/**
 * Checks local storage if the given playlist is already on the local storage or not.
 * @param {String} key The key of the local storage's value.
 * @param {String} playlistId The playlist id of which will be checked.
 * @returns {Object} A object if the data is present in the local storage, otherwise null.
 */
export const getPlaylistByIdFromLocalStorage = (key, playlistId) => {
    const playlist = getPlaylistsFromLocalStorage(key);
    if (!playlist) return null;
    return playlist[playlistId] ? playlist[playlistId] : null;
};

/**
 * Save the data into the local storage.
 * @param {String} key The key of the local storage's value.
 * @param {Object} playlist The data that will be stored in the local storage.
 */
export const cacheData = (key, playlist) => {
    localStorage.setItem(key, JSON.stringify(playlist));
};
