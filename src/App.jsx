import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import getPlaylistById from './api';
import ErrorComponent from './components/ui/error';
import Navbar from './components/ui/navbar';
import Playlist from './pages/Playlist';
import Homepage from './pages/homepage';

const App = () => {
    // PL0-GT3co4r2wlh6UHTUeQsrf3mlS2lk6x
    useEffect(() => {
        getPlaylistById('PL0-GT3co4r2wlh6UHTUeQsrf3mlS2lk6x')
            .then((data) => console.log(data))
            .catch((e) => console.log(e));
    }, []);

    return (
        <BrowserRouter>
            <CssBaseline />
            <Navbar />
            <Container>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/playlist" element={<Playlist />} />
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

