import { React, useEffect } from 'react';
import PropTypes from 'prop-types';
// import heart from '../video/heart.svg';
import { BsHeart, BsFillHeartFill } from 'react-icons/bs';

import locationIcon from './assets/location-pin.png';
import styles from './CurrentDay.module.css';

const CurrentDay = ({ weekday, date, location, temperature, weatherIcon, weatherDescription, woeid, isDefault }) => {
    useEffect(() => {}, []);

    const likeButton = () => {
        var favWoeid = [woeid];

        favWoeid = JSON.parse(localStorage.getItem('WOEID')) || [];

        if (!favWoeid.includes(woeid)) {
            favWoeid.push(woeid);
        } else {
            favWoeid = favWoeid.filter(item => item !== woeid);
        }

        localStorage.setItem('WOEID', JSON.stringify(favWoeid));
    };
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

    return (
        <div className="d-flex">
            <div className={styles.img}></div>
            <div className={styles.gradient}></div>
            <div className={`${styles.cardInner} d-flex flex-column justify-content-between pt-3 pb-2 pl-2`}>
                <div>
                    <div className="d-flex align-items-baseline font-weight-lighter mb-1">
                        <h2 className="font-weight-bold mb-1">{weekday?.substring(0, 3)}</h2>
                        {/* <img width="50" height="25" src={heart} className="mr-1" alt="fav icon" onClick={likeButton} /> */}

                        {!isDefaultWeather() && <BsHeart alt="fav icon" onClick={likeButton} />}
                        {isDefaultWeather() && <BsFillHeartFill onClick={likeButton} alt="fav icon" />}
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
