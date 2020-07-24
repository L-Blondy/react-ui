import "babel-polyfill";
import React, { useState } from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { Select } from '#/components/inputs';

test('render Select with no options', () => {

	const onChange = jest.fn();

	render(
		<Select
			data-testid='test-id'
			className='my-input-container'
			name='test-select-name'
			placeholder='test-placeholder'
			value=''
			onChange={ onChange }
			noOptionMessage='test-no-option'
		/>
	);

	const container = screen.getByTestId('test-id');
	const input = screen.getByRole('textbox');
	const arrow = input.nextElementSibling;
	const display = input.parentElement;
	const menu = screen.getByRole('list').parentElement;
	const firstItem = screen.getByRole('listitem');

	expect(container).toHaveClass('cs--select');
	expect(menu).toHaveClass('cs--menu--hide');
	expect(arrow).toHaveClass('cs--arrow down');

	userEvent.type(input, 'this is my input');
	expect(menu).toHaveClass('cs--menu--show');
	expect(arrow).toHaveClass('cs--arrow up');
	expect(input).toHaveDisplayValue('this is my input');
	expect(display).toHaveTextContent('this is my input');
	expect(firstItem).toHaveClass('cs--option--none');

	userEvent.type(input, '{enter}');
	expect(menu).toHaveClass('cs--menu--hide');
	expect(arrow).toHaveClass('cs--arrow down');
	expect(input).toHaveDisplayValue('');
});

test('options interactions', () => {

	const onChange = jest.fn();

	render(
		<Select
			data-testid='test-id'
			className='my-input-container'
			name='test-select-name'
			placeholder='test-placeholder'
			value=''
			onChange={ onChange }
			noOptionMessage='test-no-option'
			options={ [
				{ value: 12, display: 1200 },
				{ value: 13, display: 1300 },
				{ value: 23, display: 2300 },
				{ value: 24, display: 2400 },
			] }
		/>
	);

	const container = screen.getByTestId('test-id');
	const input = screen.getByRole('textbox');
	const arrow = input.nextElementSibling;
	const display = input.parentElement;
	const ul = screen.getByRole('list');
	const menu = ul.parentElement;

	let options;
	options = screen.getAllByRole('listitem');
	expect(options.length).toBe(4);
	userEvent.type(input, '1');
	expect(input).toHaveDisplayValue('1');
	options = screen.getAllByRole('listitem');
	expect(options.length).toBe(2);
	expect(options[ 0 ]).toHaveClass('cs--option--selected');
	fireEvent.keyUp(menu, { key: 'ArrowDown' });
	expect(options[ 1 ]).toHaveClass('cs--option--selected');
	userEvent.type(menu, '{enter}');
	expect(input).toHaveDisplayValue('');
	expect(display).toHaveTextContent('1300');
	screen.debug();
});