import React, { PropTypes } from 'react';
import '../../styles/reset.css';
import { Header, Main} from '../';

import styles from './App.scss';

const App = ({ children }) => (
    <div>
        <div className={styles.container}>
            <Header />
            <Main>
                {children}
            </Main>
        </div>
    </div>
)

App.propTypes = {
    children: PropTypes.element.isRequired
};
export default App