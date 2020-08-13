import { useCallback, useEffect } from 'react';
import { useSetState } from '#/hooks';

function useAsync(callback, immediate = false) {
	const [ state, setState ] = useSetState({
		pending: false,
		error: null,
		response: null
	});

	const execute = useCallback((...args) => {
		setState({ pending: true });

		callback(...args)
			.then(response => setState({ pending: false, response }))
			.catch(error => setState({ pending: false, error }));
	}, [ callback ]);

	useEffect(() => {
		immediate && execute();
	}, []);

	return [ state, execute ];
}

export default useAsync;
