export default function startsWith(string, substring) {
	return RegExp('^' + substring, 'i').test(string);
}