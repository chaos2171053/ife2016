import React, { PropTypes } from 'react';
import '../../styles/reset.css';
import { Header, Main } from '../';

import styles from './App.scss';

import { Layout } from 'antd';
const { Footer } = Layout;
// <Footer style={{ textAlign: 'center' }}>
//             Chaos Design ©2017 Created by Chaos
//         </Footer>
const App = ({ children }) => (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <Header />
            <Main>
                {children}
            </Main>
        </div> 
        <Footer style={{ textAlign: 'center' }}>
            Chaos Design ©2017 Created by Chaos
        </Footer>
    </div>
)

App.propTypes = {
    children: PropTypes.element.isRequired
};
export default App