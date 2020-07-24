import React, { useState, forwardRef } from 'react';
import Errors from '#/components/errors/Errors';

function Input({
	defaultValue = '',
	label = '',
	name,
	placeholder = '',
	onChange = () => { },
	errors = [],
	as: Style = 'span',
	inputTag: InputTag = 'input',
	className = '',
	inputClassName = 'ci-input',
	...props
}, ref) {

	const [ value, setValue ] = useState(props.value || defaultValue);

	const handleChange = (e) => {
		setValue(e.target.value);
		onChange(e);
	};

	return (
		<Style className={ 'ci-container ' + className } role='container'>

			<label className='ci-label' htmlFor={ name + '-' + label }>
				{ label }
			</label>

			<InputTag
				className={ inputClassName }
				id={ name + '-' + label }
				name={ name }
				placeholder={ placeholder }
				{ ...props }
				value={ props.value || value }
				onChange={ handleChange }
				ref={ ref }
			/>

			<Errors
				className='ci-errors'
				errors={ errors }
			/>

		</Style >
	);
}

export default forwardRef(Input);




















// const Input = ({
// 	as: Input = 'input',
// 	styleAs: Span$ = 'span',
// 	label,
// 	name,
// 	className,
// 	defaultValue,
// 	onChange,
// 	errors = [],
// 	otherChildren,
// 	...props
// }, ref) => {
// 	const [ value, setValue ] = useState(defaultValue || '');

// 	const Label = ({ htmlFor }) => {
// 		if (typeof label === 'string')
// 			return <label htmlFor={ htmlFor }>{ label }</label>;
// 		return label || null;
// 	};

// 	const handleChange = (e) => {
// 		if (!props.multiple) {
// 			setValue(e.target.value);
// 		}
// 		else {
// 			const options = Array.from(e.target.options);
// 			const nextValue = options.reduce((nextValue, opt) => {
// 				if (opt.selected) {
// 					nextValue.push(opt.value);
// 				}
// 				return nextValue;
// 			}, []);
// 			setValue(nextValue);
// 		}
// 		onChange && onChange(e);
// 	};

// 	return (
// 		<Span$ className={ `labelled-input ${ className } ` } disabled={ props.disabled }>

// 			<Label htmlFor={ name } />

// 			<Input
// 				className={ errors.length ? 'input invalid' : 'input' }
// 				name={ name }
// 				id={ name }
// 				ref={ ref }
// 				{ ...props }
// 				value={ (props.value || props.value === '' || props.value === 0) ? props.value : value }
// 				onChange={ handleChange }
// 			/>

// 			{ errors.length ? (
// 				<div className='errors'>
// 					{ errors.map((err, i) => (
// 						<div className='error' key={ name + value + i }>
// 							{ err }
// 						</div>
// 					)) }
// 				</div>
// 			) : null }

// 			{ otherChildren }

// 		</Span$>
// 	);
// };

// export default forwardRef(Input);
