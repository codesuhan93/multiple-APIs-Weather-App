import { React, useState } from 'react';
import PropTypes from 'prop-types';

import { BsHeart, BsFillHeartFill } from 'react-icons/bs';

import locationIcon from './assets/location-pin.png';
import styles from './CurrentDay.module.css';

const CurrentDay = ({ likeButton, weekday, date, location, temperature, weatherIcon, weatherDescription, woeid }) => {
    const isDefaultWeather = () => {
        const favData = JSON.parse(localStorage.getItem('WOEID')) || [];
        let result = false;
        favData.every(weatherId => {
            if (weatherId === woeid) {
                result = true;
                return false;
            }
            return true;
        });

        return result;
    };

    const renderHeartIcon = () => {
        let heart_icon_html = <></>;

        if (isDefaultWeather()) {
            heart_icon_html = <BsFillHeartFill size="30px" onClick={likeButton} alt="fav icon" />;
        } else {
            heart_icon_html = <BsHeart size="30px" alt="fav icon" onClick={likeButton} />;
        }

        return heart_icon_html;
    };

    return (
        <div className="d-flex">
            <div className={styles.img}></div>
            <div className={styles.gradient}></div>
            <div className={`${styles.cardInner} d-flex flex-column justify-content-between pt-3 pb-2 pl-2`}>
                <div>
                    {renderHeartIcon(likeButton)}
                    <div className="d-flex align-items-baseline font-weight-lighter mb-1">
                        <h2 className="font-weight-bold mb-1">{weekday?.substring(0, 3)}</h2>
                    </div>

                    <p className="mb-0">{date}</p>
                    <p className="d-flex align-items-baseline font-weight-lighter mb-1">
                        <img width="10" height="15" src={locationIcon} className="mr-1" alt="location pin icon" />
                        <span>{location}</span>
                    </p>
                </div>

                <div>
                    <img width="45" src={weatherIcon} alt="" />
                </div>
                <div>
                    <h2 className="font-weight-bold mb-1">
                        <span>{temperature}</span>°C
                    </h2>
                    <h5 className="font-weight-lighter">{weatherDescription}</h5>
                </div>
            </div>
        </div>
    );
};

CurrentDay.propTypes = {
    weekday: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string,
    weatherIcon: PropTypes.string,
    temperature: PropTypes.number,
    weatherDescription: PropTypes.string,
};

export default CurrentDay;
