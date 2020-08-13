import { useRef, useEffect, useState } from 'react';

function useDebounce(callback, time) {
	if (!time) return callback;

	const token = useRef(null);

	return (...args) => {
		args.forEach(arg => arg.target && arg.persist && arg.persist());

		return new Promise(resolve => {
			token.current && clearTimeout(token.current);
			token.current = setTimeout(() => resolve(callback(...args)), time);
		});
	};
}

export default useDebounce;
