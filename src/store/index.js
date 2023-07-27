import { createStore } from 'easy-peasy';
import playlistModel from './models/playlist-model';

const store = createStore({
    playlist: playlistModel,
});

export default store;
