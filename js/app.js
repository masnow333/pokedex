class Pokedex {
    constructor(){
        const numberDisplay = document.getElementById('display');
        const setButton = document.getElementById('send');
        const wrapper = document.querySelector('div.wrapper');
        this.requestFetch(numberDisplay, setButton, wrapper);
        /* length = 807 */
    }
    
    requestFetch(numberDisplay, setButton, wrapper){
        let searchWrapper = document.querySelector('main > form > div.searchArea');
        let textWarning;
        let type = '';
        setButton.addEventListener('click', async (e) => {
            e.preventDefault();
            if (numberDisplay.value < 1 || numberDisplay.value > 807 || !numberDisplay) {
                if (numberDisplay.classList.contains('error')) {
                    console.log();
                }else{
                    numberDisplay.insertAdjacentHTML('afterend', '<p>You can only write numbers<br>You can only write numbers between 1 and 807</p>');
                    textWarning = document.querySelector('main > form > div.searchArea > p');
                }
                numberDisplay.classList.add('error');
            }else{
                if (numberDisplay.classList.contains('error')) {
                    searchWrapper.removeChild(textWarning);
                    numberDisplay.classList.remove('error');
                }
                const dataBase = await fetch(`https://pokeapi.co/api/v2/pokemon/${numberDisplay.value}`);
                const dataJson = await dataBase.json();
                this.addContent(dataJson, wrapper, type);
            }
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