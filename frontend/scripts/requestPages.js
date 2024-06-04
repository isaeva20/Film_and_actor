async function requestGetFilms() {
	return await fetch(`http://127.0.0.1:8000/api/films`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	}).then(response => response.json())
}

async function requestDeleteFilm(data = {}) {
	return await fetch(`http://127.0.0.1:8000/api/films/delete?id=${data.id}`, {
		method: 'DELETE',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	}).then(response => response.json())
}

async function requestAddFilm(method = 'POST', data = {}) {
	return await fetch(`http://127.0.0.1:8000/api/films/add`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
	}).then(response => response.json())
}

async function requestEditFilm(data = {}) {
	return await fetch(`http://127.0.0.1:8000/api/films/?id=${data.id}`, {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	}).then(response => response.json())
}

async function requestSearchFilms(data = {}) {
	return await fetch(`http://127.0.0.1:8000/api/films/search?title=${data.title}`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	}).then(response => response.json())
}


export {requestGetFilms, requestSearchFilms, requestDeleteFilm, requestEditFilm, requestAddFilm}