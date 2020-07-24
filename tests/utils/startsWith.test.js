import { startsWith } from '#/utils';

test('startsWith', () => {
	expect(startsWith('teststartswith', 'test')).toBe(true);
	expect(startsWith('teststartswith', 'Test')).toBe(true);
	expect(startsWith('teststartswith', 'test987')).toBe(false);
	expect(startsWith('teststartswith', 'start')).toBe(false);
	expect(startsWith('1234', '1')).toBe(true);
	expect(startsWith('1234', 12)).toBe(true);
});