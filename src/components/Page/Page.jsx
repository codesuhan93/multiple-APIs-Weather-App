import React, { Fragment, useState } from 'react';

import Header from '../Header';
import Form from '../Form';
import Error from '../Error';
import Loader from '../Loader';
import Forecast from '../Forecast';
import CurrentWeather from './CurrentWeather';

import useForecast from '../../hooks/useForecast';

import styles from './Page.module.css';

const Page = () => {
    const [isError, isLoading, forecast, currentPositionWeather, submitRequest] = useForecast();

    const onSubmit = value => {
        submitRequest(value);
    };

    return (
        <Fragment>
            <Header />
            {/* Search Bar */}
            <div className={`${styles.box} position-relative`}>
                {/* Form */}
                {!isLoading && <Form submitSearch={onSubmit} />}
                {/* Error */}
                {isError && <Error message={isError} />}
                {/* Loader */}
                {isLoading && <Loader />}
            </div>
            <br />
            {/* Current Weather */}
            {
                <div>
                    {forecast ? (
                        <Forecast forecast={forecast} />
                    ) : (
                        <CurrentWeather currentWeatherState={currentPositionWeather} />
                    )}
                </div>
            }
            <br />
        </Fragment>
    );
};

export default Page;
