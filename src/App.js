import Page from './components/Page';

import clouds from './components/video/clouds.mp4';
import './App.css';

function App() {
    return (
        <>
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
            </div>
            <div id="overlay"></div>
            <div>
                <Page />
            </div>
        </>
    );
}

export default App;
