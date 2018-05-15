import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';
import App from '../components/AppContainer/AppContainer';
import IndexPage from '../pages/IndexPage/IndexPage';
import TestPage from 'pages/TestPage/TestPage';

class Routes extends Component {
	render() {
		const { location } = this.props;

		return (
			<App>
				<Switch>
					<Route
						exact
						location={location}
						path="/"
						render={() => <IndexPage />}
					/>
					<Route exact location={location} path="/test" component={TestPage} />
				</Switch>
			</App>
		);
	}
}

Routes.propTypes = {
	location: PropTypes.object.isRequired,
};

export default Routes;
