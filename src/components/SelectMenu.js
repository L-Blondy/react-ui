import React, { useRef, useEffect, useState } from 'react';

const noop = () => { };

function SelectMenu({
	when = true,
	options = [],
	onMouseDown = noop,
	onMouseOver = noop,
	onClick = noop,
	index = 0,
	noOptionsMessage = 'No options',
	maxMenuHeight = 'auto',
	...props
}, ref) {

	if (!when)
		return null;

	const handleMouseDown = e => {
		e.preventDefault();
		onMouseDown(e);
	};

	const getOptionClass = i => `ci-select__menu__option ${ i === index ? 'ci-select__menu__option--highlight' : '' }`;

	return (
		<ul
			ref={ ref }
			className='ci-select__menu'
			onMouseDown={ handleMouseDown }
			onMouseOver={ e => onMouseOver(e.target.dataset.index) }
			onClick={ e => onClick(e.target.dataset.value) }
			{ ...props }
			style={ { ...props.style, maxHeight: maxMenuHeight } }>

			{ options.length ?
				(
					options.map((opt, i) => (
						<li
							className={ getOptionClass(i) }
							data-value={ opt }
							data-index={ i }
							key={ opt + i }>
							{ opt }
						</li>
					))
				) : (
					<li className='ci-select__menu__option ci-select__menu__no-options'>
						{ noOptionsMessage }
					</li>
				) }
		</ul>
	);
}

export default React.forwardRef(SelectMenu);
