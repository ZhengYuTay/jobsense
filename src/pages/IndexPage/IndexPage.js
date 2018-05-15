import React from 'react';
import { Link } from 'react-router-dom';
import styles from './IndexPage.css';
import { withRouter } from 'react-router-dom';

const IndexPage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>Welcome to the index page</div>
			<div className={styles.body}>
				This project is configured with eslint and prettier. Please comply. Ok
				Thanks.
			</div>
			<div className={styles.info}>
				If something doesnt hot-load, just refresh the page. I'm sorry! Dont use
				variable css, just use plain css!!
			</div>
			<div>
				Head to <Link to="/test">Test Page</Link>
			</div>
		</div>
	);
};

export default withRouter(IndexPage);
