function getCities(keyword) {

	const url = 'https://api-cities.herokuapp.com/';

	return fetch(`${ url }?keyword=${ keyword }`)
		.then(res => res.json())
		.then(cities => cities.map(city => city.name));
}

export default getCities;