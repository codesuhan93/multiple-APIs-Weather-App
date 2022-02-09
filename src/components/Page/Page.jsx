import React, { Fragment } from 'react';

import Header from '../Header';
import Form from '../Form';
import Error from '../Error';
import Loader from '../Loader';
import Forecast from '../Forecast';
// import CurrentWeather from './CurrentWeather';

import useForecast from '../../hooks/useForecast';

import styles from './Page.module.css';

const Page = () => {
    const [isError, isLoading, forecast, currentPositionWeather, submitRequest] = useForecast();
    console.log('forcasting: ', forecast);
    const onSubmit = value => {
        submitRequest(value);
    };
    console.log('currentPositionWeather', currentPositionWeather);
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
                {/* {!isLoading && newMsg} */}
            </div>
            <br />
            {/* {Add to Fav Button} */}
            {/* <div className="nav justify-content-center">
                <button className={styles.buttonz}>add/remove</button>
            </div> */}

            {/* Current Weather & City Weather */}
            {<div>{forecast ? <Forecast forecast={forecast} /> : <Forecast forecast={currentPositionWeather} />}</div>}
            <br />
        </Fragment>
    );
};

export default Page;
