class Pokedex {
    constructor(){
        const numberDisplay = document.getElementById('display');
        const setButton = document.getElementById('send');
        const wrapper = document.querySelector('div.wrapper');
        let type = '';
        this.requestFetch(numberDisplay, setButton, wrapper, type);
        /* length = 807 */
    }
    
    requestFetch(numberDisplay, setButton, wrapper, type){
        setButton.addEventListener('click', async () => {
            const dataBase = await fetch(`https://pokeapi.co/api/v2/pokemon/${numberDisplay.value}`);
            const dataJson = await dataBase.json();
            this.addContent(dataJson, wrapper, type);
        });
        
    }

    addContent(dataJson, wrapper, type){
        dataJson.types.forEach(element => {
            type += `<p>${element.type.name}</p>`;
        });

        wrapper.innerHTML = `
            <img src="${dataJson.sprites.front_default}">
            <div class="text">
                <h5>${dataJson.name}</h5>
                ${type}
            </div>
        `
    }
}

const pokedex = new Pokedex();