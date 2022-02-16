import { useState, useEffect } from 'react';
import axios from 'axios';

import getCurrentDayForecast from '../helpers/getCurrentDayForecast';
import getCurrentDayDetailedForecast from '../helpers/getCurrentDayDetailedForecast';
import getUpcomingDaysForecast from '../helpers/getUpcomingDaysForecast';

const BASE_URL = 'https://www.metaweather.com/api/location';
const CROSS_DOMAIN = 'https://the-ultimate-api-challenge.herokuapp.com';
const REQUEST_URL = `${CROSS_DOMAIN}/${BASE_URL}`;

const useForecast = () => {
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [forecast, setForecast] = useState(null);
    const [currentPositionWeather, setCurrentPositionWeather] = useState();

    // const [renderFav, setRenderFav] = useState(false);

    useEffect(() => {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        function success(pos) {
            var crd = pos.coords;
            var lat = crd.latitude;
            var long = crd.longitude;

            const getCurrentPosWoeid = async function () {
                const { data } = await axios.get(`${REQUEST_URL}/search/?lattlong=${lat},${long}`);

                if (!lat || !long) {
                    setError('No GPS Support Available');
                    setLoading(false);
                    return;
                }

                return data[0];
            };

            getCurrentPosWoeid();

            const getCurrentPositionForecastData = async () => {
                const currPlaceWoeid = await getCurrentPosWoeid();

                const { data } = await axios(`${REQUEST_URL}/${currPlaceWoeid.woeid}`);
                // console.log('data for cuurent location: ', data);

                if (!data || data.length === 0) {
                    setError('Something went wrong');
                    setLoading(false);
                    return;
                }

                return data;
            };

            getCurrentPositionForecastData();

            const gatherCurrentLocForecastData = async data => {
                const currPlaceWeather = await getCurrentPositionForecastData();

                const currentDay = getCurrentDayForecast(
                    currPlaceWeather.consolidated_weather[0],
                    currPlaceWeather.title,
                    currPlaceWeather.woeid
                );
                const currentDayDetails = getCurrentDayDetailedForecast(currPlaceWeather.consolidated_weather[0]);
                const upcomingDays = getUpcomingDaysForecast(currPlaceWeather.consolidated_weather);

                setCurrentPositionWeather({
                    currentDay,
                    currentDayDetails,
                    upcomingDays,
                    woeid: currPlaceWeather.woeid,
                });
                setLoading(false);
            };
            gatherCurrentLocForecastData();
        }

        const errorMode = function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
            alert(`ERROR(${err.code}): ${err.message}`);
        };

        navigator.geolocation.getCurrentPosition(success, errorMode, options);
    }, []);

    const getWoeid = async location => {
        const { data } = await axios(`${REQUEST_URL}/search`, { params: { query: location } });

        if (!data || data.length === 0) {
            setError('There is no such location');
            setLoading(false);
            return;
        }

        return data[0];
    };

    const getForecastData = async woeid => {
        const { data } = await axios(`${REQUEST_URL}/${woeid}`);
        console.log('data in hook:', data);

        if (!data || data.length === 0) {
            setError('Something went wrong');
            setLoading(false);
            return;
        }

        return data;
    };

    const gatherForecastData = data => {
        const currentDay = getCurrentDayForecast(data.consolidated_weather[0], data.title, data.woeid);
        const currentDayDetails = getCurrentDayDetailedForecast(data.consolidated_weather[0]);
        const upcomingDays = getUpcomingDaysForecast(data.consolidated_weather);

        setForecast({ currentDay, currentDayDetails, upcomingDays, woeid: data.woeid });
        setLoading(false);
    };

    const submitRequest = async location => {
        setLoading(true);
        setError(false);

        const response = await getWoeid(location);
        if (!response?.woeid) return;

        const data = await getForecastData(response.woeid);
        if (!data) return;

        gatherForecastData(data);
    };

    return [isError, isLoading, forecast, currentPositionWeather, submitRequest];
};

export default useForecast;
