import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import LinearProgress from '@mui/material/LinearProgress';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPlaylistModal from './components/add-playlist-modal';
import AlertBox from './components/ui/alert-box';
import ErrorComponent from './components/ui/error';
import Navbar from './components/ui/navbar';
import Favorites from './pages/Favorites';
import Homepage from './pages/Homepage';
import PlaylistDetails from './pages/PlaylistDetails.jsx';
import Video from './pages/Video';

const App = () => {
    const { error: playlistError } = useStoreState((states) => states.playlist);

    const playlistAction = useStoreActions((actions) => actions.playlist);
    const recentPlaylistAction = useStoreActions(
        (actions) => actions.recentPlaylist
    );
    const favoritePlaylistAction = useStoreActions(
        (actions) => actions.favoritePlaylist
    );
    const feedbackActions = useStoreActions((actions) => actions.feedback);

    const [addPlaylistModalOpen, setAddPlaylistModalOpen] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);

    const handleAddPlaylistModalOpen = () => {
        setAddPlaylistModalOpen(true);
    };

    const handleAddPlaylistModalClose = () => {
        setAddPlaylistModalOpen(false);
    };

    const startPageLoadingHandler = () => {
        setIsPageLoading(true);
    };

    const stopPageLoadingHandler = () => {
        setIsPageLoading(false);
    };

    useEffect(() => {
        playlistAction.loadLocalStorage();
        recentPlaylistAction.loadLocalStorage();
        favoritePlaylistAction.loadLocalStorage();
        stopPageLoadingHandler();
    }, []);

    useEffect(() => {
        if (playlistError) {
            feedbackActions.addFeedback({ type: 'error', msg: playlistError });
            playlistAction.setError('');
        }
    }, [playlistError]);

    return (
        <BrowserRouter>
            <CssBaseline />
            <Navbar handleAddPlaylistModalOpen={handleAddPlaylistModalOpen} />
            <AlertBox />
            {isPageLoading ? (
                <LinearProgress />
            ) : (
                <Container maxWidth="lg">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Homepage
                                    handleAddPlaylistModalOpen={
                                        handleAddPlaylistModalOpen
                                    }
                                />
                            }
                        />
                        <Route
                            path="/favorites"
                            element={
                                <Favorites
                                    startPageLoadingHandler={
                                        startPageLoadingHandler
                                    }
                                    stopPageLoadingHandler={
                                        stopPageLoadingHandler
                                    }
                                />
                            }
                        />
                        <Route
                            path="/playlist/:playlistId"
                            element={<PlaylistDetails />}
                        />
                        <Route
                            path="/playlist/:playlistId/v"
                            element={
                                <Video
                                    startPageLoadingHandler={
                                        startPageLoadingHandler
                                    }
                                    stopPageLoadingHandler={
                                        stopPageLoadingHandler
                                    }
                                />
                            }
                        />
                        <Route
                            path="*"
                            element={
                                <ErrorComponent
                                    code={404}
                                    msg={'page not found!'}
                                />
                            }
                        />
                    </Routes>
                </Container>
            )}
            <AddPlaylistModal
                open={addPlaylistModalOpen}
                handleClose={handleAddPlaylistModalClose}
            />
        </BrowserRouter>
    );
};

export default App;
