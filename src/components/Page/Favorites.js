import { React, useEffect, useState } from 'react';

import Forecast from '../Forecast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import styles from './Favorites.module.css';

import getCurrentDayForecast from '../../helpers/getCurrentDayForecast';
import getCurrentDayDetailedForecast from '../../helpers/getCurrentDayDetailedForecast';
import getUpcomingDaysForecast from '../../helpers/getUpcomingDaysForecast';

const BASE_URL = 'https://www.metaweather.com/api/location';
const CROSS_DOMAIN = 'https://the-ultimate-api-challenge.herokuapp.com';
const REQUEST_URL = `${CROSS_DOMAIN}/${BASE_URL}`;

function Favorites() {
    var [favArray, setFavArray] = useState(null);
    const [apiData, setApiData] = useState([]);
    // const [renderFav, setRenderFav] = useState(false);

    useEffect(() => {
        async function init() {
            const data = await localStorage.getItem('WOEID');
            setFavArray(JSON.parse(data));
        }
        init();
    }, []);

    // console.log('Favorites reRender', renderFav);

    // console.log('apiData: ', apiData);
    let navigate = useNavigate();

    // const handleRender = e => {
    //     setRenderFav(true);
    // };

    useEffect(() => {
        console.log('useEffect called 2');
        favArray?.forEach(id => {
            const getFevApisData = async () => {
                const { data } = await axios.get(`${REQUEST_URL}/${id}`);

                const currentDay = getCurrentDayForecast(data?.consolidated_weather[0], data.title, data.woeid);

                const currentDayDetails = getCurrentDayDetailedForecast(data?.consolidated_weather[0]);
                const upcomingDays = getUpcomingDaysForecast(data?.consolidated_weather);

                setApiData(prevState => [
                    ...prevState,
                    {
                        currentDay,
                        currentDayDetails,
                        upcomingDays,
                        woeid: data.woeid,
                    },
                ]);
            };
            getFevApisData();
        });
    }, [favArray]);

    return (
        <>
            <div>
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <h1 className={styles.headingz}>
                            <span className={styles.light}>Weather</span> Forecast
                        </h1>
                    </li>
                </ul>
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <button className={styles.buttonz} onClick={() => navigate('/')}>
                            Go Back
                        </button>
                    </li>
                </ul>
            </div>
            <br />
            <div>
                {apiData &&
                    apiData.map((item, index) => {
                        return <Forecast forecast={item} key={index} />;
                    })}

                {apiData.length === 0 && <p className={styles.headingz}>No Data to Display</p>}
            </div>
        </>
    );
}

export default Favorites;
