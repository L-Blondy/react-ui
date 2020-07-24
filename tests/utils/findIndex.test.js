import { findIndex } from '#/utils';

const array = [
	{ value: 12, display: 1200 },
	{ value: 13, display: 1300 },
	{ value: 23, display: 2300 },
	{ value: 24, display: 2400 },
];

test('findIndex', () => {
	const index1 = findIndex(array, item => item.value === 13);
	expect(index1).toBe(1);

	const index2 = findIndex(array, item => item.value === 99);
	expect(index2).toBe(-1);
});