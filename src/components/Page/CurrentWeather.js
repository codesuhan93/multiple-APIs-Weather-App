import React from 'react';
// import styles from '../Form/Form.module.css';
// import CurrentDay from '../CurrentDay';
// import CurrentDayDescription from '../CurrentDayDescription';
// import UpcomingDaysForecast from '../UpcomingDaysForecast';

import Loader from '../Loader';

import PropTypes from 'prop-types';

import { Container } from 'react-bootstrap';

import styles from '../Forecast';

import Forecast from '../Forecast';

const CurrentWeather = ({ currentWeatherState }) => {
    console.log('currentWeatherState', currentWeatherState);
    return (
        <Container className={styles.box}>
            <div className={styles.card}>
                {currentWeatherState ? <Forecast forecast={currentWeatherState} /> : <Loader />}
            </div>

            {/* <Row>
                <Col xs={12} md={4}>
                    <div className={styles.card}>
                        <CurrentDay {...currentWeatherState?.currentDay} />
                    </div>
                </Col>
                <Col xs={12} md={8} className="d-flex flex-column justify-content-between">
                    <CurrentDayDescription forecast={currentWeatherState} />
                    <UpcomingDaysForecast days={currentWeatherState?.upcomingDays} />
                </Col>
            </Row> */}
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
