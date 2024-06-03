import drawFilmCard from "./drawFilmCard.js";
import requestFilms from "./requestPages.js";

document.addEventListener('DOMContentLoaded', ()=> {
	const filmContainer = document.querySelector('.films__wrapper');

	requestFilms().then(data => {
		data.forEach(film => {
			filmContainer.insertAdjacentHTML('beforeend', drawFilmCard(film))
		})
	})
})