import React, { useRef, useEffect } from 'react';
import SelectInput from './SelectInput';
import SelectMenu from './SelectMenu';
import { useSetState, useMountedEffect } from '#/hooks';

const noop = () => { };

function Select({
	onChange = noop,
	onInputChange = noop,
	options: defaultOptions = [],
	placeholder = 'Select...',
	name,
	...props
}) {

	const input = useRef();
	const blurredBySelecting = useRef(false);
	const closeMenu = {
		isOpen: false,
		filter: '',
		options: defaultOptions
	};
	const [ { isOpen, value, filter, index, options }, setState ] = useSetState({
		...closeMenu,
		value: '',
		index: 0,
	});

	function select(value) {
		setState({ value: value, ...closeMenu });
		blurredBySelecting.current = true;
		input.current.blur();
	}

	const getValue = () => 'value' in props ? props.value : value;

	useMountedEffect(() => {
		onChange(value);
	}, [ value ]);

	useMountedEffect(() => {
		setState({ options: defaultOptions });
	}, [ defaultOptions ]);

	const handleFocus = () => {
		setState({ isOpen: true });
	};

	const handleBlur = (e) => {
		!blurredBySelecting.current && setState(closeMenu);
		blurredBySelecting.current = null;
	};

	const handleArrowUp = () => {
		setState({ index: index > 0 ? index - 1 : options.length - 1 });
	};

	const handleArrowDown = () => {
		setState({ index: index < options.length - 1 ? index + 1 : 0 });
	};

	const handlePressEnter = () => {
		select(options[ index ]);
	};

	const handleInputClick = () => {
		setState({ isOpen: true });
	};

	const handleClick = e => {
		if (!e.target.dataset.value) return;
		select(e.target.dataset.value);
	};

	const handleInputChange = e => {
		setState({
			filter: e.target.value,
			index: 0,
			options: defaultOptions.filter(opt => RegExp('^' + e.target.value, 'i').test(opt))
		});
		onInputChange(e.target.value);
	};

	const handleMouseOver = e => {
		setState({ index: parseInt(e.target.dataset.index) });
	};

	return (
		<span className='ci-select' { ...props }>
			<SelectInput
				ref={ input }
				onFocus={ handleFocus }
				onBlur={ handleBlur }
				onArrowUp={ handleArrowUp }
				onArrowDown={ handleArrowDown }
				onPressEnter={ handlePressEnter }
				onInputChange={ handleInputChange }
				onInputClick={ handleInputClick }
				value={ isOpen ? filter : getValue() }
				placeholder={ getValue() || placeholder }
				name={ name }
			/>
			<SelectMenu
				when={ isOpen }
				options={ options }
				onMouseOver={ handleMouseOver }
				onClick={ handleClick }
				index={ index }
			/>
		</span>
	);
};

export default Select;
