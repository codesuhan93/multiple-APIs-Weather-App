import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

const Header = () => (
    <>
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <h1 className={styles.heading}>
                    <span className={styles.light}>Weather</span> Forecast
                </h1>
            </li>
            <li className="nav-item">
                <h1 className={styles.section}>
                    <Link to="/fav">Favorites</Link>
                </h1>
            </li>
        </ul>
    </>
);

export default Header;
