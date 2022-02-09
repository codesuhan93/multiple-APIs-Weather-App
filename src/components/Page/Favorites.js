import { React, useEffect, useState } from 'react';
import Loader from '../Loader';
import Forecast from '../Forecast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import styles from '../Header/Header';
// import styles from '../Forecast/Forecast';
import styles from './Favorites.module.css';

import getCurrentDayForecast from '../../helpers/getCurrentDayForecast';
import getCurrentDayDetailedForecast from '../../helpers/getCurrentDayDetailedForecast';
import getUpcomingDaysForecast from '../../helpers/getUpcomingDaysForecast';

const BASE_URL = 'https://www.metaweather.com/api/location';
const CROSS_DOMAIN = 'https://the-ultimate-api-challenge.herokuapp.com';
const REQUEST_URL = `${CROSS_DOMAIN}/${BASE_URL}`;

function Favorites() {
    var [favArray, setFavArray] = useState(() => JSON.parse(localStorage.getItem('WOEID')));
    const [apiData, setApiData] = useState([]);
    console.log('apiData: ', apiData);
    let navigate = useNavigate();

    useEffect(() => {
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
                {apiData ? (
                    apiData.map(item => {
                        item.isDefault = false;
                        return <Forecast forecast={item} key={item.woeid} />;
                    })
                ) : (
                    <Loader />
                )}
            </div>
        </>
    );
}

export default Favorites;
