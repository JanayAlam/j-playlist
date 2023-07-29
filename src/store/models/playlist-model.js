import { action, thunk } from 'easy-peasy';
import getPlaylistById from '../../api';

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
    // thunks
    fetchPlaylist: thunk(
        /**
         * Add a new playlist to the state. If the playlist already exists in the state then it will not include it again.
         * @param {Object} actions Playlist's actions from easy peasy.
         * @param {String} payload Playlist id.
         * @param {Object} helper Helper object from easy peasy.
         */
        async (actions, payload, helper) => {
            // TODO: Local storage optimization
            const { addPlaylist, setError, setIsFetchPlaylistLoading } =
                actions;
            const { getState } = helper;

            if (getState().data[payload]) return;
            setIsFetchPlaylistLoading(true);

            try {
                const playlistData = await getPlaylistById(payload);
                if (playlistData?.items?.length === 0) {
                    throw new Error('Playlist not found');
                }
                addPlaylist(playlistData);
            } catch (err) {
                const errMessage =
                    err.response?.data?.error?.message || err.message;
                setError(errMessage || 'Something went wrong');
            } finally {
                setIsFetchPlaylistLoading(false);
            }
        }
    ),
};

export default playlistModel;
