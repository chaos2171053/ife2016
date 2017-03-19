import React, { PropTypes } from 'react';
import '../../styles/reset.css';
import { Header,Main } from '../';

import styles from './App.scss';

const App = ({children}) => (
    <div className={styles.container}>
        {children}
    </div>
)

App.propTypes = {
    children: PropTypes.element.isRequired
};
export default App