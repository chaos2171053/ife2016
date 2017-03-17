import React, { PropTypes } from 'react';
import styles from './Main.scss';
const Main = ({children})=> (
    <div className={styles.wrapper}>
    ssss
    </div>
)
Main.propTypes = {
    children: PropTypes.element.isRequired
};
export default Main;