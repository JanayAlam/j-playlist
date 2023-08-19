import { action, thunk } from 'easy-peasy';
import getPlaylistById from '../../api';
import {
    cacheData,
    getDataFromLocalStorage,
} from '../../utils/local-storage-cashing';

const LOCAL_STORAGE_KEY = import.meta.env.VITE_LOCAL_STORAGE_PLAYLIST_KEY;

const playlistModel = {
    // states
    data: {},
    error: '',
    isFetchPlaylistLoading: false,
    // actions
    addPlaylist: action(
        /**
         * Add playlist to the playlist state.
         * @param {Object} state Playlist's states provided by easy peasy.
         * @param {String} payload The playlist object.
         */
        (state, payload) => {
            state.data[payload.playlistId] = payload;
        }
    ),
    setError: action(
        /**
         * Set error value.
         * @param {Object} state Playlist's states provided by easy peasy.
         * @param {String} payload A string error message.
         */
        (state, payload) => {
            state.error = payload;
        }
    ),
    setIsFetchPlaylistLoading: action(
        /**
         * Set isFetchPlaylistLoading value.
         * @param {Object} state Playlist's states provided by easy peasy.
         * @param {Boolean} payload What should be the value of loading state?
         */
        (state, payload) => {
            state.isFetchPlaylistLoading = !!payload;
        }
    ),
    toggleFavorite: action(
        /**
         * Toggle the playlist in the favorite list.
         * @param {Object} state Playlist's states provided by easy peasy.
         * @param {*} payload Playlist id.
         */
        (state, payload) => {
            state.data[payload].isFavorite = !state.data[payload].isFavorite;
            cacheData(LOCAL_STORAGE_KEY, state.data);
        }
    ),
    loadLocalStorage: action(
        /**
         * Load playlist object from local storage.
         * @param {Object} state Playlist's states from easy peasy.
         * @param {String} _payload Payload object (never used).
         */
        (state, _payload) => {
            state.data = getDataFromLocalStorage(LOCAL_STORAGE_KEY) || {};
        }
    ),
    // thunks
    fetchPlaylist: thunk(
        /**
         * Add a new playlist to the state. If the playlist already exists in the state then it will not include it again.
         * @param {Object} actions Playlist's actions from easy peasy.
         * @param {String} payload Playlist id.
         * @param {Object} helper Helper object from easy peasy.
         * @returns {Boolean} Returns true if the playlist is successfully added otherwise it returns false.
         */
        async (actions, payload, helper) => {
            const { addPlaylist, setError, setIsFetchPlaylistLoading } =
                actions;
            const { getState } = helper;
            try {
                if (getState().data[payload]) {
                    throw new Error('Playlist has been already added');
                }
                setIsFetchPlaylistLoading(true);
                const playlistData = await getPlaylistById(payload);
                if (playlistData?.items?.length === 0) {
                    throw new Error('Playlist has no videos');
                }
                addPlaylist(playlistData);
                cacheData(LOCAL_STORAGE_KEY, getState().data);
            } catch (err) {
                const errMessage =
                    err.response?.data?.error?.message || err.message;
                setError(errMessage || 'Something went wrong');
                return false;
            } finally {
                setIsFetchPlaylistLoading(false);
            }
            return true;
        }
    ),
};

export default playlistModel;
