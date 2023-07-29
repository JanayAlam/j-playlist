import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorComponent from './components/ui/error';
import Navbar from './components/ui/navbar';
import Homepage from './pages/Homepage';
import PlaylistDetails from './pages/PlaylistDetails.jsx';

const App = () => {
    const playlist = useStoreActions((actions) => actions.playlist);
    useEffect(() => {
        // playlist.fetchPlaylist('PL0-GT3co4r2wlh6UHTUeQsrf3mlS2lk6x');
    }, []);

    return (
        <BrowserRouter>
            <CssBaseline />
            <Navbar />
            <Container>
                <Routes>
                    <Route path="/" element={<Homepage />} />
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
