import React, { PropTypes } from 'react';
import '../../styles/reset.css';
import { Header,Main } from '../';
// const App = () => (
//     <div>
//         <Header/>
//         <Main/>
//     </div>
// )
const App = ({children}) => (
    <div>
        {children}
    </div>
)

App.propTypes = {
    children: PropTypes.element.isRequired
};
export default App