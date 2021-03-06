import * as React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'react-bootstrap';
// import heart from '../video/heart.svg';

import CurrentDay from '../CurrentDay';
import CurrentDayDescription from '../CurrentDayDescription';
import UpcomingDaysForecast from '../UpcomingDaysForecast';

import styles from './Forecast.module.css';

const Forecast = ({ forecast, likeButton }) => {
    return (
        <>
            <Container className={styles.box}>
                <Row>
                    <Col xs={12} md={4}>
                        <div className={styles.card}>
                            <CurrentDay likeButton={likeButton} {...forecast?.currentDay} />
                        </div>
                    </Col>
                    <Col xs={12} md={8} className="d-flex flex-column justify-content-between">
                        <CurrentDayDescription forecast={forecast} />
                        <UpcomingDaysForecast days={forecast?.upcomingDays} />
                    </Col>
                </Row>
            </Container>
            <br />
        </>
    );
};

Forecast.propTypes = {
    forecast: PropTypes.shape({
        currentDay: PropTypes.object,
        currentDayDetails: PropTypes.array,
        upcomingDays: PropTypes.array,
        woeid: PropTypes.number,
    }),
};

export default Forecast;
