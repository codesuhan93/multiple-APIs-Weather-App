import { useState, useEffect } from 'react';

import Page from './components/Page';
// import Page from './components/Page/Page';
import Favorites from './components/Page/Favorites';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import useForecast from './hooks/useForecast';

import clouds from './components/video/clouds.mp4';
import './App.css';

function App() {
    // var [favArray, setFavArray] = useState(null);

    // const [forecast, currentPositionWeather] = useForecast();
    const [, , forecast, currentPositionWeather] = useForecast();

    const newData = currentPositionWeather ? currentPositionWeather : forecast;
    const woeid = newData?.woeid;

    const [is_update_component, setUpdateComponent] = useState(false);

    console.log('data change', is_update_component);

    const likeButton = e => {
        let favWoeidStorage = JSON.parse(localStorage.getItem('WOEID')) || [];

        if (!favWoeidStorage.includes(woeid)) {
            favWoeidStorage.push(woeid);
        } else {
            favWoeidStorage = favWoeidStorage.filter(item => item !== woeid);
        }

        setUpdateComponent(!is_update_component);
        localStorage.setItem('WOEID', JSON.stringify(favWoeidStorage));
    };

    // useEffect(() => {
    //     async function init() {
    //         const data = await localStorage.getItem('WOEID');
    //         setFavArray(JSON.parse(data));
    //     }
    //     init();
    // }, [is_update_component]);

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
                    <Route path="/" element={<Page likeButton={likeButton} />} />
                    <Route path="/fav" element={<Favorites likeButton={likeButton} newState={is_update_component} />} />
                </Routes>
                <div id="overlay"></div>
            </div>
        </Router>
    );
}

export default App;
