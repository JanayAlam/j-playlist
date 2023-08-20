import { action } from 'easy-peasy';
import {
    cacheData,
    getDataFromLocalStorage,
} from '../../utils/local-storage-cashing';

const LOCAL_STORAGE_KEY = import.meta.env
    .VITE_LOCAL_STORAGE_RECENT_PLAYLIST_KEY;

const favoritePlaylistModel = {
    items: [],
    addToFavoriteItems: action(
        /**
         * Add the playlist into the favorite playlists array.
         * @param {Object} actions Playlist's actions from easy peasy.
         * @param {String} payload PLaylist id.
         */
        (state, payload) => {
            if (state.items.includes(payload)) return;
            state.items.push(payload);
            cacheData(LOCAL_STORAGE_KEY, state.items);
        }
    ),
    removeFromFavoriteItems: action(
        /**
         * Remove the playlist from the favorite playlists array.
         * @param {Object} actions Playlist's actions from easy peasy.
         * @param {String} payload PLaylist id.
         */
        (state, payload) => {
            state.items = state.items.filter((item) => item !== payload);
            cacheData(LOCAL_STORAGE_KEY, state.items);
        }
    ),
    loadLocalStorage: action(
        /**
         * Load favorite playlist from local storage.
         * @param {Object} state Playlist's state from easy peasy.
         * @param {String} _payload Payload object (never used).
         */
        (state, _payload) => {
            state.items = getDataFromLocalStorage(LOCAL_STORAGE_KEY) || [];
        }
    ),
};

export default favoritePlaylistModel;
