import React, { PropTypes } from 'react';
import { MainLayoutComponents } from '../../components'


const { Navigation } = MainLayoutComponents

const MainLayout = ({ children }) => (
    <div>
        <Navigation/>
        {children}
    </div>
)
MainLayout.propTypes = {
    children: PropTypes.element.isRequired
};
export default MainLayout