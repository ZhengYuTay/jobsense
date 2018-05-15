import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AppContainer.css';
// import Header from '../../components/Header/Header';

class AppContainer extends Component {
	render() {
		return (
			<div>
				{/* <Header /> */}
				{this.props.children}
			</div>
		);
	}
}

AppContainer.propTypes = {
	children: PropTypes.node,
};

export default AppContainer;
