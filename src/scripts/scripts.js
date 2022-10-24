const images = [
    "./assets/bobrossparrot.gif",
    "./assets/explodyparrot.gif",
    "./assets/fiestaparrot.gif",
    "./assets/metalparrot.gif",
    "./assets/revertitparrot.gif",
    "./assets/tripletsparrot.gif",
    "./assets/unicornparrot.gif",
]

let arrayImgs = [...images];
let arrayCardsTurned = [];
let plays = 0;
let quantity = 0;
let firstCard = "";
let secondCard = "";
let bloqueio = false;

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
}

function createCards(imgFront) {
    const li = `
        <li class="card" onclick="turnCard(this)" id="./${imgFront}">
            <div class="game-card front-face face">
                <img src="./assets/back.png"/>
            </div>
            <div class="game-card back-face face">
                <img src="./${imgFront}"/>
            </div>
        </li>
    `
    return li; 
}
function endGame() {
    const back = Array.from(document.querySelectorAll(".card-selected-front"));
    const message = `
    Você ganhou em ${plays} jogadas!
    `
    if(back.length >= quantity) {
        alert(message);
    }
}

function turnCard(card) { 
   
    if(bloqueio == true || card.querySelector(".front-face").classList.contains("card-selected-front")) {
        return;
    } 

    card.querySelector(".back-face").classList.add("card-selected-back");
    card.querySelector(".front-face").classList.add("card-selected-front");

    if(firstCard == "") { 
        firstCard = card;
    } else { 
        secondCard = card;
        if(secondCard.id == firstCard.id) {
            firstCard = "";
            secondCard = "";   
            setTimeout(() => {
                endGame();
            }, 1000); 
        } else {
            bloqueio = true;
            setTimeout(() => {
                firstCard.querySelector(".back-face").classList.remove("card-selected-back");
                firstCard.querySelector(".front-face").classList.remove("card-selected-front");
                card.querySelector(".back-face").classList.remove("card-selected-back");
                card.querySelector(".front-face").classList.remove("card-selected-front");
                firstCard = "";
                secondCard = "";  
                bloqueio = false;
            }, 1000);    
        }
    } 
    plays++;
}
cardsDistribution();