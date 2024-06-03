function requestFilms() {

	return fetch('http://127.0.0.1:8000/api/films', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	}).then(response => response.json())

}

export default requestFilms