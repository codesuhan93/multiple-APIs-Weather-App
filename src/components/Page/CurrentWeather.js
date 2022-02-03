// import React from 'react';

// // import Loader from '../Loader';

// import PropTypes from 'prop-types';

// import { Container } from 'react-bootstrap';

// import styles from '../Forecast';

// import Forecast from '../Forecast';
// import useForecast from '../../hooks/useForecast';

// {** No Need for this component to render seperately **}

// const CurrentWeather = ({ currentWeatherState }) => {
//     // console.log('currentWeatherState', currentWeatherState);
//     return (
//         <Container className={styles.box}>
//             <div className={styles.card}>
//                 {/* {currentWeatherState ? <Forecast forecast={currentWeatherState} /> : <Loader />} */}

//                 <Forecast forecast={currentWeatherState} />
//             </div>
//         </Container>
//     );
// };

// CurrentWeather.propTypes = {
//     forecast: PropTypes.shape({
//         currentDay: PropTypes.object,
//         currentDayDetails: PropTypes.array,
//         upcomingDays: PropTypes.array,
//     }),
// };

// export default CurrentWeather;
