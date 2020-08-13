import React, { useRef, useEffect } from 'react';

function usemountedEffect(effect, deps) {

	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current && effect();
	}, deps);

	useEffect(() => {
		isMounted.current = true;
		return () => { isMounted.current = false; };
	}, []);
}

export default usemountedEffect;
