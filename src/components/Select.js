import React, { useEffect } from 'react';
import SelectBase from './SelectBase';
import { useSetState } from '#/hooks';

function Select({
	options,
	placeholder = '',
	...props
}) {

	const [ state, setState ] = useSetState({
		filter: '',
		value: '',
	});

	const { value, filter } = state;
	useEffect(() => console.log(state), [ state ]);

	return (
		<SelectBase
			value={ isOpen => isOpen ? filter : value }
			onChange={ value => setState({ value, filter: value }) }
			onInputChange={ filter => setState({ filter }) }
			onInputClick={ () => filter && setState({ filter: '' }) }
			onFocus={ () => filter && setState({ filter: '' }) }
			onBlur={ () => options.indexOf(filter) !== -1 && setState({ value: filter }) }
			options={ options.filter(opt => RegExp('^' + filter, 'i').test(opt)) }
			placeholder={ value || placeholder }
			{ ...props }
		/>
	);
}

export default Select;
