import requestFilms from "./requestPages.js";

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

document.addEventListener('DOMContentLoaded', ()=> {
	const filmsContainer = document.querySelector('.films__data')

	requestFilms().then(data => {
		data.forEach(film => {
			console.log(film)
			filmsContainer.insertAdjacentHTML('beforeend', createFilmInfoCard(film))
		})
	})
})