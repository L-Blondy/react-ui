import "babel-polyfill";
import React, { useState } from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { Input } from '#/components';

test('render Input', () => {

	const onChange = jest.fn();

	render(
		<Input
			name='test-name'
			label='my-label'
			placeholder='test-placeholder'
			value=''
			onChange={ onChange }
			errors={ [ 'error1', 'error2' ] }
			className='my-input-container'
		/>
	);

	const container = screen.getByRole(/container/);
	const label = screen.getByText(/my-label/);
	const input = screen.getByLabelText(/my-label/);
	const errors = screen.getByRole('list');

	expect(container).toHaveClass('ci-container my-input-container');
	expect(label).toHaveClass('ci-label');
	expect(input).toHaveClass('ci-input');
	expect(errors).toHaveClass('ci-errors');

	expect(label).toHaveAttribute('for', 'test-name-my-label');
	expect(input).toHaveDisplayValue('');
	expect(screen.getByPlaceholderText('test-placeholder')).toBeInTheDocument();
	expect(input).toHaveAttribute('name', 'test-name');
	expect(errors).toContainElement(screen.getByText('error1'));
	expect(errors).toContainElement(screen.getByText('error2'));

	userEvent.type(input, 'user typed some text');

	expect(input).toHaveDisplayValue('user typed some text');
	expect(onChange).toHaveBeenCalledTimes(20);
});