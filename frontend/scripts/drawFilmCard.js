function drawFilmCard(film) {
	return `
	<div class="film">
		<img src="${film.poster}" alt="" class="film__poster">
		<div class="film__info">
			<h3 class="film__title">${film.title}, <span class='film__age'>${film.age}+</span></h3>
			<p class='film__year'>Вышел: ${film.year}</p>
			<div class="film__genre">
				<ul class="film__genre-list">
					${film.genre.map(genre => `<li class="film__genre-item">${genre}</li>`).join('')}
				</ul>
			</div>
			<p class="film__description">
				${film.description}
			</p>
			<p class="film__duration">Продолжительность: 
				<span class="film__duration-value">${film.duration}</span>
			</p>
			<p class="film__rating">Рейтинг: ${film.rating}</p>
		</div>
	</div>`
}

export default drawFilmCard