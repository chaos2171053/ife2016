import React, { PropTypes } from 'react';
import {Link} from 'react-router-dom'

const Edit = () => (
    <div>
    <Link to = '/'> <span>ddd</span></Link>
       
    </div>
)

Edit.propTypes = {
    children: PropTypes.element.isRequired
};
export default Edit