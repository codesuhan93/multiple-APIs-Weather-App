import Page from './components/Page';
// import Page from './components/Page/Page';
import Favorites from './components/Page/Favorites';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import clouds from './components/video/clouds.mp4';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <video
                    autoPlay
                    loop
                    muted
                    style={{
                        position: 'fixed',
                        width: '100%',
                        left: '50%',
                        top: '50%',
                        bottom: '50%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: 'translate(-50%, -50%)',
                        zIndex: '-2',
                    }}
                >
                    <source src={clouds} type="video/mp4" />
                </video>
                <Routes>
                    <Route path="/" element={<Page />} />
                    <Route path="/fav" element={<Favorites />} />
                </Routes>
                <div id="overlay"></div>
            </div>
        </Router>
    );
}

export default App;
