try{
	function $(e){return document.getElementById(e)}

	let themeToggle = document.getElementById('dark-light');
	let requireThemePresence = document.getElementsByClassName('requireThemePresence');
	setInterval(()=>{
		requireThemePresence = document.getElementsByClassName('requireThemePresence');
	}, 100);

	function updateColorScheme() {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.body.setAttribute('data-color-scheme', 'dark');
			for (let i = 0; i < requireThemePresence.length; i++) {
				requireThemePresence[i].setAttribute('data-color-scheme', 'dark');
			}
			theme = 'dark';
		} else {
			document.body.setAttribute('data-color-scheme', 'light');
			for (let i = 0; i < requireThemePresence.length; i++) {
				requireThemePresence[i].setAttribute('data-color-scheme', 'light');
			}
			theme = 'light';
		}
	}
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateColorScheme);
	updateColorScheme();

	try{
		fetch('./places.json').then(data => data.json()).then((data) => {
			for (let place of data.places) {
				let elem = document.createElement('section');
				elem.classList.add('content');

				let detailed = "";
				let detailedplaces = "<br>";

				if (Array.isArray(place.detailed)) {
					detailed = `<br>Places to visit in ${place.place} include:<br><ul>`;
					for (let detailedplace of place.detailed) {
						let imgTag = detailedplace.img;
						detailed += `<li>${detailedplace.name}</li>`;
						detailedplaces += `<h3>${detailedplace.name}</h3><section style="background-image: url('${imgTag}'); padding: 5px; margin: 5px; text-shadow: 2px 2px 3px black; cursor: default;">${detailedplace.description}</section>`;
					}

					detailed += `</ul>`;
				}

				elem.innerHTML = `<hr><h2>${place.place}</h2><div class="content-wrapper"><div class="content-text">${place.description}${detailed}${detailedplaces}</div></div>`;

				$('container').append(elem);
			}
		});
	}
	catch(e){
		showErrorModal(e, 'main.js');
	}
}
catch(e){
	showErrorModal(e, 'main.js');
}