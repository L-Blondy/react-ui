import { useState, useEffect, useRef } from 'react';
import { findIndex } from '#/utils';

function useDropdown(options, handleSelect = () => { }, handleOpen = () => { }, handleClose = () => { }) {
	const [ isOpen, setIsOpen ] = useState(false);
	const [ index, setIndex ] = useState(0);

	useEffect(() => { !index < options.length && setIndex(0); }, [ options ]);

	const handleIsOpen = () => isOpen ? handleClose() : handleOpen();

	const onMouseDown = (e) => e.preventDefault();

	const onKeyDown = (e) => e.key === 'ArrowUp' || e.key === 'ArrowDown' && e.preventDefault();

	const onFocus = () => {
		setIsOpen(true);
		handleOpen();
	};

	const onBlur = () => {
		setIsOpen(false);
		handleClose();
	};

	const onClick = (e) => {
		// e.preventDefault();
		// console.log('click');

		if (!isOpen) {
			setIsOpen(true);
			handleOpen();
			return;
		}
		const clickIndex = findIndex(options, opt => opt.value === e.target.value);
		if (clickIndex < 0) return;
		handleSelect(clickIndex);
		handleIsOpen();
		setIsOpen(!isOpen);
		setIndex(clickIndex);
	};

	const onKeyUp = (e) => {
		if (e.key === 'Enter') {
			setIsOpen(!isOpen);
			handleIsOpen();
			isOpen && handleSelect(index);
			return;
		}
		if (!isOpen) {
			return;
		}
		if (e.key === 'ArrowUp') {
			const prevIndex = index > 0 ? index - 1 : options.length - 1;
			setIndex(prevIndex);
		}
		if (e.key === 'ArrowDown') {
			const nextIndex = index < options.length - 1 ? index + 1 : 0;
			setIndex(nextIndex);
		}
	};

	const onMouseOver = (e) => e.target.value && setIndex(findIndex(options, opt => opt.value === e.target.value));

	const bindDropdown = { onFocus, onBlur, onMouseDown, onClick, onKeyUp, onKeyDown, onMouseOver };

	return [ isOpen, index, bindDropdown ];
}

export default useDropdown;
