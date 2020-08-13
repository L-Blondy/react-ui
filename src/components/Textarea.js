import React, { forwardRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Input from './Input';

const Textarea = (props, ref) => {
	return (
		<Input
			inputTag={ TextareaAutosize }
			inputClassName='ci-textarea'
			ref={ ref }
			{ ...props }
		/>
	);
};

export default forwardRef(Textarea);