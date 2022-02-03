import React from 'react';
import PropTypes from 'prop-types';

import CurrentDayDescriptionItem from '../CurrentDayDescriptionItem';

const CurrentDayDescription = ({ forecast }) => {
    // console.log('forecast', forecast);
    return (
        <div className="mt-4 mt-md-2">
            <div className="d-flex flex-column mb-2">
                {forecast?.currentDayDetails?.map(item => (
                    <CurrentDayDescriptionItem {...item} key={item.name} />
                ))}
            </div>
        </div>
    );
};

CurrentDayDescription.propTypes = {
    forecast: PropTypes.object,
};

export default CurrentDayDescription;
