import React, { PropTypes } from 'react';
import '../../styles/reset.css';

const App = ({ children }) => (
    <div>
        <div >
            {children}
        </div>

    </div>
)
App.propTypes = {
    children: PropTypes.element.isRequired
};
export default App