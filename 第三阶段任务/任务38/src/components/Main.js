require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import TableController from './TableController';

class AppComponent extends React.Component {
	render() {
		return (
			<TableController/>
		);
	}
}

AppComponent.defaultProps = {};

export default AppComponent;