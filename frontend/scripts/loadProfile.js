import { requestGetFilms, requestSearchFilms, requestDeleteFilm, requestEditFilm, requestAddFilm } from "./requestPages.js";

function createFilmInfoCard(film) {
	return `
	<tr>
		<td class="film__id">${film.id}</td>
		<td class="film__title">${film.title}</td>
		<td class="film__description">${film.description}</td>
		<td class="film__year">${film.year}</td>
		<td class="film__rating">${film.rating}</td>
		<td class="film__poster"><img src="${film.poster}"></td>
		<td class="film__genre">${film.genre}</td>
		<td class="film__age">${film.age}</td>
	</tr>
	`
}

function searchFilm(query, params) {
	return requestSearchFilms({'title': query.toLowerCase()})
}


function drawFilmCards(container, films) {
	films.forEach(film => {
		container.insertAdjacentHTML('beforeend', createFilmInfoCard(film))
	})
}
const filmsContainer = document.querySelector('.films__data')
document.addEventListener('DOMContentLoaded', ()=> {
	requestGetFilms().then(data => {
		drawFilmCards(filmsContainer, data)
	})
})

const searchField = document.querySelector('.search__input')
const searchButton = document.querySelector('.search__button')

searchButton.addEventListener('click', () => {
	filmsContainer.innerHTML = ''
	const query = searchField.value
	searchFilm(query).then(data => {
		data.length ? drawFilmCards(filmsContainer, data) : filmsContainer.innerHTML = 'Ничего не найдено'
	})
})