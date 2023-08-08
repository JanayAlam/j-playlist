import { action } from 'easy-peasy';

const recentPlaylistModel = {
    items: [],
    addToRecentItems: action(
        /**
         * Add the playlist into the recent playlists array.
         * @param {Object} actions Playlist's actions from easy peasy.
         * @param {String} payload PLaylist id.
         */
        (state, payload) => {
            if (state.items.includes(payload)) return;
            if (state.items.length === 3) state.items.pop();
            state.items.unshift(payload);
        }
    ),
};

export default recentPlaylistModel;
