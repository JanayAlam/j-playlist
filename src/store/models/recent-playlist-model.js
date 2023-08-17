import { action } from 'easy-peasy';
import {
    cacheData,
    getDataFromLocalStorage,
} from '../../utils/local-storage-cashing';

const LOCAL_STORAGE_KEY = import.meta.env
    .VITE_LOCAL_STORAGE_RECENT_PLAYLIST_KEY;

const recentPlaylistModel = {
    items: [],
    addToRecentItems: action(
        /**
         * Add the playlist into the recent playlists array.
         * @param {Object} actions Playlist's actions from easy peasy.
         * @param {String} payload PLaylist id.
         */
        (state, payload) => {
            if (state.items.includes(payload)) {
                if (state.items[0] === payload) return;
                state.items = state.items.filter((item) => item !== payload);
            }
            if (state.items.length === 3) state.items.pop();
            state.items.unshift(payload);
            cacheData(LOCAL_STORAGE_KEY, state.items);
        }
    ),
    loadLocalStorage: action(
        /**
         * Load recent playlist from local storage.
         * @param {Object} state Playlist's state from easy peasy.
         * @param {String} _payload Payload object (never used).
         */
        (state, _payload) => {
            state.items = getDataFromLocalStorage(LOCAL_STORAGE_KEY) || [];
        }
    ),
};

export default recentPlaylistModel;
