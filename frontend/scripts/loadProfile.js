import { requestGetFilms, requestSearchFilms, requestDeleteFilm, requestEditFilm, requestAddFilm } from "./requestPages.js";

function createFilmInfoCard(film) {

	const onDelete = () => {
		requestDeleteFilm({'id': film.id})
	}
	const onEdit = () => {
		requestEditFilm({'id': film.id})
	}

	const tableDataRow = document.createElement('tr')
	tableDataRow.className = 'film__data-row'

	tableDataRow.innerHTML = `
		<td class="film__id">${film.id}</td>
		<td class="film__title">${film.title}</td>
		<td class="film__description">${film.description}</td>
		<td class="film__year">${film.year}</td>
		<td class="film__rating">${film.rating}</td>
		<td class="film__poster"><img src="${film.poster}"></td>
		<td class="film__genre">${film.genre}</td>
		<td class="film__age">${film.age}+</td>
	`
	const controlButtons = document.createElement('td')
	controlButtons.className = 'control__buttons'

	const deleteButton = document.createElement('button')
	const editButton = document.createElement('button')
	deleteButton.className = 'delete'
	deleteButton.title = 'Удалить'
	deleteButton.textContent = '✕'

	editButton.className = 'edit'
	editButton.title = 'Изменить'
	editButton.textContent = '✎'

	deleteButton.addEventListener('click', onDelete)
	editButton.addEventListener('click', onEdit)

	controlButtons.appendChild(deleteButton)
	controlButtons.appendChild(editButton)

	tableDataRow.appendChild(controlButtons)

	return tableDataRow
}


function searchFilm(query, params) {
	return requestSearchFilms({'title': query.toLowerCase()})
}


function drawFilmCards(container, films) {
	films.forEach(film => {
		container.insertAdjacentElement('beforeend', createFilmInfoCard(film))
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

document.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		filmsContainer.innerHTML = ''
		const query = searchField.value
		searchFilm(query).then(data => {
			data.length ? drawFilmCards(filmsContainer, data) : filmsContainer.innerHTML = 'Ничего не найдено'
		})
	}
})