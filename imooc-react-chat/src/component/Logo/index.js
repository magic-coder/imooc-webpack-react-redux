import React from 'react';
import './index.css';
import LogoImg from './job.png';

const Logo = () => {
	return (
		<div className="logo">
			<img src={LogoImg} alt="job" />
		</div>
	)
};

export default Logo;
