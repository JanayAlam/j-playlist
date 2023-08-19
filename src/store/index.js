import { createStore } from 'easy-peasy';
import feedback from './models/feedback-model';
import playlistModel from './models/playlist-model';
import recentPlaylistModel from './models/recent-playlist-model';

const store = createStore({
    playlist: playlistModel,
    recentPlaylist: recentPlaylistModel,
    feedback: feedback,
});

export default store;
