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
/*
function turnCard(element) {
    console.log(element);
    let arrayCardsTurned = [];
    const backface = element.parentNode.querySelector(".back-face");
    const frontface = element.parentNode.querySelector(".front-face");
    
    if(frontface.classList.contains("hidden")) {
        backface.classList.add("hidden");
        backface.classList.remove("face");
        frontface.classList.remove("hidden");
        frontface.classList.add("face"); 
        arrayCardsTurned.push(backface);
    } else {
        backface.classList.add("face");
        backface.classList.remove("hidden");
        frontface.classList.remove("face");
        frontface.classList.add("hidden"); 
    }
}

function handleCards(card1, card2) {
    console.log(card1.id);
    console.log(card2.id);
    if(card1.id != card2.id) {  
        console.log("CAIU AQUI")
        setInterval(() => {
            turnCard(card1);
            turnCard(card2);
        }, 1000);      
    } else {
        console.log("caiu aqui")
        /*if(!arrayCardsTurned.find(card1)) {
            arrayCardsTurned.push(card1, card2);
        }
        console.log("ARRAY: ", arrayCardsTurned);
    }
}
*/
function cardClick() {
    const cards = document.querySelectorAll(".card");
    let firstCard = "";
    let secondCard = "";
    cards.forEach(card => {
        card.addEventListener("click", (event)=> {

            if(firstCard == undefined) {
                event.target.classList.add("hidden");
                const front = event.target.parentNode.querySelector(".front-face")
                front.classList.remove("hidden");
                firstCard = card;

            } else { 
                event.target.classList.add("hidden");
                const front = event.target.parentNode.querySelector(".front-face")
                front.classList.remove("hidden");
                secondCard = card;
                if(firstCard.id != secondCard.id) {  
                    setTimeout(() => {
                    const front1 = firstCard.querySelector(".front-face")
                    front1.classList.add("hidden");
                    const back1 = firstCard.querySelector(".back-face")
                    back1.classList.remove('hidden');
                    
                    const front2 = secondCard.querySelector(".front-face")
                    front2.classList.add("hidden");
                    const back2 = secondCard.querySelector(".back-face")
                    back2.classList.remove('hidden');
                    }, 1000);
                    firstCard = undefined;
                    secondCard = undefined;      
                } else {
                    console.log("caiu aqui") 
                    firstCard = undefined;
                    secondCard = undefined; 
                }
            }
            
            plays++;
            //endGame();
        })
    })
}


cardsDistribution();


/*
function endGame() {
   // const back = document.querySelectorAll(".back-face.hidden,")
    const message = `
    Você ganhou em ${plays} jogadas!
    `
    if(back.length == 0) {
        alert(message);
    }
}*/