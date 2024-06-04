import drawFilmCard from "./drawFilmCard.js";
import { requestGetFilms } from "./requestPages.js";

document.addEventListener('DOMContentLoaded', ()=> {
	const filmContainer = document.querySelector('.films__wrapper');

	requestGetFilms().then(data => {
		data.forEach(film => {
			filmContainer.insertAdjacentHTML('beforeend', drawFilmCard(film))
		})
	})
})