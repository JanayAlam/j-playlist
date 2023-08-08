import { createStore } from 'easy-peasy';
import playlistModel from './models/playlist-model';
import recentPlaylistModel from './models/recent-playlist-model';

const store = createStore({
    playlist: playlistModel,
    recentPlaylist: recentPlaylistModel,
});

export default store;
