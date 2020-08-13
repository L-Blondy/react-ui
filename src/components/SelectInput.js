import React, { useState } from 'react';

const noop = () => { };

function SelectInput({
	onArrowUp = noop,
	onArrowDown = noop,
	onPressArrow = noop,
	onPressEnter = noop,
	onKeyDown = noop,
	onInputChange = noop,
	onInputClick = noop,
	...props
}, ref) {

	const handleKeyDown = (e) => {
		if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter')
			e.preventDefault();
		e.persist();

		if (e.key === 'ArrowUp') {
			onArrowUp(e.key);
			onPressArrow(e.key);
		}
		else if (e.key === 'ArrowDown') {
			onArrowDown(e.key);
			onPressArrow(e.key);
		}
		else if (e.key === 'Enter')
			onPressEnter(e.key);

		onKeyDown(e.key);
	};
	return (
		<input
			className='ci-select__input'
			ref={ ref }
			onKeyDown={ handleKeyDown }
			onChange={ e => onInputChange(e.target.value) }
			onClick={ onInputClick }
			{ ...props }
			autoComplete='off'
			spellCheck='false'
		/>
	);
}

export default React.forwardRef(SelectInput);
