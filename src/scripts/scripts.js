import images from "./imagesData.js";

let arrayImgs = [...images];
let arrayCardsTurned = [];
let plays = 0;
let quantity = 0;

function cardsDistribution() {
    while(!(quantity % 2 === 0) || !(quantity >= 4 && quantity <= 14) || !(typeof(quantity) === "number") || quantity === NaN || quantity === undefined){
        quantity = parseInt(prompt("Insira a quantidade de cartas com que deseja jogar"));
    }
    createArrayCards();
}

function comparator() { 
	return Math.random() - 0.5; 
}

function createArrayCards() {
    let newArray = [];
    let arrayCards = [];

    arrayImgs.forEach(elt => {
        if(newArray.length != quantity/2) {
            newArray.push(elt);
        }
    });

    newArray.map(el => {
        arrayCards.push(el, el)
    });

    arrayCards.sort(comparator);
    renderCards(arrayCards);

    return {arrayCards};
}

function renderCards(array) {
    const ul = document.querySelector(".cards");
    array.forEach(elt => {
         ul.innerHTML += createCards(elt);
    })
    cardClick();
}

function createCards(imgFront) {
    const li = `
        <li class="card" id="${imgFront}">
            <img src="./src/assets/back.png" class="back-face face" alt="">
            <img src="${imgFront}" class="front-face hidden" alt="">
        </li>
    `
    return li;
}