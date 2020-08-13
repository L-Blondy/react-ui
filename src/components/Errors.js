import React from 'react';

function Errors({ errors, className, ...props }) {
	if (!errors.length) return null;

	return (
		<ul className={ className || 'errors' } { ...props }>

			{ errors.map(error => (
				<li key={ error.slice(0, 3) + Math.random() }>{ error }</li>
			)) }

		</ul>
	);
}

export default Errors;
