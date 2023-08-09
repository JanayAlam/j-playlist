import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { useStoreActions } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorComponent from './components/ui/error';
import Navbar from './components/ui/navbar';
import Homepage from './pages/Homepage';
import PlaylistDetails from './pages/PlaylistDetails.jsx';

const App = () => {
    const playlist = useStoreActions((actions) => actions.playlist);
    const recentPlaylist = useStoreActions((actions) => actions.recentPlaylist);

    const [addPlaylistModalOpen, setAddPlaylistModalOpen] = useState(false);

    const handleAddPlaylistModalOpen = () => {
        setAddPlaylistModalOpen(true);
    };

    const handleAddPlaylistModalClose = () => {
        setAddPlaylistModalOpen(false);
    };

    useEffect(() => {
        playlist.loadLocalStorage();
        recentPlaylist.loadLocalStorage();
    }, []);

    return (
        <BrowserRouter>
            <CssBaseline />
            <Navbar
                addPlaylistModalOpen={addPlaylistModalOpen}
                handleAddPlaylistModalOpen={handleAddPlaylistModalOpen}
                handleAddPlaylistModalClose={handleAddPlaylistModalClose}
            />
            <Container>
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
                    <Route path="/playlist" element={<PlaylistDetails />} />
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
        </BrowserRouter>
    );
};

export default App;
