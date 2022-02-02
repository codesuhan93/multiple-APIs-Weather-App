import React from 'react';

import Loader from '../Loader';

import PropTypes from 'prop-types';

import { Container } from 'react-bootstrap';

import styles from '../Forecast';

import Forecast from '../Forecast';

const CurrentWeather = ({ currentWeatherState, isLoading }) => {
    console.log('currentWeatherState', currentWeatherState);
    return (
        <Container className={styles.box}>
            <div className={styles.card}>
                {currentWeatherState ? <Forecast forecast={currentWeatherState} /> : <Loader />}
            </div>
        </Container>
    );
};

CurrentWeather.propTypes = {
    forecast: PropTypes.shape({
        currentDay: PropTypes.object,
        currentDayDetails: PropTypes.array,
        upcomingDays: PropTypes.array,
    }),
};

export default CurrentWeather;
