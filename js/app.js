class Pokedex {
	constructor() {
		this.numberDisplay = document.getElementById('display');
		this.form = document.getElementById('form');
		this.wrapper = document.querySelector('div.wrapper');
		// this.searchWrapper = document.querySelector('main > #form div.searchArea');
		this.displayErrors = document.querySelector('form  .card-body .input-group');
		console.log(this.wrapper)
		/* length = 807 */
	}

	requestFetch() {
		this.form.addEventListener('submit', async (e) => {
			e.preventDefault();
			if (this.isValid()){
				try{
					this.addContent();
				}catch (e) {
					console.log(e)
				}
			}
		});

	}

	isValid() {
		if (this.numberDisplay.value < 1 || this.numberDisplay.value > 807 || !this.numberDisplay) {
			if (this.numberDisplay.classList.contains('error')) {
				console.log("Error");
			} else {
				this.displayErrors
					.insertAdjacentHTML(
						'afterend',
						'<p id="text-warning" class="text-center text-danger">You can only write numbers<br>You can only write numbers between 1 and 807</p>'
					);

				this.numberDisplay.classList.add('error');
			}
			return false
		}

		if (this.numberDisplay.classList.contains('error')) {
			document.getElementById('text-warning').remove()
			this.numberDisplay.classList.remove('error');
		}

		return true
	}

	async getData (){
		const dataBase = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.numberDisplay.value}`);
		const dataJson = await dataBase.json();
		return dataJson;
	}

	async addContent() {
		let type = ''
		const data = await this.getData()
		data.types.forEach(element => {
			type += `<p class="card-text">${element.type.name}</p>`;
		});

		this.wrapper.innerHTML = `
			<img src="${data.sprites.front_default}" class="card-img-top" alt="...">
			<div class="card-body text-center">
				<h3 class="card-title">${data.name}</h3>
				${type}
			</div>
        `
	}
}

const pokedex = new Pokedex();
pokedex.requestFetch()
