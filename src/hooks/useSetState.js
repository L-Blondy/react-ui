import { useState } from 'react';

function useSetState(initial) {

	const [ state, setState ] = useState(initial);

	const set = patch => setState({ ...state, ...patch });

	return [ state, set ];
}

export default useSetState;
