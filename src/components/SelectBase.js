import React, { useRef, useEffect, useState } from 'react';
import SelectInput from './SelectInput';
import SelectMenu from './SelectMenu';

const noop = () => { };

function SelectBase({
	onFocus = noop,
	onBlur = noop,
	onInputChange = noop,
	onInputClick = noop,
	onChange = noop,
	onMenuOpen = noop,
	onMenuClose = noop,
	noOptionsMessage,
	options = [],
	value = '',
	placeholder = '',
	name,
	maxMenuHeight,
	...props
}, ref) {

	const menu = useRef();
	const [ index, setIndex ] = useState(options.indexOf(value) !== -1 ? options.indexOf(value) : 0);
	const [ isOpen, setIsOpen ] = useState(false);

	const openMenu = () => {
		onMenuOpen();
		setIsOpen(true);
	};

	const closeMenu = () => {
		onMenuClose();
		setIsOpen(false);
	};

	const handlePressArrow = key => {
		let i;
		if (key === 'ArrowUp')
			i = index > 0 ? index - 1 : options.length - 1;
		if (key === 'ArrowDown')
			i = index < options.length - 1 ? index + 1 : 0;
		setIndex(i);
		const { bottom: menuBottom, top: menuTop } = menu.current.getBoundingClientRect();
		const { bottom: optionBottom, top: optionTop } = menu.current.children[ i ].getBoundingClientRect();

		if (i > index && optionBottom > menuBottom)
			menu.current.children[ i ].scrollIntoView(false);
		if (i < index && optionTop < menuTop)
			menu.current.children[ i ].scrollIntoView(true);
	};

	const handleClick = val => {
		if (!val) return;
		closeMenu();
		onChange(val);
	};

	const handlePressEnter = () => {
		if (!isOpen)
			return openMenu();
		closeMenu();
		onChange(options[ index ]);
	};

	const handleMouseOver = i => {
		i && setIndex(parseInt(i));
	};

	const handleInputChange = val => {
		onInputChange(val);
	};

	const handleInputClick = () => {
		onInputClick();
		openMenu();
	};

	const handleFocus = () => {
		onFocus();
		openMenu();
	};

	const handleBlur = () => {
		onBlur();
		closeMenu();
	};

	const handleKeyDown = () => {
		!isOpen && openMenu();
	};

	useEffect(() => {
		isOpen && index >= options.length && setIndex(0);
	}, [ options ]);

	return (
		<span className='ci-select' { ...props }>
			<SelectInput
				ref={ ref }
				value={ value(isOpen) }
				placeholder={ placeholder }
				name={ name }
				onFocus={ handleFocus }
				onBlur={ handleBlur }
				onPressArrow={ handlePressArrow }
				onPressEnter={ handlePressEnter }
				onKeyDown={ handleKeyDown }
				onInputClick={ handleInputClick }
				onInputChange={ handleInputChange }
			/>
			<SelectMenu
				when={ isOpen }
				ref={ menu }
				options={ options }
				onMouseOver={ handleMouseOver }
				onClick={ handleClick }
				index={ index }
				noOptionsMessage={ noOptionsMessage }
				maxMenuHeight={ maxMenuHeight }
			/>
		</span>
	);
}

export default React.forwardRef(SelectBase);
