// Variables
const urlFR = 'https://fr.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';
const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const results = document.querySelector('.results');

// Submit form
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const value = input.value;
	if (!value){
		results.innerHTML = '<div class="error">Merci de saisir une recherche valide</div>';
		return;
	}
	fetchPages(value);
});

// Reset input
input.addEventListener('focusout', () => {
	input.value = '';
});

// Fetch data
const fetchPages = async(searchValue) => {
	// Loading
	results.innerHTML = '<div class="loading"></div>';
	// Try, catch
	try {
		const response = await fetch(`${ urlFR }${ searchValue }`);
		const data = await response.json();
		const searchResults = data.query.search;
		if (searchResults.length < 1){
			results.innerHTML = `<div class="error">Désolé, aucun résultat pour "${ searchValue }"</div>`;
			return;
		}
		renderResults(searchResults);
	} catch(error){
		// Error message
		results.innerHTML = '<div class="error">Une erreur est survenue</div>';
	}
};

// Render results
const renderResults = (list) => {
	const cardsList = list.map((item) => {
		// Variables
		const { pageid:id, title, snippet } = item;
		// Return
		return(
			`<a href="http://fr.wikipedia.org/?curid=${ id }" target="_blank">
				<h4>${ title }</h4>
				<p>${ snippet }</p>
			</a>`
		);
	}).join('');
	results.innerHTML = `<div class="articles">${ cardsList }</div>`;
};