import './Select.scss';
import React, { useRef, useState, useEffect } from 'react';
import { useDropdown } from '#/hooks';
import { startsWith } from '#/utils';

function Select({
	options: defaultOptions = [],
	onChange = () => { },
	onInputChange = () => { },
	placeholder = 'Select...',
	name = 'name is required',
	noOptionMessage = 'No option...',
	className,
	...props
}) {
	const input = useRef();
	const [ opt, setOpt ] = useState('');
	const [ inputVal, setInputVal ] = useState('');
	const [ options, setOptions ] = useState(defaultOptions);
	const [ isOpen, cursorIndex, bindDropdown ] = useDropdown(options, handleSelect, handleOpen, handleClose);

	const getClass = {
		container: () => input.current === document.activeElement ? 'focus-within' : '',
		display: () => `cs--display ${ isOpen ? 'cs--display--hide' : 'cs--display--show' }`,
		input: () => `cs--input ${ isOpen || !opt.display ? 'cs--input--show' : 'cs--input--hide' }`,
		dropdown: () => `cs--menu ${ !isOpen ? 'cs--menu--hide' : 'cs--menu--show' }`,
		option: (i) => `cs--option ${ i === cursorIndex ? 'cs--option--selected' : '' }`,
		arrow: () => `cs--arrow ${ isOpen ? 'up' : 'down' }`
	};

	function handleSelect(i) {
		if (options[ i ] === opt || !options.length) return;
		setOpt(options[ i ]);
		onChange({ target: { ...options[ i ], name } });
		setInputVal(opt.value || '');
	}

	function handleClose() {
		setInputVal(opt.value || '');
	}

	function handleOpen() {
		setInputVal('');
		setOptions(defaultOptions);
		input.current.focus();
	}

	function handleInputChange(e) {
		if (!isOpen) return;
		setInputVal(e.target.value);
		setOptions(defaultOptions.filter(opt => (
			startsWith(opt.display, e.target.value)
		)));
		onInputChange(e);
	}

	function getDisplay() {
		if (isOpen && inputVal)
			return inputVal;
		return opt.display || '';
	}

	return (
		<span className={ `cs--select ${ className } ${ getClass.container() }` } { ...bindDropdown } { ...props }>
			<span className={ getClass.display() }>
				{ getDisplay() }

				<input
					ref={ input }
					className={ getClass.input() }
					name={ name }
					type='text'
					placeholder={ opt.value ? opt.display : placeholder }
					value={ inputVal }
					onChange={ handleInputChange }
					autoComplete='off'
				/>

				<span className={ getClass.arrow() } onClick={ e => e.target.parentElement.previousElementSibling.focus() }>
					<div className='cs--arrow__wrapper' />
				</span>
			</span>

			<div className={ getClass.dropdown() }>
				<ul>
					{ options.length ?
						(options.map((opt, i) => (
							<li
								value={ opt.value }
								className={ getClass.option(i) }
								key={ opt.value + i }>
								{ opt.display }
							</li>
						))) : (
							<li className='cs--option--none'>{ noOptionMessage }</li>
						) }
				</ul>
			</div>
		</span >
	);
}

export default Select;
