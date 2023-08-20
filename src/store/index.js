import { createStore } from 'easy-peasy';
import favoritePlaylistModel from './models/favorite-playlist-model';
import feedback from './models/feedback-model';
import playlistModel from './models/playlist-model';
import recentPlaylistModel from './models/recent-playlist-model';

const store = createStore({
    playlist: playlistModel,
    recentPlaylist: recentPlaylistModel,
    favoritePlaylist: favoritePlaylistModel,
    feedback: feedback,
});

export default store;
